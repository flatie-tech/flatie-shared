import {
  APPROVE_PERMISSIONS,
  type Permission,
  SCOPED_PERMISSIONS,
  type ScopedAction,
  type ScopedDomain,
} from '../enums';

/**
 * Minimal shape needed to evaluate permissions: the caller's id plus their
 * resolved permission list. The full {@link PermissionContext} discriminated
 * union (backend) satisfies this, but clients can also pass a plain
 * `{ userId, permissions }` built from the `/users/me/permissions` response
 * without fabricating the rest of the union. This is what lets a single
 * evaluator back both the server guards and the client `can()` checker.
 */
export interface PermissionSubject {
  userId: string;
  permissions: Permission[];
}

export interface ActionFlags {
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  isOwner: boolean;
}

export function canDo(subject: PermissionSubject, permission: Permission): boolean {
  return subject.permissions.includes(permission);
}

export function canDoOnResource(
  subject: PermissionSubject,
  domain: ScopedDomain,
  action: ScopedAction,
  resourceOwnerId: string,
): boolean {
  const scopedPerms = SCOPED_PERMISSIONS[domain]?.[action];
  if (!scopedPerms) return false;

  if (subject.permissions.includes(scopedPerms.any)) return true;
  return subject.permissions.includes(scopedPerms.own) && resourceOwnerId === subject.userId;
}

/**
 * Compute standard action flags for an entity.
 *
 * Uses `:own`/`:any` resolution for edit/delete; type-safe lookup for approve.
 * Clients can use this for optimistic UI gating (show/hide edit/delete buttons)
 * without a round-trip to `/users/me/permissions`.
 */
export function computeActionFlags(
  subject: PermissionSubject,
  domain: ScopedDomain,
  resourceOwnerId: string,
): ActionFlags {
  const approvePermission = APPROVE_PERMISSIONS[domain];
  return {
    canEdit: canDoOnResource(subject, domain, 'update', resourceOwnerId),
    canDelete: canDoOnResource(subject, domain, 'delete', resourceOwnerId),
    canApprove: approvePermission ? canDo(subject, approvePermission) : false,
    isOwner: subject.userId === resourceOwnerId,
  };
}

export function getContextUserId(subject: PermissionSubject): string {
  return subject.userId;
}
