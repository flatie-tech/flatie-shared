import { z } from 'zod';
import { paginatedResponseSchema } from '../pagination.schema';
import type { Strict } from './_strict';

const eventUserSchema = z
  .looseObject({
    id: z.string().describe('UUID of the user.'),
    name: z.string().describe('User display name.'),
  })
  .describe('Minimal user reference embedded in event responses.');

const entityScheduleReferenceSchema = z
  .looseObject({
    id: z.string().describe('UUID of the parent entity (failure report, maintenance log, notice).'),
    // One of 'failure_report' | 'maintenance_log' | 'notice' — left as
    // a free string to tolerate new entity types added backend-side.
    type: z
      .string()
      .describe(
        'Kind of entity using this event as its schedule. One of `failure_report`, `maintenance_log`, `notice`.',
      ),
    title: z.string().describe('Title of the parent entity for quick reference in the calendar.'),
  })
  .describe('Parent entity that attaches this event as its scheduled work window.');

/**
 * Event response — shape returned from event list / detail endpoints.
 * Dates are serialised as ISO-8601 strings on the wire (the backend
 * response DTO uses `string` for both startDate and endDate).
 */
export const eventResponseSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe('Event title displayed in the calendar.'),
  type: z
    .string()
    .describe(
      'Event type (`service`, `inspection`, `maintenance`, `meeting`, `discussion`, `planned_works`, `waste_collection`, `other`).',
    ),
  description: z
    .string()
    .optional()
    .nullable()
    .describe('Free-form event description; null or absent when not provided.'),
  startDate: z.string().describe('ISO-8601 timestamp when the event starts.'),
  endDate: z.string().describe('ISO-8601 timestamp when the event ends.'),
  color: z
    .string()
    .describe(
      'Display color — one of `blue`, `green`, `red`, `yellow`, `purple`, `orange`, `gray`.',
    ),
  buildingId: z.string().uuid().describe('UUID of the building this event is scheduled in.'),
  recurrenceType: z
    .string()
    .describe('Recurrence cadence (`none`, `weekly`, `biweekly`, `monthly`, `yearly`).'),
  subtype: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Free-form subtype qualifier (used for waste-collection subtypes like `mixed`, `bio`, `paper_cardboard`).',
    ),
  recurrenceEndDate: z
    .string()
    .nullable()
    .optional()
    .describe(
      'ISO-8601 date after which the recurrence stops. Null for open-ended recurring events.',
    ),
  isRecurrenceInstance: z
    .boolean()
    .optional()
    .describe(
      'True when this payload represents an expanded instance of a recurring parent (rather than the parent itself).',
    ),
  originalEventId: z
    .string()
    .optional()
    .describe(
      'For recurrence instances, the UUID of the recurring parent event; absent on standalone events.',
    ),
  user: eventUserSchema
    .optional()
    .describe('Creator of the event; omitted when the event is anonymous or seeded by the system.'),
  isAnonymous: z
    .boolean()
    .describe('True when the creator chose to hide their identity from other residents.'),
  approved: z
    .boolean()
    .describe('True when the event has been approved by a representative and is publicly visible.'),
  allowComments: z
    .boolean()
    .optional()
    .default(true)
    .describe('True when comments are enabled on this event.'),
  canEdit: z.boolean().describe('True when the calling user is allowed to edit this event.'),
  canDelete: z.boolean().describe('True when the calling user is allowed to delete this event.'),
  canApprove: z
    .boolean()
    .describe('True when the calling user is allowed to approve or reject this event.'),
  onlineMeetingUrl: z
    .string()
    .nullable()
    .optional()
    .describe('Optional join URL for online meetings; null for in-person events.'),
  meetingMinutes: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Rich-text minutes captured during the meeting; null until the minute-taker submits them.',
    ),
  minuteTakerId: z
    .string()
    .nullable()
    .optional()
    .describe(
      'UUID of the user assigned to record minutes; null for events that do not require one.',
    ),
  usedAsScheduleBy: z
    .array(entityScheduleReferenceSchema)
    .optional()
    .describe(
      'Entities (failure reports, maintenance logs, notices) that reference this event as their schedule; empty when none do.',
    ),
});

export const paginatedEventsResponseSchema = paginatedResponseSchema(eventResponseSchema);

export type EventResponse = Strict<z.infer<typeof eventResponseSchema>>;
export type PaginatedEventsResponse = Strict<z.infer<typeof paginatedEventsResponseSchema>>;
