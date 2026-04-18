import { z } from 'zod';
import { FailureLocationType, FailureUnitType } from '../../enums/failure-location.enum';
import { Priority } from '../../enums/status.enum';
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
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z.string().optional(),
  description: z.string().optional(),
});

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
      ),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(
        FAILURE_REPORT_LIMITS.DESCRIPTION_MAX,
        `Description must be at most ${FAILURE_REPORT_LIMITS.DESCRIPTION_MAX} characters`,
      ),
    isAnonymous: multipartBoolean().optional(),
    priority: z.enum([Priority.NORMAL, Priority.URGENT]).optional(),
    locationType: z
      .enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT])
      .optional(),
    commonAreaDescription: z
      .string()
      .max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX)
      .optional(),
    unitType: z
      .enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT])
      .optional(),
    unitId: uuidSchema.optional(),
    fileIds: multipartArray(uuidSchema).optional(),
    maintenanceLogIds: multipartArray(uuidSchema).optional(),
    events: multipartArray(failureReportEventSchema).optional(),
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
      .optional(),
    description: z.string().min(1).max(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX).optional(),
    status: z.enum(['pending', 'inProgress', 'resolved']).optional(),
    priority: z.enum([Priority.NORMAL, Priority.URGENT]).optional(),
    locationType: z
      .enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT])
      .optional(),
    commonAreaDescription: z
      .string()
      .max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX)
      .optional(),
    unitType: z
      .enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT])
      .optional(),
    unitId: uuidSchema.optional(),
    fileIds: multipartArray(uuidSchema).optional(),
    removeChildFileIds: multipartArray(uuidSchema).optional(),
    maintenanceLogIds: multipartArray(uuidSchema).optional(),
    events: multipartArray(failureReportEventSchema).optional(),
  }),
);

/**
 * Approve failure report request schema
 */
export const approveFailureReportSchema = z.object({
  approved: z.boolean(),
});

// Inferred types
export type FailureReportEventSchema = z.infer<typeof failureReportEventSchema>;
export type CreateFailureReportSchema = z.infer<typeof createFailureReportSchema>;
export type UpdateFailureReportSchema = z.infer<typeof updateFailureReportSchema>;
export type ApproveFailureReportSchema = z.infer<typeof approveFailureReportSchema>;
