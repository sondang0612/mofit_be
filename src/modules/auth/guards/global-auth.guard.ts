import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { instanceToInstance } from 'class-transformer';
import { Request } from 'express';
import { EAuth } from 'src/common/constants/auth.enum';
import { EEnv } from 'src/common/constants/env.enum';
import { redisKeys } from 'src/common/constants/redis';
import { ERole } from 'src/common/constants/role.enum';
import { RedisService } from 'src/common/modules/redis/redis.service';
import { extractTokenFromHeader } from 'src/common/utils/extract-token-from-header';
import { UsersService } from 'src/modules/users/users.service';

export const Auth = (type: EAuth) => SetMetadata('authType', type);
export const Permissions = (...roles: ERole[]) => SetMetadata('roles', roles);

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride<EAuth>('authType', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (authType === EAuth.NONE) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing jwt token');
    }

    const decoded = (await this.jwtService.verifyAsync(token, {
      secret: this.configService.get(EEnv.JWT_SECRET),
    })) as any;

    const user = await this.userService._findOne({
      where: { id: decoded?.id },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Token is invalid or has been revoked. Please log in again.',
      );
    }

    const existingJid = await this.redisService.get(
      redisKeys.USER_JID.replace('$userId', `${user.id}`),
    );

    if (!existingJid || existingJid !== decoded.jid) {
      throw new UnauthorizedException(
        'Token is invalid or has been revoked. Please log in again.',
      );
    }

    // role
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    request.user = instanceToInstance(user);

    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
