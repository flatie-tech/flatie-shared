import type { BuildingRole, OrgRole, Permission, PlatformRole } from '../enums';

/** Building access granted via organization membership. */
export interface BuildingContextFromOrg {
  kind: 'building';
  userId: string;
  buildingId: string;
  permissions: Permission[];
  source: 'organization';
  orgId: string;
  orgRole: OrgRole;
  buildingRole?: undefined;
  buildingSurfacePercentage?: undefined;
}

/** Building access granted via direct building role assignment. */
export interface BuildingContextFromRole {
  kind: 'building';
  userId: string;
  buildingId: string;
  permissions: Permission[];
  source: 'building_role';
  buildingRole: BuildingRole;
  buildingSurfacePercentage?: string;
  orgId?: undefined;
  orgRole?: undefined;
}

export type BuildingPermissionContext = BuildingContextFromOrg | BuildingContextFromRole;

/**
 * Discriminated union representing the caller's permission context.
 *
 * - `admin` — system admin, bypasses all checks
 * - `platform` — platform-scoped role (e.g. PLATFORM_ADMIN)
 * - `organization` — org-scoped role
 * - `building` — building-scoped, either via org membership or direct role
 */
export type PermissionContext =
  | { kind: 'admin' }
  | { kind: 'platform'; userId: string; platformRole: PlatformRole; permissions: Permission[] }
  | {
      kind: 'organization';
      userId: string;
      orgId: string;
      orgRole: OrgRole;
      permissions: Permission[];
    }
  | BuildingPermissionContext;
