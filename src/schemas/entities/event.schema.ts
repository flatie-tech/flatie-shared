import { z } from 'zod';
import { uuidSchema } from '../base.schema';

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
  'other',
] as const;
export type EventTypeOption = (typeof EVENT_TYPES)[number];

/**
 * Event color options
 */
export const EVENT_COLORS = ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'gray'] as const;
export type EventColorOption = (typeof EVENT_COLORS)[number];

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
  other: 'gray',
} as const;

/**
 * Event type schema
 */
export const eventTypeSchema = z
  .enum(EVENT_TYPES)
  .describe(
    'Kind of calendar event: `service` (routine service call), `inspection` (regulatory/safety check), `maintenance` (contractor work), `meeting` (residents gathering), `discussion` (informal), `planned_works` (scheduled project), `other` (miscellaneous).',
  );

/**
 * Event color schema
 */
export const eventColorSchema = z
  .enum(EVENT_COLORS)
  .describe('Display colour used when rendering the event on the calendar.');

/**
 * Time object schema (for form inputs)
 */
export const timeSchema = z.object({
  hour: z.number().min(0).max(23).describe('Hour component in 24-hour format, 0–23.'),
  minute: z.number().min(0).max(59).describe('Minute component, 0–59.'),
});

/**
 * Create event request schema
 */
export const createEventSchema = z.object({
  buildingId: uuidSchema.describe('UUID of the building the event belongs to.'),
  type: eventTypeSchema,
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be at most 100 characters')
    .describe('Short event title shown on the calendar, 1–100 chars.'),
  description: z
    .string()
    .max(2000, 'Description must be at most 2000 characters')
    .optional()
    .describe('Free-text details about the event; omitted when the event is self-explanatory.'),
  startDate: z.coerce
    .date({ error: 'Start date is required' })
    .describe('Event start — accepts an ISO-8601 string or Date, stored as a timestamp.'),
  endDate: z.coerce
    .date({ error: 'End date is required' })
    .describe('Event end — accepts an ISO-8601 string or Date; must not precede `startDate`.'),
  color: eventColorSchema,
  allowComments: z.boolean().optional(),
});

/**
 * Update event request schema
 */
export const updateEventSchema = z.object({
  type: eventTypeSchema.optional(),
  title: z.string().min(1).max(100).optional().describe('Revised title, 1–100 chars.'),
  description: z.string().max(2000).optional().describe('Revised description, max 2000 chars.'),
  startDate: z.coerce
    .date()
    .optional()
    .describe('Revised start — accepts an ISO-8601 string or Date.'),
  endDate: z.coerce.date().optional().describe('Revised end — accepts an ISO-8601 string or Date.'),
  color: eventColorSchema.optional(),
  allowComments: z.boolean().optional(),
});

// Inferred types
export type TimeSchema = z.infer<typeof timeSchema>;
export type CreateEventSchema = z.infer<typeof createEventSchema>;
export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
