import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EEnv } from 'src/common/constants/env.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>(EEnv.DB_TYPE),
        host: configService.get(EEnv.DB_HOST),
        port: +configService.get(EEnv.DB_PORT),
        username: configService.get(EEnv.DB_USERNAME),
        password: configService.get(EEnv.DB_PASSWORD),
        database: configService.get<string>(EEnv.DB_NAME),
        synchronize: true,
        entities: [__dirname + '/entities/*.entity.{ts,js}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
