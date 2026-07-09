import type { BaseEntity, PermissionFields } from './base-entity.types';

/**
 * Event type
 */
export type EventType =
  | 'service'
  | 'inspection'
  | 'maintenance'
  | 'meeting'
  | 'discussion'
  | 'planned_works'
  | 'waste_collection'
  | 'other';

/**
 * Event color
 */
export type EventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray';

/**
 * Recurrence cadence
 */
export type RecurrenceType = 'none' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';

/**
 * Event entity
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
 * Event with creator info for API responses
 */
export interface EventWithCreator extends Event, PermissionFields {
  creator?: {
    id: string;
    name: string;
    image?: string | null;
  };
}

/**
 * Create event request
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
