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
export const eventTypeSchema = z.enum(EVENT_TYPES);

/**
 * Event color schema
 */
export const eventColorSchema = z.enum(EVENT_COLORS);

/**
 * Time object schema (for form inputs)
 */
export const timeSchema = z.object({
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
});

/**
 * Create event request schema
 */
export const createEventSchema = z.object({
  buildingId: uuidSchema,
  type: eventTypeSchema,
  title: z.string().min(1, 'Title is required').max(100, 'Title must be at most 100 characters'),
  description: z.string().max(2000, 'Description must be at most 2000 characters').optional(),
  startDate: z.coerce.date({ required_error: 'Start date is required' }),
  endDate: z.coerce.date({ required_error: 'End date is required' }),
  color: eventColorSchema,
});

/**
 * Update event request schema
 */
export const updateEventSchema = z.object({
  type: eventTypeSchema.optional(),
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(2000).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  color: eventColorSchema.optional(),
});

// Inferred types
export type TimeSchema = z.infer<typeof timeSchema>;
export type CreateEventSchema = z.infer<typeof createEventSchema>;
export type UpdateEventSchema = z.infer<typeof updateEventSchema>;
