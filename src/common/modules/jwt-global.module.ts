// jwt-global.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EEnv } from '../constants/env.enum';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(EEnv.JWT_SECRET),
        signOptions: {
          expiresIn: Number(configService.get(EEnv.JWT_EXPIRES_IN)),
        },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JwtGlobalModule {}
