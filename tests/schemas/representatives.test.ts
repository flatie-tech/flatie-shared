import { describe, expect, it } from 'vitest';
import {
  getRepBuildingsParamsSchema,
  getRepUsersParamsSchema,
} from '../../src/schemas/rep-list-params.schema';
import {
  paginatedRepBuildingsResponseSchema,
  paginatedRepUsersResponseSchema,
  repDashboardSummaryResponseSchema,
} from '../../src/schemas/responses';

const BUILDING_ID = '550e8400-e29b-41d4-a716-446655440000';
const USER_ID = '7c0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a9d';

/**
 * Canonical backend-shaped fixtures. These are the cross-client drift
 * anchor: web (`parseData`) and mobile parse the exact same wire shape,
 * so a backend change that breaks either client breaks this test first.
 */
const REP_USER_FIXTURE = {
  id: USER_ID,
  name: 'Iva Horvat',
  email: 'iva@example.com',
  phone: '+385911234567',
  address: 'Ilica 1, Zagreb',
  isYou: false,
  buildings: [
    {
      buildingId: BUILDING_ID,
      buildingName: 'Zgrada Ilica 1',
      buildingAddress: 'Ilica 1, Zagreb',
      roleType: 'co_owner',
      buildingSurfacePercentage: '12.50',
      createdAt: '2026-01-15T10:00:00.000Z',
      canEdit: true,
      canKick: true,
    },
  ],
};

const REP_BUILDING_FIXTURE = {
  id: BUILDING_ID,
  name: 'Zgrada Ilica 1',
  address: 'Ilica 1, Zagreb',
  type: 'residential',
  status: 'active',
  totalUnits: 24,
  manager: { name: 'Uprava d.o.o.', email: 'uprava@example.com' },
  funds: { currentBalance: '27820.54', currency: '€' },
  createdAt: '2025-11-02T09:00:00.000Z',
  updatedAt: '2026-06-30T12:00:00.000Z',
  coverImage: null,
};

const paginated = <T>(item: T) => ({
  data: [item],
  count: 1,
  page: 1,
  limit: 20,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
});

const REP_DASHBOARD_SUMMARY_FIXTURE = {
  buildings: {
    total: 3,
    addedThisMonth: 1,
    byType: { residential: 2, commercial: 1 },
  },
  users: {
    total: 58,
    managers: 4,
    newThisMonth: 2,
    byRole: { admin: 0, manager: 4, tenant: 54 },
  },
  activities: {
    notices: { total: 40, pending: 3, today: 1 },
    maintenanceLogs: { total: 12, today: 0 },
    failureReports: { total: 9, open: 2, resolved: 7, today: 0 },
  },
  polls: { active: 2, pendingApproval: 1, expiringSoon: 1 },
  funds: { totalBalance: '31250.00', buildingsWithFunds: 3, negativeBalanceCount: 0 },
  recentActivity: [
    {
      buildingId: BUILDING_ID,
      buildingName: 'Zgrada Ilica 1',
      activityType: 'failure_report',
      description: 'New failure report: water leak in basement',
      timestamp: '2026-07-09T18:30:00.000Z',
      userId: USER_ID,
      userName: 'Iva Horvat',
    },
  ],
  buildingsWithActivity: [
    {
      buildingId: BUILDING_ID,
      buildingName: 'Zgrada Ilica 1',
      buildingAddress: 'Ilica 1, Zagreb',
      buildingType: 'residential',
      lastActivityAt: '2026-07-09T18:30:00.000Z',
    },
  ],
  totalUsers: 58,
  totalManagers: 4,
  newManagersThisMonth: 0,
  newUsersThisMonth: 2,
  activitiesLast24Hours: 5,
  pendingSignatureVotes: 2,
};

describe('representative response contracts', () => {
  it('parses a backend-shaped paginated rep-users envelope', () => {
    const result = paginatedRepUsersResponseSchema.safeParse(paginated(REP_USER_FIXTURE));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.data[0].buildings[0].canKick).toBe(true);
      expect(result.data.hasNextPage).toBe(false);
    }
  });

  it('parses a backend-shaped paginated rep-buildings envelope', () => {
    const result = paginatedRepBuildingsResponseSchema.safeParse(paginated(REP_BUILDING_FIXTURE));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.data[0].funds.currentBalance).toBe('27820.54');
    }
  });

  it('parses the rep dashboard summary payload', () => {
    const result = repDashboardSummaryResponseSchema.safeParse(REP_DASHBOARD_SUMMARY_FIXTURE);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.recentActivity[0].activityType).toBe('failure_report');
      expect(result.data.pendingSignatureVotes).toBe(2);
    }
  });

  it('rejects an unknown recent-activity type (route mapping stays exhaustive)', () => {
    const result = repDashboardSummaryResponseSchema.safeParse({
      ...REP_DASHBOARD_SUMMARY_FIXTURE,
      recentActivity: [
        { ...REP_DASHBOARD_SUMMARY_FIXTURE.recentActivity[0], activityType: 'poll_created' },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('tolerates additive backend fields (looseObject responses)', () => {
    const result = paginatedRepUsersResponseSchema.safeParse(
      paginated({ ...REP_USER_FIXTURE, newField: 'ignored' }),
    );
    expect(result.success).toBe(true);
  });
});

describe('representative list param contracts', () => {
  it('applies backend defaults for rep-users params', () => {
    const parsed = getRepUsersParamsSchema.parse({});
    expect(parsed).toMatchObject({
      limit: 50,
      offset: 0,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  });

  it('applies backend defaults for rep-buildings params and coerces numerics', () => {
    const parsed = getRepBuildingsParamsSchema.parse({ limit: '20', offset: '40' });
    expect(parsed.limit).toBe(20);
    expect(parsed.offset).toBe(40);
    expect(parsed.sortOrder).toBe('desc');
  });

  it('rejects an out-of-range limit', () => {
    expect(getRepUsersParamsSchema.safeParse({ limit: 101 }).success).toBe(false);
  });
});
