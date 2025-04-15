import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  RedisModule as NestRedisModule,
  RedisModuleOptions,
} from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    NestRedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): RedisModuleOptions => ({
        url: configService.get<string>('REDIS_URL'),
        type: 'single',
      }),
    }),
  ],
  providers: [RedisService],
  exports: [NestRedisModule, RedisService],
})
export class RedisModules {}
