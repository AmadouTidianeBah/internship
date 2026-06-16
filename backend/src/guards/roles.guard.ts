import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/constant/constants';
import { IS_PUBLIC_KEY } from 'src/decorators/skipAuth.decorator';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { IS_ROLE_SKIPPED_KEY } from 'src/decorators/skipRole.decorator';
import Playload from 'src/utils/playload.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isRoleSkipped = this.reflector.getAllAndOverride<boolean>(IS_ROLE_SKIPPED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isRoleSkipped) return true;

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    const currentUser = user as Playload;

    if (!currentUser || !requiredRoles.includes(currentUser.role as UserRole)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
