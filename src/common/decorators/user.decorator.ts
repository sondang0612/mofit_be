import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { ERole } from '../constants/role.enum';

export type UserParams = {
  id: number;
  email: string;
  role: ERole;
};

export const GetUser = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const result: UserParams = request?.user || {};

  return result;
});
