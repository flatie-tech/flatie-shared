import { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { PricuvaDeliveryChannel } from './pricuva-delivery.schema';

/**
 * Org-wide pričuva collections (opomene): one screen for "who across the
 * portfolio is ready for a letter", and issue them for every building at
 * once. Everything is derived from the per-building dunning evaluation
 * (`dunning.schema.ts`) — no new stored state.
 */
const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD.');
const channelSchema = z.enum([PricuvaDeliveryChannel.EMAIL, PricuvaDeliveryChannel.DOWNLOAD]);

export const orgDunningBuildingRowSchema = z
  .object({
    buildingId: uuidSchema,
    buildingName: z.string(),
    /** Building-level switch (`building_settings.dunning_enabled`). */
    dunningEnabled: z.boolean(),
    trackingActive: z.boolean(),
    totalOverdue: z.number().describe('Σ positive owner balances, EUR.'),
    debtors: z.number().int(),
    /** Owners the ladder would send an opomena to now (level split). */
    readyReminder: z.number().int(),
    readyFinal: z.number().int(),
    /** Ready owners the register shows were never billed — blocked without override. */
    readyNeverBilled: z.number().int(),
    openCases: z.number().int(),
    inEnforcement: z.number().int(),
    lastNoticeAt: z.string().nullable(),
  })
  .meta({ id: 'OrgDunningBuildingRow' });
export type OrgDunningBuildingRow = z.infer<typeof orgDunningBuildingRowSchema>;

export const orgDunningOverviewResponseSchema = z
  .object({
    orgId: uuidSchema,
    asOf: isoDateSchema,
    rows: z.array(orgDunningBuildingRowSchema),
    totalOverdue: z.number(),
    debtors: z.number().int(),
    ready: z.number().int().describe('Σ readyReminder + readyFinal, override-free.'),
    readyNeverBilled: z.number().int(),
    openCases: z.number().int(),
    inEnforcement: z.number().int(),
    buildingsEnabled: z.number().int(),
  })
  .meta({ id: 'OrgDunningOverviewResponse' });
export type OrgDunningOverviewResponse = z.infer<typeof orgDunningOverviewResponseSchema>;

export const orgDunningQuerySchema = z.object({
  asOf: isoDateSchema.optional().describe('Balance/interest cut-off; defaults to today.'),
});
export type OrgDunningQuery = z.infer<typeof orgDunningQuerySchema>;

export const issueOrgDunningSchema = z.object({
  /** Omitted = every visible building with dunning enabled and ready owners. */
  buildingIds: z.array(uuidSchema).max(500).optional(),
  channel: channelSchema,
  asOfDate: isoDateSchema.optional(),
  overrideNeverBilled: z.boolean().optional(),
  note: z.string().trim().max(500).optional(),
});
export type IssueOrgDunning = z.infer<typeof issueOrgDunningSchema>;

export const OrgDunningIssueStatus = { DONE: 'done', SKIPPED: 'skipped' } as const;
export type OrgDunningIssueStatus =
  (typeof OrgDunningIssueStatus)[keyof typeof OrgDunningIssueStatus];

export const orgDunningIssueResultSchema = z
  .object({
    buildingId: uuidSchema,
    buildingName: z.string(),
    status: z.enum(OrgDunningIssueStatus),
    /** `dunning_disabled | nothing_ready | <error message>` when skipped. */
    reason: z.string().nullable(),
    /** The building's notice batch — key for the ZIP. Null when skipped. */
    batchId: uuidSchema.nullable(),
    issued: z.number().int(),
    issuedReminder: z.number().int(),
    issuedFinal: z.number().int(),
    /** Owners the per-building issuer skipped (no e-mail, never billed, …). */
    skipped: z.number().int(),
    totalAmount: z.number(),
  })
  .meta({ id: 'OrgDunningIssueResult' });
export type OrgDunningIssueResult = z.infer<typeof orgDunningIssueResultSchema>;

export const issueOrgDunningResponseSchema = z
  .object({
    asOf: isoDateSchema,
    channel: channelSchema,
    results: z.array(orgDunningIssueResultSchema),
    buildingsDone: z.number().int(),
    buildingsSkipped: z.number().int(),
    issued: z.number().int(),
    skipped: z.number().int(),
    totalAmount: z.number(),
    /** Comma-joinable list for `DUNNING_ZIP?batchIds=`; empty for the e-mail channel. */
    batchIds: z.array(uuidSchema),
  })
  .meta({ id: 'IssueOrgDunningResponse' });
export type IssueOrgDunningResponse = z.infer<typeof issueOrgDunningResponseSchema>;

export const orgDunningZipQuerySchema = z.object({
  /** Comma-separated batch ids returned by the issue call. */
  batchIds: z.string().min(1),
});
export type OrgDunningZipQuery = z.infer<typeof orgDunningZipQuerySchema>;
