// ─── System Roles ───────────────────────────────────────────────────

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

// ─── Building Roles ─────────────────────────────────────────────────

export const BuildingRole = {
  OWNER_REPRESENTATIVE: 'OWNER_REPRESENTATIVE',
  DEPUTY_REPRESENTATIVE: 'DEPUTY_REPRESENTATIVE',
  CO_OWNER: 'CO_OWNER',
} as const;

export type BuildingRole = (typeof BuildingRole)[keyof typeof BuildingRole];

export const BUILDING_ROLE_RANK: Record<BuildingRole, number> = {
  [BuildingRole.CO_OWNER]: 0,
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 1,
  [BuildingRole.OWNER_REPRESENTATIVE]: 1,
};

export function canAssignRole(assignerRole: BuildingRole, targetRole: BuildingRole): boolean {
  return BUILDING_ROLE_RANK[assignerRole] > BUILDING_ROLE_RANK[targetRole];
}

// ─── Organization Roles ─────────────────────────────────────────────

export const OrgRole = {
  ORG_ADMIN: 'ORG_ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  REFERENT: 'REFERENT',
  OPERATIVE: 'OPERATIVE',
} as const;

export type OrgRole = (typeof OrgRole)[keyof typeof OrgRole];

export const ORG_ROLE_RANK: Record<OrgRole, number> = {
  [OrgRole.OPERATIVE]: 0,
  [OrgRole.REFERENT]: 1,
  [OrgRole.SUPERVISOR]: 2,
  [OrgRole.ORG_ADMIN]: 3,
};

export function canAssignOrgRole(assignerRole: OrgRole, targetRole: OrgRole): boolean {
  return ORG_ROLE_RANK[assignerRole] > ORG_ROLE_RANK[targetRole];
}

// ─── Platform Roles ─────────────────────────────────────────────────

export const PlatformRole = {
  PLATFORM_ADMIN: 'PLATFORM_ADMIN',
  PLATFORM_MODERATOR: 'PLATFORM_MODERATOR',
  PLATFORM_SUPPORT: 'PLATFORM_SUPPORT',
  PLATFORM_OPERATIVE: 'PLATFORM_OPERATIVE',
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
