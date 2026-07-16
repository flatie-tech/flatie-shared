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
  // Orphan coverage (enum values granted to no role) lives in
  // tests/constants/role-permissions-orphans.test.ts, which asserts the
  // orphan set EXACTLY equals an explicit KNOWN_ORPHANS allowlist. A hard
  // zero-orphan assertion here would make that allowlist unusable, so this
  // file only checks the reverse direction.

  it('every permission referenced in role mappings exists in the Permission enum', () => {
    const phantom = [...allAssignedPermissions].filter((p) => !allEnumValues.has(p));
    expect(
      phantom,
      `These strings appear in role mappings but are not in the Permission enum: ${phantom.join(', ')}`,
    ).toEqual([]);
  });
});
