import { z } from 'zod';
import { EnterpriseRequestStatus } from '../../enums/enterprise-request.enum';
import { booleanish } from '../base.schema';

/**
 * Staff-side subscription administration.
 *
 * The load-bearing field is `pricePerUnitCents`: the `enterprise` tier has no
 * catalog price, so invoicing an enterprise subscription without one throws.
 * Until this schema existed there was no endpoint that could write it — it was
 * set by hand in psql.
 */

const tierSchema = z.enum(['standard', 'enterprise']);
const entityTypeSchema = z.enum(['building', 'organization']);

/** Enterprise requires a negotiated price; standard must NOT carry one. */
function priceMatchesTier(v: { tier?: string; pricePerUnitCents?: number | null }): boolean {
  if (v.tier === 'enterprise') return typeof v.pricePerUnitCents === 'number';
  if (v.tier === 'standard') return v.pricePerUnitCents == null;
  return true;
}

const PRICE_RULE = {
  message:
    'Enterprise subscriptions require pricePerUnitCents; standard subscriptions use the catalog price and must omit it',
  path: ['pricePerUnitCents'] as PropertyKey[],
};

export const createPlatformSubscriptionSchema = z
  .object({
    entityType: entityTypeSchema,
    entityId: z.string().uuid(),
    tier: tierSchema,
    quantity: z.number().int().min(1).max(10_000).describe('Billable units (apartments).'),
    pricePerUnitCents: z
      .number()
      .int()
      .min(1)
      .max(1_000_000)
      .nullable()
      .optional()
      .describe('Negotiated monthly price per unit, in euro cents. Enterprise only.'),
    trialEndsAt: z.string().nullable().optional(),
  })
  .refine(priceMatchesTier, PRICE_RULE)
  .meta({ id: 'CreatePlatformSubscription' });

export const updatePlatformSubscriptionSchema = z
  .object({
    tier: tierSchema.optional(),
    quantity: z.number().int().min(1).max(10_000).optional(),
    pricePerUnitCents: z.number().int().min(1).max(1_000_000).nullable().optional(),
    trialEndsAt: z.string().nullable().optional(),
    status: z.enum(['active', 'past_due', 'cancelled']).optional(),
  })
  .meta({ id: 'UpdatePlatformSubscription' });

export const getPlatformSubscriptionsQuerySchema = z.object({
  status: z.string().trim().max(32).optional(),
  tier: tierSchema.optional(),
  entityType: entityTypeSchema.optional(),
  trialing: booleanish.optional().describe('Only subscriptions still inside a trial.'),
  search: z.string().trim().max(255).optional(),
  sortBy: z.string().trim().max(32).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const platformSubscriptionResponseSchema = z
  .looseObject({
    id: z.string().uuid(),
    entityType: entityTypeSchema,
    entityId: z.string().uuid(),
    entityName: z.string().nullable(),
    tier: tierSchema,
    status: z.string(),
    quantity: z.number(),
    pricePerUnitCents: z.number().nullable(),
    /** Computed: quantity × (negotiated price or the catalog price). */
    monthlyTotalCents: z.number(),
    trialEndsAt: z.string().nullable(),
    trialEndedAt: z.string().nullable().optional(),
    currentPeriodEnd: z.string().nullable(),
    priceSetAt: z.string().nullable().optional(),
    priceSetByName: z.string().nullable().optional(),
    createdAt: z.string(),
  })
  .meta({ id: 'PlatformSubscriptionResponse' });

// ─── Enterprise requests ────────────────────────────────────────────

const enterpriseStatusSchema = z.enum(
  Object.values(EnterpriseRequestStatus) as [EnterpriseRequestStatus, ...EnterpriseRequestStatus[]],
);

export const updateEnterpriseRequestSchema = z
  .object({
    status: enterpriseStatusSchema,
    notes: z.string().trim().max(2000).nullable().optional(),
  })
  .meta({ id: 'UpdateEnterpriseRequest' });

export const getEnterpriseRequestsQuerySchema = z.object({
  status: enterpriseStatusSchema.optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const enterpriseRequestResponseSchema = z
  .looseObject({
    id: z.string().uuid(),
    entityType: entityTypeSchema,
    entityId: z.string().uuid().nullable(),
    entityName: z.string().nullable(),
    requestedByName: z.string().nullable(),
    requestedByEmail: z.string().nullable(),
    unitCount: z.number().nullable(),
    status: enterpriseStatusSchema,
    notes: z.string().nullable(),
    handledByName: z.string().nullable().optional(),
    createdAt: z.string(),
  })
  .meta({ id: 'EnterpriseRequestResponse' });

// ─── Revenue metrics ────────────────────────────────────────────────

export const revenueMetricsResponseSchema = z
  .looseObject({
    /** Booked monthly recurring revenue in cents; excludes trialing entities. */
    mrrCents: z.number(),
    payingEntities: z.number(),
    billableUnits: z.number(),
    arpuCents: z.number(),
    /**
     * Rolling 90-day trial→paid conversion, 0–1. Null until enough history
     * accrues — trial end dates were being erased before this pass, so the
     * series starts at deploy rather than being backfilled.
     */
    trialConversionRate: z.number().nullable(),
    unpaidAging: z.array(
      z.object({
        bucket: z.enum(['0_30', '31_60', '61_90', '90_plus']),
        count: z.number(),
        amountCents: z.number(),
      }),
    ),
  })
  .meta({ id: 'RevenueMetricsResponse' });

export type CreatePlatformSubscriptionSchema = z.infer<typeof createPlatformSubscriptionSchema>;
export type UpdatePlatformSubscriptionSchema = z.infer<typeof updatePlatformSubscriptionSchema>;
export type GetPlatformSubscriptionsQuerySchema = z.infer<
  typeof getPlatformSubscriptionsQuerySchema
>;
export type PlatformSubscriptionResponse = z.infer<typeof platformSubscriptionResponseSchema>;
export type UpdateEnterpriseRequestSchema = z.infer<typeof updateEnterpriseRequestSchema>;
export type GetEnterpriseRequestsQuerySchema = z.infer<typeof getEnterpriseRequestsQuerySchema>;
export type EnterpriseRequestResponse = z.infer<typeof enterpriseRequestResponseSchema>;
export type RevenueMetricsResponse = z.infer<typeof revenueMetricsResponseSchema>;
