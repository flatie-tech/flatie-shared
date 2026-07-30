import { describe, expect, it } from 'vitest';
import {
  BUILDING_ROLE_PERMISSIONS,
  OWNERSHIP_DERIVED_PERMISSIONS,
} from '../../src/constants/role-permissions';
import { BuildingRole } from '../../src/enums';

/**
 * Pins the ONE-SENTENCE permission rule (decided 2026-07-28):
 *
 *   membership grants PARTICIPATION, ownership grants MONEY and LEGAL
 *   DECISIONS.
 *
 * The ownership overlay is deliberately tiny — the two money reads. Consensus
 * eligibility is NOT here at all: poll-voting derives it from ledger weight,
 * so it cannot be granted or leaked through this list.
 *
 * If you are editing this test because you added a permission to
 * OWNERSHIP_DERIVED_PERMISSIONS: stop and answer first — is the new right
 * about money or a legal co-ownership decision? If not, it belongs in
 * RESIDENT_PERMISSIONS (participation is membership). Growing the overlay
 * re-introduces the "co-owner minus arbitrary list" model this rule replaced.
 */

describe('ownership overlay — membership vs money', () => {
  it('the overlay is exactly the two money reads', () => {
    expect([...OWNERSHIP_DERIVED_PERMISSIONS].sort()).toEqual([
      'board_card:read',
      'financial:read',
    ]);
  });

  it('residents hold participation without the overlay', () => {
    const resident = BUILDING_ROLE_PERMISSIONS[BuildingRole.RESIDENT] as string[];
    for (const participation of [
      'poll:vote',
      'notice:create',
      'event:create',
      'poll:create',
      'document:create',
      'failure_report:create',
    ]) {
      expect(resident).toContain(participation);
    }
    for (const money of OWNERSHIP_DERIVED_PERMISSIONS) {
      expect(resident).not.toContain(money);
    }
  });
});
