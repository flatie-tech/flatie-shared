import type { BuildingRole, OrgRole, Permission, PlatformRole } from '../enums';

/**
 * The caller's DIRECT `building_roles` membership — their *voter identity* in a
 * building, independent of which permission path won the context merge.
 *
 * Rationale: `permissions` answers "what may they do here"; `membership` answers
 * "who are they here". `resolveBuildingAccess` may pick org-derived permissions
 * over the building-role permissions (to avoid downgrades), but it must never
 * drop `membership`. A co-owner who is also an org/platform admin is still a
 * co-owner and must keep their vote and ownership weight.
 */
export interface BuildingMembership {
  buildingRole: BuildingRole;
  /** `building_roles.building_surface_percentage` — numeric string; undefined for reps with no ownership. */
  buildingSurfacePercentage?: string;
}

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
  /** Set when this org/platform admin ALSO holds a direct building_roles row here. */
  membership?: BuildingMembership;
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
  /** Populated when resolved via access.service — mirrors buildingRole/surface. */
  membership?: BuildingMembership;
}

export type BuildingPermissionContext = BuildingContextFromOrg | BuildingContextFromRole;

/**
 * Discriminated union representing the caller's permission context.
 *
 * - `platform` — platform-scoped role (e.g. PLATFORM_ADMIN)
 * - `organization` — org-scoped role
 * - `building` — building-scoped, either via org membership or direct role
 */
export type PermissionContext =
  | { kind: 'platform'; userId: string; platformRole: PlatformRole; permissions: Permission[] }
  | {
      kind: 'organization';
      userId: string;
      orgId: string;
      orgRole: OrgRole;
      permissions: Permission[];
    }
  | BuildingPermissionContext;
