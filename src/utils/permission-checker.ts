import type { Permission, ScopedAction, ScopedDomain } from '../enums';
import {
  type ActionFlags,
  canDoOnResource,
  computeActionFlags,
  type PermissionSubject,
} from './permission-evaluator';

const EMPTY_ACTION_FLAGS: ActionFlags = {
  canEdit: false,
  canDelete: false,
  canApprove: false,
};

/**
 * The unified, isomorphic permission check surface — Flatie's analogue of
 * Clerk's `has()`. Built once over {@link PermissionSubject} so the same five
 * methods work identically on the backend (pass a `PermissionContext`) and on
 * the clients (pass a `{ userId, permissions }` derived from the session or the
 * `/users/me/permissions` response).
 *
 * Pass `null` when the subject is unknown/unresolved (loading, error, preview
 * mode) — every check then returns the safe `false`.
 *
 * @example
 *   const checker = createPermissionChecker({ userId, permissions });
 *   checker.can(Permission.NOTICE_CREATE);
 *   checker.canOnResource('notice', 'update', notice.authorId);
 */
export interface PermissionChecker {
  /** True if the subject holds `permission`. */
  can: (permission: Permission) => boolean;
  /** True if the subject holds at least one of `permissions`. */
  canAny: (permissions: Permission[]) => boolean;
  /** True if the subject holds every one of `permissions`. */
  canAll: (permissions: Permission[]) => boolean;
  /**
   * `:own`/`:any` resolution for a scoped domain. Grants when the subject has
   * the `:any` permission, or the `:own` permission and owns the resource.
   */
  canOnResource: (domain: ScopedDomain, action: ScopedAction, resourceOwnerId?: string) => boolean;
  /** Standard edit/delete/approve flags for a scoped-domain entity. */
  actionFlags: (domain: ScopedDomain, resourceOwnerId?: string) => ActionFlags;
}

export function createPermissionChecker(subject: PermissionSubject | null): PermissionChecker {
  const perms = subject?.permissions ?? [];

  return {
    can: (permission) => perms.includes(permission),
    canAny: (permissions) => permissions.some((p) => perms.includes(p)),
    canAll: (permissions) => permissions.every((p) => perms.includes(p)),
    canOnResource: (domain, action, resourceOwnerId) =>
      subject ? canDoOnResource(subject, domain, action, resourceOwnerId ?? '') : false,
    actionFlags: (domain, resourceOwnerId) =>
      subject ? computeActionFlags(subject, domain, resourceOwnerId ?? '') : EMPTY_ACTION_FLAGS,
  };
}
