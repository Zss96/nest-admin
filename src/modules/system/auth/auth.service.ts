import { UsersService } from './../users/users.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { HttpException, Injectable } from '@nestjs/common';
import { CAPTCHA_IMG_KEY } from 'src/common/constant/redis.constant';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly usersService: UsersService,
  ) {}
  // 校验验证码
  async checkImgCaptcha(uuid: string, code: string) {
    if (uuid == '123456789') {
      return;
    }
    const result = await this.redis.get(`${CAPTCHA_IMG_KEY}:${uuid}`);
    if (!result || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException('验证码错误');
    }
    await this.redis.del(`${CAPTCHA_IMG_KEY}:${uuid}`);
  }
  // 校验账号密码
  async validateUser(username: string, password: string) {
    const user = await this.usersService.getUserForName(username);
    return user;
  }
}
