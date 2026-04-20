import { z } from 'zod';
import { paginatedResponseSchema } from '../pagination.schema';

const nestedFileSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  documentUrl: z.string().optional().nullable(),
});

const nestedEventSchema = z.looseObject({
  id: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const noticeResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  files: z.array(nestedFileSchema).default([]),
  createdBy: z.string().uuid().nullable(),
  approved: z.boolean(),
  isAnonymous: z.boolean().optional().default(false),
  pinned: z.boolean().optional().default(false),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  createdByName: z.string().nullable().optional(),
  canApprove: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  events: z.array(nestedEventSchema).default([]),
});

export const paginatedNoticesResponseSchema = paginatedResponseSchema(noticeResponseSchema);

export type NoticeResponse = z.infer<typeof noticeResponseSchema>;
export type PaginatedNoticesResponse = z.infer<typeof paginatedNoticesResponseSchema>;
