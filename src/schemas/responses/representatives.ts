import { z } from 'zod';
import { BuildingRole } from '../../enums/role.enum';
import { buildingTypeSchema } from '../entities/building.schema';
import { paginatedResponseSchema } from '../pagination.schema';
import type { Strict } from './_strict';

/**
 * Response contracts for the representative endpoints:
 * `GET /representatives/users`, `GET /representatives/buildings`,
 * `GET /representatives/dashboard/summary`.
 *
 * Mirrors the backend's `UserSummaryDto` / `AdminBuildingDto` /
 * `DashboardSummaryDto`. Web (`parseData`) and mobile parse the same
 * shapes; per-association action flags (`canEdit`, `canKick`) are the
 * single gating source for row actions on both clients.
 */

// ── Rep users ───────────────────────────────────────────────────────

const repUserRoleSchema = z
  .enum([
    BuildingRole.OWNER_REPRESENTATIVE,
    BuildingRole.DEPUTY_REPRESENTATIVE,
    BuildingRole.CO_OWNER,
    BuildingRole.RESIDENT,
  ])
  .describe('Role the user holds within the specific building association.');

export const repUserBuildingSchema = z
  .looseObject({
    buildingId: z.string().uuid(),
    buildingName: z.string().describe('Display name of the associated building.'),
    buildingAddress: z.string().describe('Full postal address of the associated building.'),
    roleType: repUserRoleSchema,
    buildingSurfacePercentage: z
      .string()
      .describe(
        'The user’s ownership share of the building surface, serialized as a decimal string (e.g. "12.50").',
      ),
    createdAt: z.string().describe('ISO-8601 timestamp when the user joined this building.'),
    canEdit: z
      .boolean()
      .describe('True when the caller may edit this association (role, surface share).'),
    canKick: z.boolean().describe('True when the caller may remove the user from this building.'),
  })
  .describe('One building association of a user visible to the calling representative.');

export const repUserItemSchema = z
  .looseObject({
    id: z.string().uuid(),
    name: z.string().describe('User display name.'),
    email: z.string().describe('User contact email.'),
    phone: z
      .string()
      .nullable()
      .optional()
      .describe('Contact phone, or null when the user has not set one.'),
    address: z
      .string()
      .nullable()
      .optional()
      .describe('User postal address, or null when not provided.'),
    buildings: z
      .array(repUserBuildingSchema)
      .describe('All of the user’s associations within the caller’s buildings.'),
    isYou: z.boolean().describe('True when this row is the calling user.'),
  })
  .describe('A user visible to the calling representative, flattened across buildings.');

export const paginatedRepUsersResponseSchema = paginatedResponseSchema(repUserItemSchema);

// ── Rep buildings ───────────────────────────────────────────────────

const repBuildingManagerSchema = z
  .looseObject({
    name: z.string().describe('Display name of the assigned management-firm contact.'),
    email: z.string().describe('Contact email for the assigned manager.'),
  })
  .describe('Summary of the building’s assigned management-firm contact.');

const repBuildingFundsSchema = z
  .looseObject({
    currentBalance: z
      .string()
      .describe('Current fund balance as a decimal string (e.g. "27820.54").'),
    currency: z.string().describe('Currency symbol or code displayed alongside the balance.'),
  })
  .describe('Summary of the building’s current fund balance.');

export const repBuildingItemSchema = z
  .looseObject({
    id: z.string().uuid(),
    name: z.string().describe('Building display name.'),
    address: z.string().describe('Full postal address of the building.'),
    type: buildingTypeSchema,
    status: z.string().describe('Building lifecycle status (`pending`, `active`, `rejected`).'),
    totalUnits: z.number().describe('Declared number of individual units.'),
    manager: repBuildingManagerSchema,
    funds: repBuildingFundsSchema,
    createdAt: z.string().describe('ISO-8601 timestamp when the building record was created.'),
    updatedAt: z
      .string()
      .nullable()
      .optional()
      .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
    coverImage: z
      .string()
      .nullable()
      .optional()
      .describe('Absolute URL of the cover photo, or null when no cover image is set.'),
  })
  .describe(
    'A building managed by the calling representative, as listed in the rep buildings table.',
  );

export const paginatedRepBuildingsResponseSchema = paginatedResponseSchema(repBuildingItemSchema);

// ── Rep dashboard summary ───────────────────────────────────────────

export const REP_RECENT_ACTIVITY_TYPES = [
  'notice',
  'maintenance',
  'failure_report',
  'user_joined',
] as const;

export const repRecentActivityTypeSchema = z
  .enum(REP_RECENT_ACTIVITY_TYPES)
  .describe('Kind of event surfaced in the recent-activity feed.');

export const repRecentActivitySchema = z
  .looseObject({
    buildingId: z.string().describe('UUID of the building the activity happened in.'),
    buildingName: z.string().describe('Display name of the building.'),
    activityType: repRecentActivityTypeSchema,
    description: z.string().describe('Human-readable one-line summary of the activity.'),
    timestamp: z.string().describe('ISO-8601 timestamp of the activity.'),
    userId: z
      .string()
      .nullable()
      .optional()
      .describe('UUID of the acting user, when the activity has an actor.'),
    userName: z
      .string()
      .nullable()
      .optional()
      .describe('Display name of the acting user, when the activity has an actor.'),
  })
  .describe('One row of the representative dashboard recent-activity feed.');

