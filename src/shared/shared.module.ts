import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedService } from './shared.service';
import { Global } from '@nestjs/common/decorators';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OperationLogInterceptor } from 'src/common/interceptors/operation-log';

@Global()
@Module({
  imports: [
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
  ],
  providers: [
    SharedService,
    {
      provide: APP_INTERCEPTOR,
      useClass: OperationLogInterceptor,
    },
  ],
  exports: [SharedService],
})
export class SharedModule {}
