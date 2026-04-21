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
export const maintenanceFinancedBySchema = z
  .enum(MAINTENANCE_FINANCED_BY)
  .describe(
    'Funding source of the work: `building_funds` (paid from the common fund), `insurance` (covered by an insurance claim), or `co_owner` (paid directly by an individual co-owner).',
  );

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
  id: uuidSchema
    .optional()
    .describe(
      'UUID of an existing event to update in place. Omit to create a new event. Events absent from the update request are deleted.',
    ),
  startDate: z.coerce.date().describe('Event start — accepts an ISO-8601 string or Date.'),
  endDate: z.coerce
    .date()
    .describe('Event end — accepts an ISO-8601 string or Date; must not precede `startDate`.'),
  title: z
    .string()
    .optional()
    .describe('Event title; defaults to the maintenance-log title when omitted.'),
  description: z
    .string()
    .optional()
    .describe('Event description; defaults to the maintenance-log description when omitted.'),
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
    )
    .describe('Short title of the maintenance work, 1–100 chars.'),
  description: z
    .string()
    .max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX)
    .optional()
    .describe('Detailed description of the work performed, up to 2000 chars.'),
  categoryId: uuidSchema
    .optional()
    .describe('UUID of the expense category the cost should be booked under.'),
  contractor: z
    .string()
    .min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN, 'Contractor is required')
    .describe('Name of the contractor or vendor who performed the work.'),
  cost: costSchema.describe(
    'Total cost as a decimal string with up to two decimal places (e.g. "250.50"). Numeric input is coerced to a string.',
  ),
  financedBy: maintenanceFinancedBySchema
    .optional()
    .describe('Funding source; omit when unknown at the time of logging.'),
  warranty: multipartBoolean()
    .optional()
    .describe('True when the work is covered by an active warranty.'),
  events: multipartArray(maintenanceLogEventSchema)
    .refine((events) => events.length >= MAINTENANCE_LOG_LIMITS.EVENTS_MIN, {
      message: 'At least one event is required',
    })
    .describe('Calendar events associated with the work; at least one is required on create.'),
  fileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of previously-uploaded files (invoices, photos) to attach.'),
  pollId: uuidSchema
    .optional()
    .describe('UUID of a single poll to associate with this log. Legacy field — prefer `pollIds`.'),
  pollIds: multipartArray(uuidSchema)
    .optional()
    .describe(
      'UUIDs of polls to associate with this log (e.g. the vote that authorised the work).',
    ),
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
    .optional()
    .describe('Revised title, 1–100 chars.'),
  description: z
    .string()
    .max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX)
    .optional()
    .describe('Revised description, up to 2000 chars.'),
  categoryId: uuidSchema.optional().describe('Revised expense-category UUID.'),
  contractor: z
    .string()
    .min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN)
    .optional()
    .describe('Revised contractor or vendor name.'),
  cost: costSchema
    .optional()
    .describe(
      'Revised total cost as a decimal string with up to two decimal places (e.g. "250.50").',
    ),
  financedBy: maintenanceFinancedBySchema.optional().describe('Revised funding source.'),
  warranty: multipartBoolean().optional().describe('Toggles whether the work is under warranty.'),
  events: multipartArray(maintenanceLogEventSchema)
    .optional()
    .describe(
      'Replacement event set: events with an `id` are updated, new events are inserted, and existing events omitted from the list are deleted.',
    ),
  fileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of newly-uploaded files to attach.'),
  removeChildFileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of previously-attached files to detach from the log.'),
  pollId: uuidSchema
    .optional()
    .describe('Single poll UUID to associate. Legacy field — prefer `pollIds`.'),
  pollIds: multipartArray(uuidSchema)
    .optional()
    .describe('Full list of poll UUIDs to associate with this log (replaces existing links).'),
});

// Inferred types
export type MaintenanceLogEventSchema = z.infer<typeof maintenanceLogEventSchema>;
export type CreateMaintenanceLogSchema = z.infer<typeof createMaintenanceLogSchema>;
export type UpdateMaintenanceLogSchema = z.infer<typeof updateMaintenanceLogSchema>;