export const repBuildingActivitySchema = z
  .looseObject({
    buildingId: z.string().describe('UUID of the building.'),
    buildingName: z.string().describe('Display name of the building.'),
    buildingAddress: z.string().describe('Full postal address of the building.'),
    buildingType: buildingTypeSchema,
    lastActivityAt: z.string().describe('ISO-8601 timestamp of the most recent activity.'),
  })
  .describe('A building with activity in the last 24 hours ("buildings updated" list).');

export const repDashboardSummaryResponseSchema = z
  .looseObject({
    buildings: z
      .looseObject({
        total: z.number().describe('Total buildings managed by the caller.'),
        addedThisMonth: z.number().describe('Buildings added this calendar month.'),
        byType: z
          .looseObject({
            residential: z.number().describe('Residential buildings managed by the caller.'),
            commercial: z.number().describe('Commercial buildings managed by the caller.'),
          })
          .describe('Building counts split by usage type.'),
      })
      .describe('Building statistics for the caller’s portfolio.'),
    users: z
      .looseObject({
        total: z.number().describe('Total users across the caller’s buildings.'),
        managers: z.number().describe('Users holding a managerial role.'),
        newThisMonth: z.number().describe('Users who joined this calendar month.'),
        byRole: z
          .looseObject({
            admin: z.number().describe('Users counted under the admin bucket.'),
            manager: z.number().describe('Users counted under the manager bucket.'),
            tenant: z.number().describe('Users counted under the tenant bucket.'),
          })
          .describe('User counts split by coarse role bucket.'),
      })
      .describe('User statistics across the caller’s buildings.'),
    activities: z
      .looseObject({
        notices: z
          .looseObject({
            total: z.number().describe('All notices across the caller’s buildings.'),
            pending: z.number().describe('Notices awaiting representative approval.'),
            today: z.number().describe('Notices created today.'),
          })
          .describe('Notice counts.'),
        maintenanceLogs: z
          .looseObject({
            total: z.number().describe('All maintenance logs across the caller’s buildings.'),
            today: z.number().describe('Maintenance logs created today.'),
          })
          .describe('Maintenance-log counts.'),
        failureReports: z
          .looseObject({
            total: z.number().describe('All failure reports across the caller’s buildings.'),
            open: z.number().describe('Reports not yet resolved.'),
            resolved: z.number().describe('Reports already resolved.'),
            today: z.number().describe('Reports submitted today.'),
          })
          .describe('Failure-report counts.'),
      })
      .describe('Activity statistics per content type.'),
    polls: z
      .looseObject({
        active: z.number().describe('Approved polls currently open for voting.'),
        pendingApproval: z.number().describe('Polls awaiting representative approval.'),
        expiringSoon: z.number().describe('Active polls with a deadline within 48 hours.'),
      })
      .nullable()
      .optional()
      .describe('Poll statistics; absent when the caller has no poll access.'),
    funds: z
      .looseObject({
        totalBalance: z.string().describe('Sum of all building fund balances as a decimal string.'),
        buildingsWithFunds: z.number().describe('Buildings that have a fund record.'),
        negativeBalanceCount: z.number().describe('Buildings with a negative fund balance.'),
      })
      .nullable()
      .optional()
      .describe('Fund-balance statistics; absent when the caller has no financial access.'),
    recentActivity: z
      .array(repRecentActivitySchema)
      .describe('Most recent activities across the caller’s buildings, newest first.'),
    buildingsWithActivity: z
      .array(repBuildingActivitySchema)
      .describe('Buildings with activity in the last 24 hours.'),
    totalUsers: z.number().describe('Total unique users across all of the caller’s buildings.'),
    totalManagers: z.number().describe('Total unique building managers.'),
    newManagersThisMonth: z.number().describe('Managers who joined this calendar month.'),
    newUsersThisMonth: z.number().describe('Users who joined this calendar month.'),
    activitiesLast24Hours: z.number().describe('Total activities in the last 24 hours.'),
    pendingSignatureVotes: z
      .number()
      .nullable()
      .optional()
      .describe('Printed-signature votes awaiting representative review (rep scope only).'),
  })
  .describe('Payload of `GET /representatives/dashboard/summary`.');

// ── Inferred types ──────────────────────────────────────────────────

export type RepUserBuilding = Strict<z.infer<typeof repUserBuildingSchema>>;
export type RepUserItem = Strict<z.infer<typeof repUserItemSchema>>;
export type PaginatedRepUsersResponse = Strict<z.infer<typeof paginatedRepUsersResponseSchema>>;
export type RepBuildingItem = Strict<z.infer<typeof repBuildingItemSchema>>;
export type PaginatedRepBuildingsResponse = Strict<
  z.infer<typeof paginatedRepBuildingsResponseSchema>
>;
export type RepRecentActivityType = z.infer<typeof repRecentActivityTypeSchema>;
export type RepRecentActivity = Strict<z.infer<typeof repRecentActivitySchema>>;
export type RepBuildingActivity = Strict<z.infer<typeof repBuildingActivitySchema>>;
export type RepDashboardSummaryResponse = Strict<z.infer<typeof repDashboardSummaryResponseSchema>>;
