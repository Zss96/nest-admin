import { CAPTCHA_IMG_KEY } from 'src/common/constant/redis.constant';
import { SharedService } from './../../shared/shared.service';
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
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
      user_id: user.user_id,
      user_name: user.user_name,
    };
    const token = this.jwtService.sign(payload);
    return token;
    // const jwtSign

    // return user;
  }
}
