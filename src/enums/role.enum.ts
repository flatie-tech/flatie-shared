// ─── Building Roles ─────────────────────────────────────────────────

export const BuildingRole = {
  OWNER_REPRESENTATIVE: 'owner_representative',
  DEPUTY_REPRESENTATIVE: 'deputy_representative',
  CO_OWNER: 'co_owner',
  RESIDENT: 'resident',
} as const;

export type BuildingRole = (typeof BuildingRole)[keyof typeof BuildingRole];

export const BUILDING_ROLE_RANK: Record<BuildingRole, number> = {
  [BuildingRole.RESIDENT]: 0,
  [BuildingRole.CO_OWNER]: 1,
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 2,
  [BuildingRole.OWNER_REPRESENTATIVE]: 2,
};

export function canAssignRole(assignerRole: BuildingRole, targetRole: BuildingRole): boolean {
  return BUILDING_ROLE_RANK[assignerRole] > BUILDING_ROLE_RANK[targetRole];
}

// ─── Organization Roles ─────────────────────────────────────────────

export const OrgRole = {
  ORG_ADMIN: 'org_admin',
  SUPERVISOR: 'supervisor',
  REFERENT: 'referent',
  OPERATIVE: 'operative',
} as const;

export type OrgRole = (typeof OrgRole)[keyof typeof OrgRole];

export const ORG_ROLE_RANK: Record<OrgRole, number> = {
  [OrgRole.OPERATIVE]: 0,
  [OrgRole.REFERENT]: 1,
  [OrgRole.SUPERVISOR]: 2,
  [OrgRole.ORG_ADMIN]: 3,
};

/**
 * ORG_ADMIN may assign any role INCLUDING a peer ORG_ADMIN — someone must be
 * able to create the second admin, and add-member always allowed it anyway
 * (the strict-rank rule only made role-CHANGE inconsistent with add/invite).
 * Every lower role stays strictly-lower: a SUPERVISOR cannot mint SUPERVISORs.
 */
export function canAssignOrgRole(assignerRole: OrgRole, targetRole: OrgRole): boolean {
  if (assignerRole === OrgRole.ORG_ADMIN) return true;
  return ORG_ROLE_RANK[assignerRole] > ORG_ROLE_RANK[targetRole];
}

// ─── Platform Roles ─────────────────────────────────────────────────

export const PlatformRole = {
  PLATFORM_ADMIN: 'platform_admin',
  PLATFORM_MODERATOR: 'platform_moderator',
  PLATFORM_SUPPORT: 'platform_support',
  PLATFORM_OPERATIVE: 'platform_operative',
} as const;

export type PlatformRole = (typeof PlatformRole)[keyof typeof PlatformRole];

export const PLATFORM_ROLE_RANK: Record<PlatformRole, number> = {
  [PlatformRole.PLATFORM_OPERATIVE]: 0,
  [PlatformRole.PLATFORM_SUPPORT]: 1,
  [PlatformRole.PLATFORM_MODERATOR]: 2,
  [PlatformRole.PLATFORM_ADMIN]: 3,
};

export function canAssignPlatformRole(
  assignerRole: PlatformRole,
  targetRole: PlatformRole,
): boolean {
  return PLATFORM_ROLE_RANK[assignerRole] > PLATFORM_ROLE_RANK[targetRole];
}
