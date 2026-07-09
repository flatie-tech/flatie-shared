import { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { multipartBoolean } from '../multipart.schema';

/**
 * Event type options
 */
export const EVENT_TYPES = [
  'service',
  'inspection',
  'maintenance',
  'meeting',
  'discussion',
  'planned_works',
  'waste_collection',
  'other',
] as const;
export type EventTypeOption = (typeof EVENT_TYPES)[number];

/**
 * Event color options
 */
export const EVENT_COLORS = ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'gray'] as const;
export type EventColorOption = (typeof EVENT_COLORS)[number];

/**
 * Recurrence cadence options
 */
export const RECURRENCE_TYPES = ['none', 'weekly', 'biweekly', 'monthly', 'yearly'] as const;
export type RecurrenceTypeOption = (typeof RECURRENCE_TYPES)[number];

/**
 * Mapping of event types to default colors
 */
export const EVENT_TYPE_COLOR_MAP: Record<EventTypeOption, EventColorOption> = {
  service: 'blue',
  inspection: 'purple',
  maintenance: 'orange',
  meeting: 'green',
  discussion: 'yellow',
  planned_works: 'red',
  waste_collection: 'green',
  other: 'gray',
} as const;

/**
 * Event type schema
 */
export const eventTypeSchema = z
  .enum(EVENT_TYPES)
  .describe(
    'Kind of calendar event: `service` (routine service call), `inspection` (regulatory/safety check), `maintenance` (contractor work), `meeting` (residents gathering), `discussion` (informal), `planned_works` (scheduled project), `waste_collection` (waste pickup, uses `subtype`), `other` (miscellaneous).',
  );

/**
 * Event color schema
 */
export const eventColorSchema = z
  .enum(EVENT_COLORS)
  .describe('Display colour used when rendering the event on the calendar.');

/**
 * Recurrence type schema
 */
export const recurrenceTypeSchema = z
  .enum(RECURRENCE_TYPES)
  .describe('Recurrence cadence; `none` for one-off events.');

/**
 * Time object schema (for form inputs)
 */
export const timeSchema = z.object({
  hour: z.number().min(0).max(23).describe('Hour component in 24-hour format, 0–23.'),
  minute: z.number().min(0).max(59).describe('Minute component, 0–59.'),
});

/**
 * Create event request schema — mirrors the backend `CreateEventDto`
 * (flatie-backend `src/modules/events/dto/create-event.dto.ts`).
 */
export const createEventSchema = z
  .object({
    buildingId: uuidSchema.describe('UUID of the building the event belongs to.'),
    type: eventTypeSchema,
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title must be at most 100 characters')
      .describe('Short event title shown on the calendar, 1–100 chars.'),
    description: z
      .string()
      .max(500, 'Description must be at most 500 characters')
      .optional()
      .describe('Free-text details about the event; omitted when the event is self-explanatory.'),
    startDate: z.coerce
      .date({ error: 'Start date is required' })
      .describe('Event start — accepts an ISO-8601 string or Date, stored as a timestamp.'),
    endDate: z.coerce
      .date({ error: 'End date is required' })
      .describe('Event end — accepts an ISO-8601 string or Date; must not precede `startDate`.'),
    color: eventColorSchema,
    isAnonymous: multipartBoolean()
      .optional()
      .describe("True hides the creator's identity from other residents."),
    allowComments: multipartBoolean()
      .optional()
      .describe('False disables the comment thread on this event.'),
    recurrenceType: recurrenceTypeSchema.optional(),
    recurrenceEndDate: z.coerce
      .date()
      .optional()
      .describe('Date after which the recurrence stops; omitted for open-ended recurrence.'),
    subtype: z
      .string()
      .optional()
      .describe('Free-form subtype qualifier (waste-collection types like `mixed`, `bio`).'),
    onlineMeetingUrl: z
      .string()
      .url()
      .max(500)
      .optional()
      .or(z.literal(''))
      .describe('Join URL for online meetings; empty or omitted for in-person events.'),
    meetingMinutes: z
      .string()
      .max(10000)
      .optional()
      .describe('Rich-text minutes captured during the meeting.'),
    minuteTakerId: uuidSchema
      .optional()
      .describe('UUID of the user assigned to record meeting minutes.'),
    fileIds: z
      .array(uuidSchema)
      .optional()
      .describe('UUIDs of previously uploaded files to attach to the event.'),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'endDate must not precede startDate',
    path: ['endDate'],
  });

/**
 * Update event request schema — partial variant of the create schema
 * (no cross-field date refinement; the backend validates the merged result).
 */
export const updateEventSchema = z.object({
  type: eventTypeSchema.optional(),
  title: z.string().min(1).max(100).optional().describe('Revised title, 1–100 chars.'),
  description: z.string().max(500).optional().describe('Revised description, max 500 chars.'),
  startDate: z.coerce
    .date()
    .optional()
    .describe('Revised start — accepts an ISO-8601 string or Date.'),
  endDate: z.coerce.date().optional().describe('Revised end — accepts an ISO-8601 string or Date.'),
  color: eventColorSchema.optional(),
  isAnonymous: multipartBoolean().optional(),
  allowComments: multipartBoolean().optional(),
  recurrenceType: recurrenceTypeSchema.optional(),
  recurrenceEndDate: z.coerce.date().optional(),
  subtype: z.string().optional(),
  onlineMeetingUrl: z.string().url().max(500).optional().or(z.literal('')),
  meetingMinutes: z.string().max(10000).optional(),
  minuteTakerId: uuidSchema.optional(),
  fileIds: z.array(uuidSchema).optional(),
});

// Inferred types
export type TimeSchema = z.infer<typeof timeSchema>;
export type CreateEventSchema = z.infer<typeof createEventSchema>;
export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
