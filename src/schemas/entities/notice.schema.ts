import { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { multipartArray, multipartBoolean } from '../multipart.schema';

/**
 * Validation constants for notices
 */
export const NOTICE_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  CONTENT_MIN: 1,
  CONTENT_MAX: 2000,
  EVENT_TITLE_MAX: 100,
} as const;

/**
 * Notice event schema (nested inside create/update notice).
 *
 * `id` is optional — when present on update, the backend updates an
 * existing event; when absent it creates a new one, and events
 * omitted from the array are deleted.
 */
export const noticeEventSchema = z.object({
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
    .max(NOTICE_LIMITS.EVENT_TITLE_MAX, 'Event title must be at most 100 characters')
    .optional()
    .describe('Event title, max 100 chars; defaults to the notice title when omitted.'),
  description: z
    .string()
    .optional()
    .describe('Event description; defaults to the notice content when omitted.'),
});

/**
 * Create notice request schema — matches flatie-backend's
 * `POST /buildings/:buildingId/notices` multipart/form-data payload.
 * buildingId comes from the URL, not the body.
 */
export const createNoticeSchema = z
  .object({
    title: z
      .string()
      .min(NOTICE_LIMITS.TITLE_MIN, 'Title is required')
      .max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`)
      .describe('Notice headline shown in listings, 1–100 chars.'),
    content: z
      .string()
      .min(NOTICE_LIMITS.CONTENT_MIN, 'Content is required')
      .max(
        NOTICE_LIMITS.CONTENT_MAX,
        `Content must be at most ${NOTICE_LIMITS.CONTENT_MAX} characters`,
      )
      .describe('Rich-text or plain-text body of the notice, up to 2000 chars.'),
    isAnonymous: multipartBoolean()
      .optional()
      .describe('When true, hides the author’s identity from other residents. Defaults to false.'),
    pinned: multipartBoolean()
      .optional()
      .describe('When true, pins the notice to the top of the building feed.'),
    events: multipartArray(noticeEventSchema)
      .optional()
      .default([])
      .describe('Calendar events to create alongside the notice (e.g. meeting on a given date).'),
    fileIds: multipartArray(uuidSchema)
      .optional()
      .default([])
      .describe('UUIDs of previously-uploaded files to attach to the notice.'),
  })
  .refine(
    (data) => {
      if (data.events && data.events.length > 0) {
        return data.events.every((event) => event.startDate && event.endDate);
      }
      return true;
    },
    {
      message: 'Each event must have both start and end dates',
      path: ['events'],
    },
  );

/**
 * Update notice request schema — all top-level fields optional.
 * Events passed as an array replace the full event set (events not
 * in the array are deleted; events with an `id` are updated in place;
 * events without an `id` are created).
 */
export const updateNoticeSchema = z.object({
  title: z
    .string()
    .min(NOTICE_LIMITS.TITLE_MIN)
    .max(NOTICE_LIMITS.TITLE_MAX)
    .optional()
    .describe('Revised notice headline, 1–100 chars.'),
  content: z
    .string()
    .min(NOTICE_LIMITS.CONTENT_MIN)
    .max(NOTICE_LIMITS.CONTENT_MAX)
    .optional()
    .describe('Revised notice body, up to 2000 chars.'),
  pinned: multipartBoolean()
    .optional()
    .describe('Toggles whether the notice is pinned to the top of the feed.'),
  events: multipartArray(noticeEventSchema)
    .optional()
    .describe(
      'Replacement event set: events with an `id` are updated, new events are inserted, and existing events omitted from the list are deleted.',
    ),
  fileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of newly-uploaded files to attach.'),
  removeChildFileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of previously-attached files to detach from the notice.'),
});

/**
 * Approve notice request schema
 */
export const approveNoticeSchema = z.object({
  approved: z
    .boolean()
    .describe('True to approve the notice for public visibility, false to reject.'),
});

// Inferred types
export type NoticeEventSchema = z.infer<typeof noticeEventSchema>;
export type CreateNoticeSchema = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeSchema = z.infer<typeof updateNoticeSchema>;
export type ApproveNoticeSchema = z.infer<typeof approveNoticeSchema>;
