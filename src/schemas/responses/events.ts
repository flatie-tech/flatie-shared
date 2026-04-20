import { z } from 'zod';
import { paginatedResponseSchema } from '../pagination.schema';

const eventUserSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
});

const entityScheduleReferenceSchema = z.looseObject({
  id: z.string(),
  // One of 'failure_report' | 'maintenance_log' | 'notice' — left as
  // a free string to tolerate new entity types added backend-side.
  type: z.string(),
  title: z.string(),
});

/**
 * Event response — shape returned from event list / detail endpoints.
 * Dates are serialised as ISO-8601 strings on the wire (the backend
 * response DTO uses `string` for both startDate and endDate).
 */
export const eventResponseSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  type: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.string(),
  endDate: z.string(),
  color: z.string(),
  buildingId: z.string().uuid(),
  recurrenceType: z.string(),
  subtype: z.string().nullable().optional(),
  recurrenceEndDate: z.string().nullable().optional(),
  isRecurrenceInstance: z.boolean().optional(),
  originalEventId: z.string().optional(),
  user: eventUserSchema.optional(),
  isAnonymous: z.boolean(),
  approved: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canApprove: z.boolean(),
  onlineMeetingUrl: z.string().nullable().optional(),
  meetingMinutes: z.string().nullable().optional(),
  minuteTakerId: z.string().nullable().optional(),
  usedAsScheduleBy: z.array(entityScheduleReferenceSchema).optional(),
});

export const paginatedEventsResponseSchema = paginatedResponseSchema(eventResponseSchema);

export type EventResponse = z.infer<typeof eventResponseSchema>;
export type PaginatedEventsResponse = z.infer<typeof paginatedEventsResponseSchema>;
