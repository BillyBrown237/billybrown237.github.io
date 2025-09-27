import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, RolePermissions } from '../permissions.constants';
import { User } from '../../user/entities/user.entity';
import { Request } from 'express';
import { TokenPayloadI } from '../token-payload.interface';

export type Principal =
  | (User | (TokenPayloadI & { permissions?: string[] }))
  | undefined;

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no permissions specified, allow access
    if (!required || required.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const principal = request.user as Principal;

    if (!principal) {
      throw new ForbiddenException('No authenticated user found');
    }

    // If the principal carries explicit permissions (temporary token), use them
    let allowed: readonly string[] = [];
    if (
      principal &&
      'permissions' in principal &&
      Array.isArray(principal.permissions)
    ) {
      // Temporary token with explicit permissions
      allowed = principal.permissions;
    } else if (principal && 'role' in principal) {
      // Regular user with a role
      const role = principal.role as keyof typeof RolePermissions;
      allowed = RolePermissions[role] ?? [];
    } else {
      throw new ForbiddenException('Invalid principal object');
    }

    const hasAll = required.every((perm) => allowed.includes(perm));

    if (!hasAll) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
