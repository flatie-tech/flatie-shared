import { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { multipartArray, multipartBoolean } from '../multipart.schema';

/**
 * Maintenance financed by options
 */
export const MAINTENANCE_FINANCED_BY = ['building_funds', 'insurance', 'co_owner'] as const;
export type MaintenanceFinancedByOption = (typeof MAINTENANCE_FINANCED_BY)[number];

/**
 * Maintenance financed by schema
 */
export const maintenanceFinancedBySchema = z.enum(MAINTENANCE_FINANCED_BY);

/**
 * Validation constants for maintenance logs
 */
export const MAINTENANCE_LOG_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2000,
  CONTRACTOR_MIN: 1,
  EVENTS_MIN: 1,
} as const;

/**
 * Decimal-string validator — backend stores cost as a numeric(10,2)
 * column and accepts either a string like "250.50" (from multipart)
 * or a number. This accepts both and ensures the resulting value
 * has 0-2 decimal places.
 */
const costSchema = z.preprocess(
  (value) => {
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string') return value.trim();
    return value;
  },
  z.string().regex(/^-?\d+(\.\d{1,2})?$/, 'Cost must be a decimal with at most 2 decimal places'),
);

/**
 * Nested event schema for maintenance logs. Events are required on
 * create (min 1), optional on update.
 */
export const maintenanceLogEventSchema = z.object({
  id: uuidSchema.optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z.string().optional(),
  description: z.string().optional(),
});

/**
 * Create maintenance log request schema — matches
 * `POST /buildings/:buildingId/maintenance-logs` multipart/form-data.
 * buildingId comes from the URL, not the body.
 */
export const createMaintenanceLogSchema = z.object({
  title: z
    .string()
    .min(MAINTENANCE_LOG_LIMITS.TITLE_MIN, 'Title is required')
    .max(
      MAINTENANCE_LOG_LIMITS.TITLE_MAX,
      `Title must be at most ${MAINTENANCE_LOG_LIMITS.TITLE_MAX} characters`,
    ),
  description: z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional(),
  categoryId: uuidSchema.optional(),
  contractor: z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN, 'Contractor is required'),
  cost: costSchema,
  financedBy: maintenanceFinancedBySchema.optional(),
  warranty: multipartBoolean().optional(),
  events: multipartArray(maintenanceLogEventSchema).refine(
    (events) => events.length >= MAINTENANCE_LOG_LIMITS.EVENTS_MIN,
    { message: 'At least one event is required' },
  ),
  fileIds: multipartArray(uuidSchema).optional(),
  pollId: uuidSchema.optional(),
  pollIds: multipartArray(uuidSchema).optional(),
});

/**
 * Update maintenance log request schema — all fields optional.
 * Events passed as an array replace the full event set (events
 * omitted are deleted; events with an `id` are updated in place).
 * Adds `removeChildFileIds` for granular file removal.
 */
export const updateMaintenanceLogSchema = z.object({
  title: z
    .string()
    .min(MAINTENANCE_LOG_LIMITS.TITLE_MIN)
    .max(MAINTENANCE_LOG_LIMITS.TITLE_MAX)
    .optional(),
  description: z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional(),
  categoryId: uuidSchema.optional(),
  contractor: z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN).optional(),
  cost: costSchema.optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  warranty: multipartBoolean().optional(),
  events: multipartArray(maintenanceLogEventSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional(),
  pollId: uuidSchema.optional(),
  pollIds: multipartArray(uuidSchema).optional(),
});

// Inferred types
export type MaintenanceLogEventSchema = z.infer<typeof maintenanceLogEventSchema>;
export type CreateMaintenanceLogSchema = z.infer<typeof createMaintenanceLogSchema>;
export type UpdateMaintenanceLogSchema = z.infer<typeof updateMaintenanceLogSchema>;
