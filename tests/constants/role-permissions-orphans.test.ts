import { describe, expect, it } from 'vitest';
import {
  BUILDING_ROLE_PERMISSIONS,
  ORG_ROLE_PERMISSIONS,
  PLATFORM_ROLE_PERMISSIONS,
} from '../../src/constants/role-permissions';
import { Permission } from '../../src/enums/permission.enum';

/**
 * Permissions that intentionally exist in the enum without being granted to
 * any role. Each entry needs a comment explaining why it is ungranted.
 *
 * Currently empty: every Permission enum value is granted to at least one
 * role. If you add a permission ahead of wiring it to a role (incremental
 * rollout), list it here with a reason — and remove it once granted, or the
 * exact-equality assertion below will fail on the stale entry.
 */
const KNOWN_ORPHANS: string[] = [];

const allGrantedPermissions = new Set([
  ...Object.values(BUILDING_ROLE_PERMISSIONS).flat(),
  ...Object.values(ORG_ROLE_PERMISSIONS).flat(),
  ...Object.values(PLATFORM_ROLE_PERMISSIONS).flat(),
]);

describe('Role permissions — orphan allowlist', () => {
  it('the set of ungranted permissions exactly equals KNOWN_ORPHANS', () => {
    const orphans = Object.values(Permission)
      .filter((p) => !allGrantedPermissions.has(p))
      .sort();

    // Exact equality cuts both ways:
    //  - a NEW orphan (enum value granted to no role) must be consciously
    //    allowlisted here, with a reason;
    //  - a STALE allowlist entry (permission that has since been granted,
    //    or removed from the enum) must be deleted.
    expect(orphans).toEqual([...KNOWN_ORPHANS].sort());
  });

  it('every KNOWN_ORPHANS entry is a real Permission enum value', () => {
    const enumValues = new Set(Object.values(Permission));
    const phantom = KNOWN_ORPHANS.filter((p) => !enumValues.has(p as Permission));
    expect(
      phantom,
      `These allowlist entries are not in the Permission enum: ${phantom.join(', ')}`,
    ).toEqual([]);
  });
});
