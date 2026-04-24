import { z } from 'zod';
import { ORG_QUOTA_RESOURCE_TYPES, type OrgQuotaResourceType } from '../../enums/quota.enum';

/**
 * One row of per-organization daily quota configuration. Mirrors the
 * per-building schema but keyed on orgId + OrgQuotaResourceType. Null
 * `dailyLimit` means "unlimited" for this resource in this org.
 */
export const orgQuotaEntrySchema = z.object({
  resourceType: z.enum(
    ORG_QUOTA_RESOURCE_TYPES as unknown as [OrgQuotaResourceType, ...OrgQuotaResourceType[]],
  ),
  dailyLimit: z.number().int().min(0).max(10000).nullable(),
});

/**
 * PUT /organizations/:orgId/quotas payload. Missing resource types fall
 * back to the platform defaults in `ORG_QUOTA_DEFAULT_DAILY_LIMITS`.
 */
export const orgQuotaConfigSchema = z.object({
  quotas: z.array(orgQuotaEntrySchema).max(ORG_QUOTA_RESOURCE_TYPES.length),
});

/**
 * GET /organizations/:orgId/quotas response shape.
 */
export const orgQuotaListSchema = z.object({
  orgId: z.string().uuid(),
  quotas: z.array(orgQuotaEntrySchema),
});

export type OrgQuotaEntry = z.infer<typeof orgQuotaEntrySchema>;
export type OrgQuotaConfig = z.infer<typeof orgQuotaConfigSchema>;
export type OrgQuotaList = z.infer<typeof orgQuotaListSchema>;
