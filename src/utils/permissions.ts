import type { Permission } from '../enums/permission.enum';

/**
 * Check if a user has a specific permission.
 */
export function hasPermission(userPermissions: string[], permission: Permission): boolean {
  return userPermissions.includes(permission);
}

/**
 * Check if a user has any of the specified permissions.
 */
export function hasAnyPermission(userPermissions: string[], permissions: Permission[]): boolean {
  return permissions.some((p) => userPermissions.includes(p));
}

/**
 * Check if a user has all of the specified permissions.
 */
export function hasAllPermissions(userPermissions: string[], permissions: Permission[]): boolean {
  return permissions.every((p) => userPermissions.includes(p));
}
