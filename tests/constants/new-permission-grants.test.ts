import { describe, expect, it } from 'vitest';
import {
  BUILDING_ROLE_PERMISSIONS,
  ORG_ROLE_PERMISSIONS,
  PLATFORM_ROLE_PERMISSIONS,
} from '../../src/constants/role-permissions';
import { BuildingRole, OrgRole, Permission, PlatformRole } from '../../src/enums';

/**
 * Pins the role grants for the four permissions introduced with the unified
 * `can()` migration. These encode product decisions (who can do what) that
 * otherwise live only as string literals in role-permissions.ts — this test
 * fails loudly if a future edit silently widens or drops them.
 *
 * Behaviour notes captured here:
 *  - The three building-scoped perms were granted to REPRESENTATIVE, so org
 *    ORG_ADMIN/SUPERVISOR inherit them (a deliberate superset of the old
 *    rep-only role checks they replaced).
 *  - PLATFORM_VIEW_ARCHIVE is PLATFORM_ADMIN-only (behaviour-equivalent to the
 *    previous role-equality guard).
 *  - Org-scoped chat group creation is gated by CHAT_CREATE_GROUP on the org
 *    context (backend org-chat controller + client can() checks), so the
 *    ORG_ADMIN/SUPERVISOR-only pins below are load-bearing for that feature.
 */

const REP_BUILDING_GRANTS = [
  Permission.DOCUMENT_SET_PRIVATE,
  Permission.CHAT_CREATE_GROUP,
  Permission.POLL_EXPORT_SIGNERS,
] as const;

describe('New permission grants — unified can() migration', () => {
  describe('representative-level building permissions', () => {
    for (const role of [BuildingRole.OWNER_REPRESENTATIVE, BuildingRole.DEPUTY_REPRESENTATIVE]) {
      it(`${role} is granted all three`, () => {
        for (const perm of REP_BUILDING_GRANTS) {
          expect(BUILDING_ROLE_PERMISSIONS[role]).toContain(perm);
        }
      });
    }

    for (const role of [BuildingRole.CO_OWNER, BuildingRole.RESIDENT]) {
      it(`${role} is granted none of them`, () => {
        for (const perm of REP_BUILDING_GRANTS) {
          expect(BUILDING_ROLE_PERMISSIONS[role]).not.toContain(perm);
        }
      });
    }
  });

  describe('org roles inherit the representative grants', () => {
    for (const role of [OrgRole.ORG_ADMIN, OrgRole.SUPERVISOR]) {
      it(`${role} inherits all three (documented superset)`, () => {
        for (const perm of REP_BUILDING_GRANTS) {
          expect(ORG_ROLE_PERMISSIONS[role]).toContain(perm);
        }
      });
    }

    for (const role of [OrgRole.REFERENT, OrgRole.OPERATIVE]) {
      it(`${role} does not get them`, () => {
        for (const perm of REP_BUILDING_GRANTS) {
          expect(ORG_ROLE_PERMISSIONS[role]).not.toContain(perm);
        }
      });
    }
  });

  describe('platform archive view', () => {
    it('PLATFORM_ADMIN can view the archive', () => {
      expect(PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_ADMIN]).toContain(
        Permission.PLATFORM_VIEW_ARCHIVE,
      );
    });

    for (const role of [
      PlatformRole.PLATFORM_MODERATOR,
      PlatformRole.PLATFORM_SUPPORT,
      PlatformRole.PLATFORM_OPERATIVE,
    ]) {
      it(`${role} cannot`, () => {
        expect(PLATFORM_ROLE_PERMISSIONS[role]).not.toContain(Permission.PLATFORM_VIEW_ARCHIVE);
      });
    }
  });
});
