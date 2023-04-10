import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    console.log('token', ExtractJwt.fromAuthHeaderAsBearerToken());
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
      passReqToCallback: true, //设置回调的第一个参数是  request
    });
  }
  async validate(payload: any) {
    console.log('payload');
    return { user_id: payload.user_id, user_name: payload.user_name };
  }
}
