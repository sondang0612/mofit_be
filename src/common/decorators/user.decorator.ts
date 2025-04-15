import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';

export type UserParams = {
  ip: string;
} & User;

export const ExtractUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const result: UserParams = request?.user || {};

    result.ip =
      request.ip ||
      request.connection?.remoteAddress ||
      request.headers['x-forwarded-for']?.split(',')[0] ||
      '';

    return result;
  },
);
