import { z } from 'zod';
import { booleanish } from '../base.schema';

/**
 * Read contract for the platform audit-log viewer.
 *
 * Two action vocabularies coexist in `audit_logs` and the viewer must tolerate
 * both: `AuditInterceptor` writes route-shaped actions (`POST /platform/...`)
 * for every authenticated mutation, while services write semantic ones
 * (`invoice:mark-paid`). Filters therefore match exactly rather than parsing.
 */

/**
 * Denial rows are written by the permission guard on every 403. They are
 * useful for spotting probing but drown the real action feed, so the viewer
 * excludes them unless asked.
 */
export const AUDIT_DENIAL_TARGET_TYPE = 'permission_denial';

export const getAuditLogsQuerySchema = z.object({
  userId: z.string().uuid().optional().describe('Filter by actor.'),
  search: z.string().trim().max(255).optional().describe('Matches actor name or email.'),
  action: z.string().trim().max(120).optional(),
  targetType: z.string().trim().max(64).optional(),
  targetId: z.string().uuid().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  includeDenials: booleanish.optional().describe('Defaults to false.'),
  denialsOnly: booleanish.optional().describe('Security view: only 403 denials.'),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce
    .number()
    .int()
    .min(0)
    .max(10_000)
    .optional()
    .describe('Capped — deep paging into an append-only log is a scan, not a workflow.'),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const auditLogResponseSchema = z
  .looseObject({
    id: z.string().uuid(),
    createdAt: z.string(),
    userId: z.string().uuid().nullable(),
    actorName: z.string().nullable(),
    actorEmail: z.string().nullable(),
    action: z.string(),
    targetType: z.string(),
    targetId: z.string().uuid().nullable(),
    /** Credential-ish keys are redacted server-side before this is returned. */
    metadata: z.unknown().nullable(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
  })
  .meta({ id: 'AuditLogResponse' });

export type GetAuditLogsQuerySchema = z.infer<typeof getAuditLogsQuerySchema>;
export type AuditLogResponse = z.infer<typeof auditLogResponseSchema>;
