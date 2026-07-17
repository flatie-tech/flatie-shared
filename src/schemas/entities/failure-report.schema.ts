import { z } from 'zod';
import { FailureLocationType, FailureUnitType } from '../../enums/failure-location.enum';
import { FailureStatus, Priority } from '../../enums/status.enum';
import { uuidSchema } from '../base.schema';
import { multipartArray, multipartBoolean } from '../multipart.schema';

/**
 * Validation constants for failure reports
 */
export const FAILURE_REPORT_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2000,
  COMMON_AREA_DESCRIPTION_MAX: 500,
} as const;

/**
 * Failure report nested event schema (same shape as notice event —
 * optional title/description that default to the report title).
 */
export const failureReportEventSchema = z.object({
  startDate: z.coerce.date().describe('Event start — accepts an ISO-8601 string or Date.'),
  endDate: z.coerce
    .date()
    .describe('Event end — accepts an ISO-8601 string or Date; must not precede `startDate`.'),
  title: z
    .string()
    .optional()
    .describe('Event title; defaults to the failure report title when omitted.'),
  description: z
    .string()
    .optional()
    .describe('Event description; defaults to the failure report description when omitted.'),
});

/**
 * Date-order-enforced variant used inside create/update arrays (refining the
 * base directly would break multipartArray element parsing — validate per
 * element).
 */
export const failureReportEventWithDateOrderSchema = failureReportEventSchema.refine(
  (event) => event.endDate >= event.startDate,
  { message: 'Event end must not precede its start', path: ['endDate'] },
);

/**
 * Cross-field rule used by both create and update schemas:
 * when locationType is common_area, commonAreaDescription is required;
 * when locationType is own_unit, unitType AND unitId are required.
 */
function refineLocation<T extends z.ZodTypeAny>(schema: T): T {
  return schema.superRefine((data: any, ctx) => {
    if (data.locationType === FailureLocationType.COMMON_AREA) {
      if (!data.commonAreaDescription || data.commonAreaDescription.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'commonAreaDescription is required when locationType is common_area',
          path: ['commonAreaDescription'],
        });
      }
    }
    if (data.locationType === FailureLocationType.OWN_UNIT) {
      if (!data.unitType) {
        ctx.addIssue({
          code: 'custom',
          message: 'unitType is required when locationType is own_unit',
          path: ['unitType'],
        });
      }
      if (!data.unitId) {
        ctx.addIssue({
          code: 'custom',
          message: 'unitId is required when locationType is own_unit',
          path: ['unitId'],
        });
      }
    }
  }) as unknown as T;
}

/**
 * Create failure report request schema — matches
 * `POST /buildings/:buildingId/failure-reports` multipart/form-data.
 * buildingId comes from the URL, not the body.
 */
export const createFailureReportSchema = refineLocation(
  z.object({
    title: z
      .string()
      .min(FAILURE_REPORT_LIMITS.TITLE_MIN, 'Title is required')
      .max(
        FAILURE_REPORT_LIMITS.TITLE_MAX,
        `Title must be at most ${FAILURE_REPORT_LIMITS.TITLE_MAX} characters`,
      )
      .describe('Short summary of the failure, 1–100 chars.'),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(
        FAILURE_REPORT_LIMITS.DESCRIPTION_MAX,
        `Description must be at most ${FAILURE_REPORT_LIMITS.DESCRIPTION_MAX} characters`,
      )
      .describe('Detailed description of the failure, up to 2000 chars.'),
    isAnonymous: multipartBoolean()
      .optional()
      .describe(
        'When true, hides the reporter’s identity from other residents. Defaults to false.',
      ),
    allowComments: multipartBoolean()
      .optional()
      .describe(
        'When false, disables the comment thread on this report. Defaults to true; also subject to the building-level comments setting.',
      ),
    priority: z
      .enum([Priority.NORMAL, Priority.URGENT])
      .optional()
      .describe('`normal` for standard reports, `urgent` to flag immediate attention.'),
    locationType: z
      .enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT])
      .optional()
      .describe(
        '`common_area` for shared spaces (hallway, roof, etc.) or `own_unit` for a specific apartment/garage/storage unit.',
      ),
    commonAreaDescription: z
      .string()
      .max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX)
      .optional()
      .describe('Free-text location description. Required when `locationType` is `common_area`.'),
    unitType: z
      .enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT])
      .optional()
      .describe('Kind of unit when `locationType` is `own_unit`. Required in that case.'),
    unitId: uuidSchema
      .optional()
      .describe('UUID of the specific unit. Required when `locationType` is `own_unit`.'),
    fileIds: multipartArray(uuidSchema)
      .optional()
      .describe('UUIDs of previously-uploaded files to attach to this report.'),
    maintenanceLogIds: multipartArray(uuidSchema)
      .optional()
      .describe(
        'UUIDs of maintenance logs to associate with this report (e.g. related past work).',
      ),
    events: multipartArray(failureReportEventWithDateOrderSchema)
      .optional()
      .describe('Calendar events to create alongside the report (inspections, scheduled fixes).'),
  }),
);

