import { ConfigService } from '@nestjs/config';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedService } from './shared.service';
import { Global } from '@nestjs/common/decorators';
import { RedisModule } from '@nestjs-modules/ioredis';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ResTransformInterceptor } from 'src/common/interceptors/res-transform.interceptor';

@Global()
@Module({
  imports: [
    //连接数据库
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], //注入configService依赖，让工厂函数使用
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadModels: configService.get<boolean>('database.autoLoadModels'),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get('database.logging'),
      }),
    }),
    //连接redis
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<any>('redis'),
    }),
  ],
  providers: [
    SharedService,
    //全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    //全局参数校验管道
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // 启用白名单，dto中没有声明的属性自动过滤
        transform: true, // 自动类型转换
      }),
    },
    //jwt守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResTransformInterceptor,
    },
  ],
  exports: [SharedService],
})
export class SharedModule {}
