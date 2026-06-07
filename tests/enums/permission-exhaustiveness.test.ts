import { describe, expect, it } from 'vitest';
import {
  BUILDING_ROLE_PERMISSIONS,
  ORG_ROLE_PERMISSIONS,
  PLATFORM_ROLE_PERMISSIONS,
} from '../../src/constants/role-permissions';
import { Permission } from '../../src/enums/permission.enum';

const allEnumValues = new Set(Object.values(Permission));

const allAssignedPermissions = new Set([
  ...Object.values(BUILDING_ROLE_PERMISSIONS).flat(),
  ...Object.values(ORG_ROLE_PERMISSIONS).flat(),
  ...Object.values(PLATFORM_ROLE_PERMISSIONS).flat(),
]);

describe('Permission exhaustiveness — enum vs. role mappings', () => {
  it('every Permission enum value is assigned to at least one role', () => {
    const unassigned = [...allEnumValues].filter((p) => !allAssignedPermissions.has(p));
    expect(
      unassigned,
      `These permissions exist in the enum but are not assigned to any role: ${unassigned.join(', ')}`,
    ).toEqual([]);
  });

  it('every permission referenced in role mappings exists in the Permission enum', () => {
    const phantom = [...allAssignedPermissions].filter((p) => !allEnumValues.has(p));
    expect(
      phantom,
      `These strings appear in role mappings but are not in the Permission enum: ${phantom.join(', ')}`,
    ).toEqual([]);
  });
});