/**
 * Update failure report request schema — all fields optional, same
 * location conditional rule as create. Adds `status` and
 * `removeChildFileIds`.
 */
export const updateFailureReportSchema = refineLocation(
  z.object({
    title: z
      .string()
      .min(FAILURE_REPORT_LIMITS.TITLE_MIN)
      .max(FAILURE_REPORT_LIMITS.TITLE_MAX)
      .optional()
      .describe('Revised report title, 1–100 chars.'),
    description: z
      .string()
      .min(1)
      .max(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX)
      .optional()
      .describe('Revised description, up to 2000 chars.'),
    status: z
      .enum([FailureStatus.PENDING, FailureStatus.IN_PROGRESS, FailureStatus.RESOLVED])
      .optional()
      .describe(
        'Lifecycle status: `pending` (newly filed), `in_progress` (assigned work), `resolved` (closed out).',
      ),
    allowComments: multipartBoolean()
      .optional()
      .describe('Toggles the comment thread on this report.'),
    priority: z
      .enum([Priority.NORMAL, Priority.URGENT])
      .optional()
      .describe('Revised priority: `normal` or `urgent`.'),
    locationType: z
      .enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT])
      .optional()
      .describe('Revised location classification: `common_area` or `own_unit`.'),
    commonAreaDescription: z
      .string()
      .max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX)
      .optional()
      .describe('Revised common-area description. Required when `locationType` is `common_area`.'),
    unitType: z
      .enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT])
      .optional()
      .describe('Revised unit kind. Required when `locationType` is `own_unit`.'),
    unitId: uuidSchema
      .optional()
      .describe('Revised unit UUID. Required when `locationType` is `own_unit`.'),
    fileIds: multipartArray(uuidSchema)
      .optional()
      .describe('UUIDs of newly-uploaded files to add to the report.'),
    removeChildFileIds: multipartArray(uuidSchema)
      .optional()
      .describe('UUIDs of previously-attached files to detach from the report.'),
    maintenanceLogIds: multipartArray(uuidSchema)
      .optional()
      .describe(
        'Full list of maintenance-log UUIDs to associate with the report (replaces existing links).',
      ),
    events: multipartArray(failureReportEventWithDateOrderSchema)
      .optional()
      .describe('Full list of events for the report — replaces the existing event set.'),
  }),
);

/**
 * Approve failure report request schema
 */
export const approveFailureReportSchema = z.object({
  approved: z
    .boolean()
    .describe('True to approve the report for public visibility, false to reject.'),
});

// Inferred types
export type FailureReportEventSchema = z.infer<typeof failureReportEventSchema>;
export type CreateFailureReportSchema = z.infer<typeof createFailureReportSchema>;
export type UpdateFailureReportSchema = z.infer<typeof updateFailureReportSchema>;
export type ApproveFailureReportSchema = z.infer<typeof approveFailureReportSchema>;
