import { describe, expect, it } from 'vitest';
import { ApartmentRole, BuildingRole, OrgRole, PlatformRole } from '../../src/enums';
import {
  getRoleBadge,
  ROLE_BADGE_COLORS,
  ROLE_DESCRIPTION_KEYS,
  ROLE_TRANSLATION_KEYS,
} from '../../src/utils';

const ALL_DISPLAYABLE_ROLES: string[] = [
  ...Object.values(BuildingRole),
  ...Object.values(OrgRole),
  ...Object.values(PlatformRole),
  ApartmentRole.TENANT,
];

describe('role display maps', () => {
  it('every displayable role has a translation key, a description key, and a badge color', () => {
    for (const role of ALL_DISPLAYABLE_ROLES) {
      expect(ROLE_TRANSLATION_KEYS[role as keyof typeof ROLE_TRANSLATION_KEYS], role).toBe(
        `roles.${role.toUpperCase()}`,
      );
      expect(ROLE_DESCRIPTION_KEYS[role as keyof typeof ROLE_DESCRIPTION_KEYS], role).toBeDefined();
      expect(ROLE_BADGE_COLORS[role as keyof typeof ROLE_BADGE_COLORS], role).toBeDefined();
    }
  });

  it('maps are keyed by the lowercase wire values, not enum constant names', () => {
    // Regression guard: UPPERCASE-keyed lookup maps against lowercase wire data
    // is exactly the bug that shipped raw `co_owner` labels to the chat UI.
    expect(ROLE_TRANSLATION_KEYS[BuildingRole.CO_OWNER]).toBe('roles.CO_OWNER');
    expect(ROLE_TRANSLATION_KEYS['CO_OWNER' as BuildingRole]).toBeUndefined();
    expect(ROLE_BADGE_COLORS[BuildingRole.CO_OWNER]).toBe('warning');
    expect(ROLE_BADGE_COLORS['CO_OWNER' as BuildingRole]).toBeUndefined();
  });
});

describe('getRoleBadge', () => {
  it('resolves known roles to their translation key and color', () => {
    expect(getRoleBadge(BuildingRole.OWNER_REPRESENTATIVE)).toEqual({
      translationKey: 'roles.OWNER_REPRESENTATIVE',
      color: 'info',
    });
    expect(getRoleBadge(OrgRole.ORG_ADMIN)).toEqual({
      translationKey: 'roles.ORG_ADMIN',
      color: 'purple',
    });
    expect(getRoleBadge(ApartmentRole.TENANT)).toEqual({
      translationKey: 'roles.TENANT',
      color: 'neutral',
    });
  });

  it('falls back to a neutral badge with a roles.<value> key for unknown roles', () => {
    expect(getRoleBadge('brand_new_role')).toEqual({
      translationKey: 'roles.brand_new_role',
      color: 'neutral',
    });
  });
});
