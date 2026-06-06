import type { Permission } from '../enums/permission.enum';

/**
 * @deprecated Use `createPermissionChecker(subject).can(permission)` from
 * `./permission-checker`. These raw `string[]` helpers predate the unified
 * `PermissionChecker` and are kept only so existing call-sites keep compiling
 * during migration; they will be removed in a future minor.
 */
export function hasPermission(userPermissions: string[], permission: Permission): boolean {
  return userPermissions.includes(permission);
}

/**
 * @deprecated Use `createPermissionChecker(subject).canAny(permissions)` from
 * `./permission-checker`.
 */
export function hasAnyPermission(userPermissions: string[], permissions: Permission[]): boolean {
  return permissions.some((p) => userPermissions.includes(p));
}

/**
 * @deprecated Use `createPermissionChecker(subject).canAll(permissions)` from
 * `./permission-checker`.
 */
export function hasAllPermissions(userPermissions: string[], permissions: Permission[]): boolean {
  return permissions.every((p) => userPermissions.includes(p));
}
