import { UsersService } from './../system/users/users.service';
import {
  CAPTCHA_IMG_KEY,
  USER_NICKNAME_KEY,
  USER_PERMISSIONS_KEY,
  USER_ROLEKEYS_KEY,
  USER_ROLEKS_KEY,
  USER_TOKEN_KEY,
  USER_USERNAME_KEY,
} from 'src/common/constant/redis.constant';
import { SharedService } from './../../shared/shared.service';
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { JwtService } from '@nestjs/jwt';
import { User } from '../system/users/entities/user.entity';
import { ApiException } from 'src/common/exceptions/api.exception';
import { MenuService } from '../system/menu/menu.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly menuService: MenuService,
  ) {}
  async createImgCaptcha() {
    const { data, text } = svgCaptcha.createMathExpr({
      size: 4, //验证码长度
      ignoreChars: '0oli', //验证码忽略字符
      noise: 4, //线条的数量，用于干扰的
      color: true, //字符是否有颜色，如果设置了背景，默认是有的
      background: '#cccccc', //验证码背景颜色
      width: 116,
      height: 38,
    });
    const result = {
      img: data.toString(),
      uuid: this.sharedService.generateUUID(),
    };
    await this.redis.set(
      `${CAPTCHA_IMG_KEY}:${result.uuid}`,
      text,
      'EX',
      60 * 5,
    );
    return result;
  }
  async login(req: Request) {
    const { user } = req as any;
    const payload = {
      id: user.id,
      user_name: user.user_name,
    };
    const token = this.jwtService.sign(payload);
    user.token = token;

    await this.redis.set(
      `${USER_TOKEN_KEY}:${user.id}`,
      token,
      'EX',
      60 * 60 * 24,
    );
    return user;
    // const jwtSign

    // return user;
  }

  async getInfo(userId: number) {
    const user: User = await this.usersService.getUserId(userId);
    if (!user) throw new ApiException('用户信息不存在', 401);
    const roleKey: string[] = user.roles.map((role) => role.key);
    let perms = [];
    if (!roleKey.length) {
      perms = [];
    } else {
      if (roleKey.find((key) => key == 'admin')) {
        perms = ['*:*:*'];
      } else {
        const roleIds = user.roles.map((role) => role.id);
        perms = await this.menuService.getAllPermsByRoles(roleIds);
      }

      //将用户信息、权限数组、角色数组 存在进入缓存
      const promiseArr = [
        this.redis.set(`${USER_USERNAME_KEY}:${userId}`, user.user_name),
        this.redis.set(`${USER_NICKNAME_KEY}:${userId}`, user.nick_name),
        this.redis.set(
          `${USER_PERMISSIONS_KEY}:${userId}`,
          JSON.stringify(perms),
        ),
        this.redis.set(
          `${USER_ROLEKEYS_KEY}:${userId}`,
          JSON.stringify(roleKey),
        ),
        this.redis.set(
          `${USER_ROLEKS_KEY}:${userId}`,
          JSON.stringify(user.roles),
        ),
      ];

      return {
        perms,
        roles: roleKey,
        user,
      };
    }
  }
}
