import { ApartmentRole, BuildingRole, OrgRole, PlatformRole } from '../enums';

/**
 * Every role value that UIs render as a label/badge. `ApartmentRole.TENANT`
 * is included because the web role picker surfaces it as a UI-only role
 * (persisted as `CO_OWNER` on the backend); `ApartmentRole.OWNER` is never
 * displayed as a role label, so it stays out.
 */
export type DisplayableRole = BuildingRole | OrgRole | PlatformRole | typeof ApartmentRole.TENANT;

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
export const ROLE_TRANSLATION_KEYS: Record<DisplayableRole, string> = {
  // Building roles
  [BuildingRole.OWNER_REPRESENTATIVE]: 'roles.OWNER_REPRESENTATIVE',
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 'roles.DEPUTY_REPRESENTATIVE',
  [BuildingRole.CO_OWNER]: 'roles.CO_OWNER',
  [BuildingRole.RESIDENT]: 'roles.RESIDENT',

  // Apartment role surfaced by the web role picker (UI-only; persists as CO_OWNER)
  [ApartmentRole.TENANT]: 'roles.TENANT',

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
export const ROLE_DESCRIPTION_KEYS: Record<DisplayableRole, string> = {
  [BuildingRole.OWNER_REPRESENTATIVE]: 'roles.OWNER_REPRESENTATIVE_DESC',
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 'roles.DEPUTY_REPRESENTATIVE_DESC',
  [BuildingRole.CO_OWNER]: 'roles.CO_OWNER_DESC',
  [BuildingRole.RESIDENT]: 'roles.RESIDENT_DESC',
  [ApartmentRole.TENANT]: 'roles.TENANT_DESC',

  [OrgRole.ORG_ADMIN]: 'roles.ORG_ADMIN_DESC',
  [OrgRole.SUPERVISOR]: 'roles.SUPERVISOR_DESC',
  [OrgRole.REFERENT]: 'roles.REFERENT_DESC',
  [OrgRole.OPERATIVE]: 'roles.OPERATIVE_DESC',

  [PlatformRole.PLATFORM_ADMIN]: 'roles.PLATFORM_ADMIN_DESC',
  [PlatformRole.PLATFORM_MODERATOR]: 'roles.PLATFORM_MODERATOR_DESC',
  [PlatformRole.PLATFORM_SUPPORT]: 'roles.PLATFORM_SUPPORT_DESC',
  [PlatformRole.PLATFORM_OPERATIVE]: 'roles.PLATFORM_OPERATIVE_DESC',
};

/**
 * Semantic badge color for a role. Each app maps these to its own styling
 * (web: `BADGE_COLORS` classes; mobile: `Badge` variants) — shared only fixes
 * WHICH semantic color a role gets so badges look the same everywhere.
 */
export type RoleBadgeColor = 'info' | 'success' | 'warning' | 'purple' | 'amber' | 'neutral';

/**
 * Single source of truth for role badge colors across web and mobile.
 *
 * Colors match the pre-existing correct surfaces (web building members table
 * and role-switcher badges) so this introduces no visual change there.
 */
export const ROLE_BADGE_COLORS: Record<DisplayableRole, RoleBadgeColor> = {
  // Building roles
  [BuildingRole.OWNER_REPRESENTATIVE]: 'info',
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 'success',
  [BuildingRole.CO_OWNER]: 'warning',
  [BuildingRole.RESIDENT]: 'neutral',
  [ApartmentRole.TENANT]: 'neutral',

  // Org roles
  [OrgRole.ORG_ADMIN]: 'purple',
  [OrgRole.SUPERVISOR]: 'info',
  [OrgRole.REFERENT]: 'success',
  [OrgRole.OPERATIVE]: 'amber',

  // Platform roles
  [PlatformRole.PLATFORM_ADMIN]: 'purple',
  [PlatformRole.PLATFORM_MODERATOR]: 'info',
  [PlatformRole.PLATFORM_SUPPORT]: 'success',
  [PlatformRole.PLATFORM_OPERATIVE]: 'amber',
};

/**
 * Resolve the badge descriptor for a role value coming off the wire.
 *
 * Unknown values fall back to a neutral badge with a `roles.<value>` key so
 * a new role added to the backend degrades to the raw value in the UI instead
 * of crashing — the app-level locale-completeness tests catch the gap.
 */
export function getRoleBadge(role: string): { translationKey: string; color: RoleBadgeColor } {
  const known = role as DisplayableRole;
  return {
    translationKey: ROLE_TRANSLATION_KEYS[known] ?? `roles.${role}`,
    color: ROLE_BADGE_COLORS[known] ?? 'neutral',
  };
}
