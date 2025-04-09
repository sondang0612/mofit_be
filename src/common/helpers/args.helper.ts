import { BadRequestException } from '@nestjs/common';
import { ERole } from '../constants/role.enum';
import { UserParams } from '../decorators/user.decorator';

export function withUserScope<T>(
  args: T & { userId?: number },
  user: UserParams,
): T {
  if (user.role === ERole.ADMIN) return args;
  if (user.role === ERole.USER) return { ...args, userId: `${user.id}` };
  throw new BadRequestException('Unauthorized role');
}
