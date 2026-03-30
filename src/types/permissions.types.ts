import type { Permission } from '../enums/permission.enum';

/** Scope for permission resolution. */
export type PermissionScope = 'building' | 'organization' | 'platform';

/** Unified response from GET /users/me/permissions. */
export interface PermissionsResponse {
  scope: PermissionScope;
  permissions: Permission[];
  roleType?: string;
  buildingId?: string;
  orgId?: string;
  chatVisibleToCoOwners?: boolean;
}
