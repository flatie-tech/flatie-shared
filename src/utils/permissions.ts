import { Permission } from '../enums/permission.enum';

/**
 * Mapping from old permission names to new resource:action format
 * This helps with migration and backward compatibility
 */
export const PERMISSION_MAPPING: Record<string, Permission> = {
  // Notice Board
  CREATE_NOTICES: Permission.NOTICE_CREATE,
  EDIT_NOTICES: Permission.NOTICE_UPDATE,
  DELETE_NOTICES: Permission.NOTICE_DELETE,
  APPROVE_NOTICES: Permission.NOTICE_APPROVE,
  DELETE_VIOLATING_NOTICES: Permission.NOTICE_DELETE,
  PIN_NOTICES: Permission.NOTICE_UPDATE,
  EDIT_OWN_NOTICES: Permission.NOTICE_UPDATE,
  DELETE_OWN_NOTICES: Permission.NOTICE_DELETE,

  // Polls & Voting
  CREATE_POLLS: Permission.POLL_CREATE,
  CREATE_MAINTENANCE_POLLS: Permission.POLL_CREATE,
  REQUEST_POLLS: Permission.POLL_CREATE,
  CAN_VOTE: Permission.POLL_VOTE,
  VIEW_POLL_RESULTS: Permission.POLL_READ,
  FINALIZE_POLL_RESULTS: Permission.POLL_FINALIZE,

  // Calendar & Events
  CREATE_EVENTS: Permission.EVENT_CREATE,
  CREATE_SERVICE_EVENTS: Permission.EVENT_CREATE,
  CREATE_MEETING_EVENTS: Permission.EVENT_CREATE,
  EDIT_EVENTS: Permission.EVENT_UPDATE,
  EDIT_OWN_EVENTS: Permission.EVENT_UPDATE,
  DELETE_EVENTS: Permission.EVENT_DELETE,
  DELETE_OWN_EVENTS: Permission.EVENT_DELETE,
  DELETE_VIOLATING_EVENTS: Permission.EVENT_DELETE,
  APPROVE_EVENTS: Permission.EVENT_UPDATE,

  // Document Repository
  ADD_DOCUMENTS: Permission.NOTICE_CREATE,
  ADD_FINANCIAL_DOCUMENTS: Permission.NOTICE_CREATE,
  ADD_MEETING_DOCUMENTS: Permission.NOTICE_CREATE,
  VIEW_DOCUMENTS: Permission.NOTICE_READ,
  VIEW_OWN_DOCUMENTS: Permission.NOTICE_READ,
  DELETE_DOCUMENTS: Permission.NOTICE_DELETE,
  DELETE_OWN_DOCUMENTS: Permission.NOTICE_DELETE,

  // Failure Reports & Maintenance
  REPORT_FAILURES: Permission.FAILURE_REPORT_CREATE,
  APPROVE_FAILURES: Permission.FAILURE_REPORT_APPROVE,
  VIEW_FAILURES: Permission.FAILURE_REPORT_READ,
  VIEW_ALL_FAILURES: Permission.FAILURE_REPORT_READ,
  VIEW_APPROVED_FAILURES: Permission.FAILURE_REPORT_READ,
  RESOLVE_FAILURES: Permission.FAILURE_REPORT_UPDATE,

  // Building Management
  EDIT_BUILDING: Permission.BUILDING_UPDATE,
  GENERATE_OTP: Permission.BUILDING_GENERATE_OTP,
  MANAGE_USERS: Permission.BUILDING_MANAGE_USERS,
  EDIT_USERS: Permission.USER_UPDATE,
  KICK_USERS: Permission.BUILDING_REMOVE_USERS,
  CHANGE_USER_ROLES: Permission.BUILDING_ASSIGN_ROLES,

  // Maintenance Logs
  CREATE_MAINTENANCE_LOGS: Permission.MAINTENANCE_LOG_CREATE,
  VIEW_MAINTENANCE_LOGS: Permission.MAINTENANCE_LOG_READ,
  EDIT_MAINTENANCE_LOGS: Permission.MAINTENANCE_LOG_UPDATE,
  DELETE_MAINTENANCE_LOGS: Permission.MAINTENANCE_LOG_DELETE,
  EDIT_OWN_MAINTENANCE_LOGS: Permission.MAINTENANCE_LOG_UPDATE,
  DELETE_OWN_MAINTENANCE_LOGS: Permission.MAINTENANCE_LOG_DELETE,
} as const;

/**
 * Get new permission name from old name
 * @param oldName - The old permission name (e.g., 'CREATE_NOTICES')
 * @returns The new permission name (e.g., 'notice:create')
 */
export function getNewPermissionName(oldName: string): string {
  return PERMISSION_MAPPING[oldName] ?? oldName;
}

/**
 * Check if permission name is in old format (SCREAMING_SNAKE_CASE without colon)
 * @param permissionName - The permission name to check
 */
export function isOldPermissionFormat(permissionName: string): boolean {
  return permissionName.includes('_') && !permissionName.includes(':');
}

/**
 * Convert old permission names to new format
 * @param permissions - Array of permission names (can be mixed old/new format)
 * @returns Array of permission names in new format
 */
export function convertToNewFormat(permissions: string[]): string[] {
  return permissions.map((permission) => getNewPermissionName(permission));
}

/**
 * Check if a user has a specific permission
 * @param userPermissions - Array of user's permissions
 * @param requiredPermission - The permission to check for
 * @returns True if user has the permission
 */
export function hasPermission(userPermissions: string[], requiredPermission: Permission): boolean {
  const normalizedPermissions = convertToNewFormat(userPermissions);
  return normalizedPermissions.includes(requiredPermission);
}

/**
 * Check if a user has any of the specified permissions
 * @param userPermissions - Array of user's permissions
 * @param requiredPermissions - Array of permissions to check
 * @returns True if user has at least one of the permissions
 */
export function hasAnyPermission(
  userPermissions: string[],
  requiredPermissions: Permission[],
): boolean {
  const normalizedPermissions = convertToNewFormat(userPermissions);
  return requiredPermissions.some((p) => normalizedPermissions.includes(p));
}

/**
 * Check if a user has all of the specified permissions
 * @param userPermissions - Array of user's permissions
 * @param requiredPermissions - Array of permissions to check
 * @returns True if user has all of the permissions
 */
export function hasAllPermissions(
  userPermissions: string[],
  requiredPermissions: Permission[],
): boolean {
  const normalizedPermissions = convertToNewFormat(userPermissions);
  return requiredPermissions.every((p) => normalizedPermissions.includes(p));
}
