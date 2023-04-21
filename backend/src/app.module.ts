import { LoginModule } from './modules/login/login.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';
import { AuthModule } from './modules/system/auth/auth.module';
import { UsersModule } from './modules/system/users/users.module';
import { RoleModule } from './modules/system/role/role.module';
import { MenuModule } from './modules/system/menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SharedModule,
    LoginModule,
    AuthModule,
    UsersModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
