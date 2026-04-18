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
  id: uuidSchema.optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z
    .string()
    .max(NOTICE_LIMITS.EVENT_TITLE_MAX, 'Event title must be at most 100 characters')
    .optional(),
  description: z.string().optional(),
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
      .max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`),
    content: z
      .string()
      .min(NOTICE_LIMITS.CONTENT_MIN, 'Content is required')
      .max(
        NOTICE_LIMITS.CONTENT_MAX,
        `Content must be at most ${NOTICE_LIMITS.CONTENT_MAX} characters`,
      ),
    isAnonymous: multipartBoolean().optional(),
    pinned: multipartBoolean().optional(),
    events: multipartArray(noticeEventSchema).optional().default([]),
    fileIds: multipartArray(uuidSchema).optional().default([]),
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
  title: z.string().min(NOTICE_LIMITS.TITLE_MIN).max(NOTICE_LIMITS.TITLE_MAX).optional(),
  content: z.string().min(NOTICE_LIMITS.CONTENT_MIN).max(NOTICE_LIMITS.CONTENT_MAX).optional(),
  pinned: multipartBoolean().optional(),
  events: multipartArray(noticeEventSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional(),
});

/**
 * Approve notice request schema
 */
export const approveNoticeSchema = z.object({
  approved: z.boolean(),
});

// Inferred types
export type NoticeEventSchema = z.infer<typeof noticeEventSchema>;
export type CreateNoticeSchema = z.infer<typeof createNoticeSchema>;
export type UpdateNoticeSchema = z.infer<typeof updateNoticeSchema>;
export type ApproveNoticeSchema = z.infer<typeof approveNoticeSchema>;
