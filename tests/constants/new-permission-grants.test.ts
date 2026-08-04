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

/**
 * T4 (2026-07-30): representatives run self-managed buildings, so they hold
 * the pričuva writes that were previously org-role-only. Residents
 * must never gain them. ORG_BROADCAST is the portfolio fan-out gate —
 * management roles only.
 */
describe('rep finance grants (T4) + org broadcast', () => {
  const T4_GRANTS = [
    Permission.FINANCIAL_CREATE,
    Permission.FINANCIAL_UPDATE,
    Permission.FINANCIAL_DELETE,
  ] as const;

  for (const role of [BuildingRole.OWNER_REPRESENTATIVE, BuildingRole.DEPUTY_REPRESENTATIVE]) {
    it(`${role} holds the finance writes`, () => {
      for (const perm of T4_GRANTS) {
        expect(BUILDING_ROLE_PERMISSIONS[role]).toContain(perm);
      }
    });
  }

  it('RESIDENT does not hold them', () => {
    for (const perm of T4_GRANTS) {
      expect(BUILDING_ROLE_PERMISSIONS[BuildingRole.RESIDENT]).not.toContain(perm);
    }
  });

  it('ORG_ADMIN and SUPERVISOR hold org:broadcast; REFERENT/OPERATIVE do not', () => {
    expect(ORG_ROLE_PERMISSIONS[OrgRole.ORG_ADMIN]).toContain(Permission.ORG_BROADCAST);
    expect(ORG_ROLE_PERMISSIONS[OrgRole.SUPERVISOR]).toContain(Permission.ORG_BROADCAST);
    expect(ORG_ROLE_PERMISSIONS[OrgRole.REFERENT]).not.toContain(Permission.ORG_BROADCAST);
    expect(ORG_ROLE_PERMISSIONS[OrgRole.OPERATIVE]).not.toContain(Permission.ORG_BROADCAST);
  });
});

/**
 * Platform staff-tier permissions (2026-08 platform hardening pass).
 *
 * These three are the structural fix for a privilege-escalation cluster: staff
 * management used to ride `platform:manage_users`, which PLATFORM_MODERATOR
 * holds — so a moderator could mint, demote and remove platform admins. Each
 * of these MUST stay ADMIN-exclusive; a widening edit is a security
 * regression, not a product tweak.
 */
describe('Platform staff-tier grants — ADMIN-exclusive', () => {
  const ADMIN_ONLY = [
    Permission.PLATFORM_MANAGE_STAFF,
    Permission.PLATFORM_VIEW_AUDIT,
    Permission.PLATFORM_MANAGE_DSAR,
  ] as const;

  it('PLATFORM_ADMIN holds all three', () => {
    for (const perm of ADMIN_ONLY) {
      expect(PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_ADMIN]).toContain(perm);
    }
  });

  for (const role of [
    PlatformRole.PLATFORM_MODERATOR,
    PlatformRole.PLATFORM_SUPPORT,
    PlatformRole.PLATFORM_OPERATIVE,
  ]) {
    it(`${role} holds none of them`, () => {
      for (const perm of ADMIN_ONLY) {
        expect(PLATFORM_ROLE_PERMISSIONS[role]).not.toContain(perm);
      }
    });
  }

  it('staff management is NOT reachable via platform:manage_users', () => {
    // The whole point of the split: MODERATOR keeps manage_users (ordinary app
    // users) but must not thereby reach staff rows.
    expect(PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_MODERATOR]).toContain(
      Permission.PLATFORM_MANAGE_USERS,
    );
    expect(PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_MODERATOR]).not.toContain(
      Permission.PLATFORM_MANAGE_STAFF,
    );
  });
});

/**
 * The blog publishes to and deletes from the PUBLIC marketing site, so
 * `platform:moderate_content` is an outward-facing capability rather than an
 * internal one. PLATFORM_SUPPORT is rank 1 of 4 — a support tier should not
 * be able to put text in front of every visitor to flatie.hr.
 *
 * Pinned because nothing pinned it before: the grant sat unnoticed until a
 * per-role e2e gating run surfaced it, and the fix is one line to undo.
 */
describe('platform:moderate_content is not a support-tier capability', () => {
  it('is held by ADMIN and MODERATOR only', () => {
    const holders = Object.values(PlatformRole).filter((role) =>
      PLATFORM_ROLE_PERMISSIONS[role].includes('platform:moderate_content' as Permission),
    );

    expect(holders.sort()).toEqual(
      [PlatformRole.PLATFORM_ADMIN, PlatformRole.PLATFORM_MODERATOR].sort(),
    );
  });

  it('leaves SUPPORT its other three grants', () => {
    // Removing one permission must not quietly narrow the role further.
    expect(PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_SUPPORT].sort()).toEqual(
      ['platform:approve_buildings', 'platform:view_analytics', 'platform:view_orgs'].sort(),
    );
  });
});
