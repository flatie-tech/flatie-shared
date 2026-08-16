import { z } from 'zod';
import { DSAR_MAX_EXTENSION_DAYS, DsarRequestStatus, DsarRequestType } from '../../enums/dsar.enum';
import { booleanish } from '../base.schema';

/**
 * GDPR data-subject-access-request tracking for the platform DSAR console.
 *
 * `subjectUserId` is nullable and set-null on delete for two reasons: a
 * requester may have no Flatie account at all, and an *erasure* request must
 * outlive the account it erased (Art. 5(2) accountability).
 */

const dsarTypeSchema = z.enum(
  Object.values(DsarRequestType) as [DsarRequestType, ...DsarRequestType[]],
);
const dsarStatusSchema = z.enum(
  Object.values(DsarRequestStatus) as [DsarRequestStatus, ...DsarRequestStatus[]],
);

export const createDsarRequestSchema = z
  .object({
    subjectEmail: z
      .string()
      .trim()
      .email()
      .max(255)
      .describe('Email the request arrived from; auto-links to an account when one matches.'),
    type: dsarTypeSchema.describe('Which GDPR right the subject is exercising.'),
    receivedAt: z
      .string()
      .optional()
      .describe('ISO-8601. Defaults to now; settable because email may predate data entry.'),
    note: z.string().trim().max(2000).optional().describe('Opening note for the case timeline.'),
  })
  .meta({ id: 'CreateDsarRequest' });

export const updateDsarRequestSchema = z
  .object({
    status: dsarStatusSchema.optional(),
    assigneeUserId: z.string().uuid().nullable().optional(),
    resolutionNote: z
      .string()
      .trim()
      .max(2000)
      .nullable()
      .optional()
      .describe('Keep minimal — never paste the subject’s personal data here.'),
    identityVerifiedAt: z.string().nullable().optional(),
    /** Art. 12(3) extension. Requires a reason and is capped. */
    extendByDays: z.number().int().min(1).max(DSAR_MAX_EXTENSION_DAYS).optional(),
    extensionReason: z.string().trim().min(1).max(500).optional(),
  })
  .refine((v) => v.extendByDays == null || (v.extensionReason?.length ?? 0) > 0, {
    message: 'An extension reason is required when extending the deadline',
    path: ['extensionReason'],
  })
  .meta({ id: 'UpdateDsarRequest' });

export const createDsarEventSchema = z
  .object({
    note: z.string().trim().min(1).max(2000),
  })
  .meta({ id: 'CreateDsarEvent' });

export const setDsarRestrictionSchema = z
  .object({
    restricted: z.boolean(),
    reason: z.string().trim().max(500).optional(),
  })
  .meta({ id: 'SetDsarRestriction' });

export const dsarErasureSchema = z
  .object({
    /**
     * `schedule` runs the normal soft-delete + grace period (session
     * revocation included); `immediate` is the irreversible hard delete.
     */
    mode: z.enum(['schedule', 'immediate']),
  })
  .meta({ id: 'DsarErasure' });

export const recordDsarRectificationSchema = z
  .object({
    /** Field NAMES only — values must never be written to the case record. */
    fields: z.array(z.string().trim().min(1).max(64)).min(1).max(30),
    note: z.string().trim().max(2000).optional(),
  })
  .meta({ id: 'RecordDsarRectification' });

export const getDsarRequestsQuerySchema = z.object({
  status: dsarStatusSchema.optional(),
  type: dsarTypeSchema.optional(),
  assigneeUserId: z.string().uuid().optional(),
  overdue: booleanish.optional().describe('Only open requests past their due date.'),
  search: z.string().trim().max(255).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const dsarRequestResponseSchema = z
  .looseObject({
    id: z.string().uuid(),
    subjectUserId: z.string().uuid().nullable(),
    subjectEmail: z.string(),
    subjectName: z.string().nullable().optional(),
    type: dsarTypeSchema,
    status: dsarStatusSchema,
    receivedAt: z.string(),
    dueAt: z.string(),
    isOverdue: z.boolean().describe('Computed: past due and not yet closed.'),
    identityVerifiedAt: z.string().nullable(),
    assigneeUserId: z.string().uuid().nullable(),
    assigneeName: z.string().nullable().optional(),
    resolutionNote: z.string().nullable(),
    closedAt: z.string().nullable(),
    createdAt: z.string(),
  })
  .meta({ id: 'DsarRequestResponse' });

export const dsarEventResponseSchema = z
  .looseObject({
    id: z.string().uuid(),
    requestId: z.string().uuid(),
    actorUserId: z.string().uuid().nullable(),
    actorName: z.string().nullable().optional(),
    eventType: z.string(),
    note: z.string().nullable(),
    metadata: z.unknown().nullable().optional(),
    createdAt: z.string(),
  })
  .meta({ id: 'DsarEventResponse' });

export type CreateDsarRequestSchema = z.infer<typeof createDsarRequestSchema>;
export type UpdateDsarRequestSchema = z.infer<typeof updateDsarRequestSchema>;
export type CreateDsarEventSchema = z.infer<typeof createDsarEventSchema>;
export type SetDsarRestrictionSchema = z.infer<typeof setDsarRestrictionSchema>;
export type DsarErasureSchema = z.infer<typeof dsarErasureSchema>;
export type RecordDsarRectificationSchema = z.infer<typeof recordDsarRectificationSchema>;
export type GetDsarRequestsQuerySchema = z.infer<typeof getDsarRequestsQuerySchema>;
export type DsarRequestResponse = z.infer<typeof dsarRequestResponseSchema>;
export type DsarEventResponse = z.infer<typeof dsarEventResponseSchema>;
