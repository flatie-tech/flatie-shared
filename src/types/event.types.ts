import type { z } from 'zod';
import type {
  eventColorSchema,
  eventTypeSchema,
  recurrenceTypeSchema,
} from '../schemas/entities/event.schema';
import type { BaseEntity, PermissionFields } from './base-entity.types';

/**
 * Event type — derived from `eventTypeSchema` so the type union and the Zod
 * validator can never drift apart. Same exported name and shape as the
 * previously hand-written union.
 */
export type EventType = z.infer<typeof eventTypeSchema>;

/**
 * Event color — derived from `eventColorSchema`.
 */
export type EventColor = z.infer<typeof eventColorSchema>;

/**
 * Recurrence cadence — derived from `recurrenceTypeSchema`.
 */
export type RecurrenceType = z.infer<typeof recurrenceTypeSchema>;

/**
 * Event entity.
 *
 * Kept hand-written: this is the persisted-entity shape (`userId`,
 * `Date | string` timestamps), which deliberately diverges from
 * `eventResponseSchema` (wire shape — ISO strings, nested `user` reference,
 * permission flags) and from `createEventSchema` (request shape — coerced
 * `Date` outputs).
 */
export interface Event extends BaseEntity {
  buildingId: string;
  userId: string;
  title: string;
  type: EventType;
  description?: string | null;
  startDate: Date | string;
  endDate: Date | string;
  color: EventColor;
  approved: boolean;
  isAnonymous: boolean;
  allowComments: boolean;
  recurrenceType: RecurrenceType;
  recurrenceEndDate?: Date | string | null;
  subtype?: string | null;
  onlineMeetingUrl?: string | null;
  meetingMinutes?: string | null;
  minuteTakerId?: string | null;
}

/**
 * Event with creator info for API responses.
 *
 * @deprecated Zero consumers — clients parse event responses via
 * `eventResponseSchema` / `EventResponse` instead. Will be removed in v0.60.0.
 */
export interface EventWithCreator extends Event, PermissionFields {
  creator?: {
    id: string;
    name: string;
    image?: string | null;
  };
}

/**
 * Create event request.
 *
 * Kept hand-written: represents the JSON payload a client sends (dates as
 * ISO strings), whereas `z.infer<typeof createEventSchema>` is the *parsed*
 * shape (`z.coerce.date()` outputs `Date`), so the two genuinely differ.
 */
export interface CreateEventRequest {
  title: string;
  type: EventType;
  description?: string;
  startDate: string;
  endDate: string;
  color: EventColor;
  isAnonymous?: boolean;
  allowComments?: boolean;
  recurrenceType?: RecurrenceType;
  recurrenceEndDate?: string;
  subtype?: string;
  onlineMeetingUrl?: string;
  meetingMinutes?: string;
  minuteTakerId?: string;
  fileIds?: string[];
}
