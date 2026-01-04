import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Validation constants for notices
 */
export const NOTICE_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  CONTENT_MIN: 1,
  CONTENT_MAX: 2000,
} as const;

/**
 * Notice event schema (for calendar integration)
 */
export const noticeEventSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z.string().max(100, 'Event title must be at most 100 characters').optional(),
});

/**
 * Create notice request schema
 */
export const createNoticeSchema = z
  .object({
    buildingId: uuidSchema,
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
    events: z.array(noticeEventSchema).optional().default([]),
    fileIds: z.array(uuidSchema).optional().default([]),
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
 * Update notice request schema
 */
export const updateNoticeSchema = z.object({
  title: z.string().min(NOTICE_LIMITS.TITLE_MIN).max(NOTICE_LIMITS.TITLE_MAX).optional(),
  content: z.string().min(NOTICE_LIMITS.CONTENT_MIN).max(NOTICE_LIMITS.CONTENT_MAX).optional(),
  events: z.array(noticeEventSchema).optional(),
  fileIds: z.array(uuidSchema).optional(),
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
