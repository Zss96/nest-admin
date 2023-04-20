import { ApiException } from 'src/common/exceptions/api.exception';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ReqLoginDto } from 'src/modules/login/dto/req-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'user_name',
      passwordField: 'password',
      passReqToCallback: true, //设置回调函数第一个参数为 request
    });
  }
  async validate(request, username: string, password: string) {
    const body: ReqLoginDto = request.body;
    await this.authService.checkImgCaptcha(body.uuid, body.code);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new ApiException('该用户不存在');
    }

    return user;
  }
}
