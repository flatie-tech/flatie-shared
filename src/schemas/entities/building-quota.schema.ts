import { z } from 'zod';
import { QUOTA_RESOURCE_TYPES, type QuotaResourceType } from '../../enums/quota.enum';

/**
 * One row of per-building daily quota configuration. `dailyLimit` is an integer
 * number of actions allowed per day per user in that building; `null` means
 * "unlimited" (quota is disabled for this resource in this building).
 */
export const buildingQuotaEntrySchema = z.object({
  resourceType: z.enum(
    QUOTA_RESOURCE_TYPES as unknown as [QuotaResourceType, ...QuotaResourceType[]],
  ),
  dailyLimit: z.number().int().min(0).max(10000).nullable(),
});

/**
 * PUT /buildings/:id/quotas payload — full list of quota rows the representative
 * is configuring for the building. Missing resource types fall back to the
 * platform defaults from `QUOTA_DEFAULT_DAILY_LIMITS`.
 */
export const buildingQuotaConfigSchema = z.object({
  quotas: z.array(buildingQuotaEntrySchema).max(QUOTA_RESOURCE_TYPES.length),
});

/**
 * GET /buildings/:id/quotas response shape.
 */
export const buildingQuotaListSchema = z.object({
  buildingId: z.string().uuid(),
  quotas: z.array(buildingQuotaEntrySchema),
});

export type BuildingQuotaEntry = z.infer<typeof buildingQuotaEntrySchema>;
export type BuildingQuotaConfig = z.infer<typeof buildingQuotaConfigSchema>;
export type BuildingQuotaList = z.infer<typeof buildingQuotaListSchema>;
