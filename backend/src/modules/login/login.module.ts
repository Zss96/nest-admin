import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { MenuModule } from '../system/menu/menu.module';
import { UsersModule } from '../system/users/users.module';
import { AuthModule } from '../system/auth/auth.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '168h' },
      }),
    }),
    AuthModule,
    UsersModule,
    MenuModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
