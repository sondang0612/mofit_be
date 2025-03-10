import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EAuth } from 'src/common/constants/auth.enum';
import { EEnv } from 'src/common/constants/env.enum';
import { ERole } from 'src/common/constants/role.enum';
import { extractTokenFromHeader } from 'src/common/utils/extract-token-from-header';

export const Auth = (type: EAuth) => SetMetadata('authType', type);
export const Permissions = (...roles: ERole[]) => SetMetadata('roles', roles);

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
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
      throw new BadRequestException('Missing jwt token');
    }

    let user;

    try {
      user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(EEnv.JWT_SECRET),
      });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    Object.assign(request, {
      user: { id: user?.id, role: user?.role, email: user?.email },
    });

    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
