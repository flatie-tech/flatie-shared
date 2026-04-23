import { BuildingRole, OrgRole, PlatformRole } from '../enums';

/**
 * Building roles that grant admin-level access to building management.
 *
 * `CO_OWNER` is a regular building member (reads + own content); representatives
 * are managerial and own the building's full lifecycle.
 */
export const MANAGERIAL_BUILDING_ROLES: readonly BuildingRole[] = [
  BuildingRole.OWNER_REPRESENTATIVE,
  BuildingRole.DEPUTY_REPRESENTATIVE,
] as const;

/**
 * Check whether a building role has managerial authority.
 *
 * @example
 * isManagerialRole(BuildingRole.OWNER_REPRESENTATIVE) // true
 * isManagerialRole(BuildingRole.CO_OWNER)             // false
 */
export function isManagerialRole(role: BuildingRole): boolean {
  return MANAGERIAL_BUILDING_ROLES.includes(role);
}

/**
 * Translation keys for every role value.
 *
 * Apps consume these with their own i18n layer (`t(ROLE_TRANSLATION_KEYS[role])`).
 * Keeping the keys here — not the localized strings — avoids duplicating a Record
 * in every app while leaving translation framework and locale up to each consumer.
 *
 * Each app must provide a matching `roles.<KEY>` translation for all locales it supports.
 */
export const ROLE_TRANSLATION_KEYS: Record<BuildingRole | OrgRole | PlatformRole, string> = {
  // Building roles
  [BuildingRole.OWNER_REPRESENTATIVE]: 'roles.OWNER_REPRESENTATIVE',
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 'roles.DEPUTY_REPRESENTATIVE',
  [BuildingRole.CO_OWNER]: 'roles.CO_OWNER',
  [BuildingRole.RESIDENT]: 'roles.RESIDENT',

  // Org roles
  [OrgRole.ORG_ADMIN]: 'roles.ORG_ADMIN',
  [OrgRole.SUPERVISOR]: 'roles.SUPERVISOR',
  [OrgRole.REFERENT]: 'roles.REFERENT',
  [OrgRole.OPERATIVE]: 'roles.OPERATIVE',

  // Platform roles
  [PlatformRole.PLATFORM_ADMIN]: 'roles.PLATFORM_ADMIN',
  [PlatformRole.PLATFORM_MODERATOR]: 'roles.PLATFORM_MODERATOR',
  [PlatformRole.PLATFORM_SUPPORT]: 'roles.PLATFORM_SUPPORT',
  [PlatformRole.PLATFORM_OPERATIVE]: 'roles.PLATFORM_OPERATIVE',
};

/**
 * Description-variant translation keys for roles (typically for onboarding screens
 * or role-selection UIs where a sentence-length explanation accompanies the label).
 *
 * Same pattern as `ROLE_TRANSLATION_KEYS` — apps resolve via `t()`.
 */
export const ROLE_DESCRIPTION_KEYS: Record<BuildingRole | OrgRole | PlatformRole, string> = {
  [BuildingRole.OWNER_REPRESENTATIVE]: 'roles.OWNER_REPRESENTATIVE_DESC',
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 'roles.DEPUTY_REPRESENTATIVE_DESC',
  [BuildingRole.CO_OWNER]: 'roles.CO_OWNER_DESC',
  [BuildingRole.RESIDENT]: 'roles.RESIDENT_DESC',

  [OrgRole.ORG_ADMIN]: 'roles.ORG_ADMIN_DESC',
  [OrgRole.SUPERVISOR]: 'roles.SUPERVISOR_DESC',
  [OrgRole.REFERENT]: 'roles.REFERENT_DESC',
  [OrgRole.OPERATIVE]: 'roles.OPERATIVE_DESC',

  [PlatformRole.PLATFORM_ADMIN]: 'roles.PLATFORM_ADMIN_DESC',
  [PlatformRole.PLATFORM_MODERATOR]: 'roles.PLATFORM_MODERATOR_DESC',
  [PlatformRole.PLATFORM_SUPPORT]: 'roles.PLATFORM_SUPPORT_DESC',
  [PlatformRole.PLATFORM_OPERATIVE]: 'roles.PLATFORM_OPERATIVE_DESC',
};
