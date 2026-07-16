import { z } from 'zod';
import { ORG_QUOTA_RESOURCE_TYPES, type OrgQuotaResourceType } from '../../enums/quota.enum';

/**
 * One row of per-organization daily quota configuration. Mirrors the
 * per-building schema but keyed on orgId + OrgQuotaResourceType. Null
 * `dailyLimit` means "unlimited" for this resource in this org.
 *
 * @deprecated Org quotas were never implemented backend-side (the
 * `ORGANIZATIONS.QUOTAS` route is a phantom) and no consumer uses these
 * schemas. Will be removed in v0.60.0 — building quotas
 * (`building-quota.schema.ts`) are unaffected.
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
 *
 * @deprecated Never implemented backend-side; zero consumers. Will be removed in v0.60.0.
 */
export const orgQuotaConfigSchema = z.object({
  quotas: z.array(orgQuotaEntrySchema).max(ORG_QUOTA_RESOURCE_TYPES.length),
});

/**
 * GET /organizations/:orgId/quotas response shape.
 *
 * @deprecated Never implemented backend-side; zero consumers. Will be removed in v0.60.0.
 */
export const orgQuotaListSchema = z.object({
  orgId: z.string().uuid(),
  quotas: z.array(orgQuotaEntrySchema),
});

/** @deprecated Removed in v0.60.0 together with the org-quota schemas. */
export type OrgQuotaEntry = z.infer<typeof orgQuotaEntrySchema>;
/** @deprecated Removed in v0.60.0 together with the org-quota schemas. */
export type OrgQuotaConfig = z.infer<typeof orgQuotaConfigSchema>;
/** @deprecated Removed in v0.60.0 together with the org-quota schemas. */
export type OrgQuotaList = z.infer<typeof orgQuotaListSchema>;
