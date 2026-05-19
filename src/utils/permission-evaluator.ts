import {
  APPROVE_PERMISSIONS,
  type Permission,
  SCOPED_PERMISSIONS,
  type ScopedAction,
  type ScopedDomain,
} from '../enums';
import type { PermissionContext } from '../types/permission-context';

export interface ActionFlags {
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
}

export function canDo(ctx: PermissionContext, permission: Permission): boolean {
  return ctx.permissions.includes(permission);
}

export function canDoOnResource(
  ctx: PermissionContext,
  domain: ScopedDomain,
  action: ScopedAction,
  resourceOwnerId: string,
): boolean {
  const scopedPerms = SCOPED_PERMISSIONS[domain]?.[action];
  if (!scopedPerms) return false;

  if (ctx.permissions.includes(scopedPerms.any)) return true;
  return ctx.permissions.includes(scopedPerms.own) && resourceOwnerId === ctx.userId;
}

/**
 * Compute standard action flags for an entity.
 *
 * Uses `:own`/`:any` resolution for edit/delete; type-safe lookup for approve.
 * Clients can use this for optimistic UI gating (show/hide edit/delete buttons)
 * without a round-trip to `/users/me/permissions`.
 */
export function computeActionFlags(
  ctx: PermissionContext,
  domain: ScopedDomain,
  resourceOwnerId: string,
): ActionFlags {
  const approvePermission = APPROVE_PERMISSIONS[domain];
  return {
    canEdit: canDoOnResource(ctx, domain, 'update', resourceOwnerId),
    canDelete: canDoOnResource(ctx, domain, 'delete', resourceOwnerId),
    canApprove: approvePermission ? canDo(ctx, approvePermission) : false,
  };
}

export function getContextUserId(ctx: PermissionContext): string {
  return ctx.userId;
}
