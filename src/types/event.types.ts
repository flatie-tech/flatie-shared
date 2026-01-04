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
  | 'other';

/**
 * Event color
 */
export type EventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray';

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
}

/**
 * Update event request
 */
export interface UpdateEventRequest {
  title?: string;
  type?: EventType;
  description?: string;
  startDate?: string;
  endDate?: string;
  color?: EventColor;
}
