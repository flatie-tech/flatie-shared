import { z } from 'zod';
import { paginatedResponseSchema } from '../pagination.schema';
import { nestedEventSchema, nestedFileSchema } from './_nested';
import type { Strict } from './_strict';

export const noticeResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe('UUID of the building this notice was posted in.'),
  title: z.string().describe('Notice title shown in lists and the notice detail view.'),
  content: z.string().describe('Notice body text (rich-text / HTML allowed).'),
  files: z
    .array(nestedFileSchema)
    .default([])
    .describe('Attached documents or images; empty array when none are uploaded.'),
  createdBy: z
    .string()
    .uuid()
    .nullable()
    .describe('UUID of the notice author; null when the authoring user has been deleted.'),
  approved: z
    .boolean()
    .describe('True once a representative has approved the notice for public visibility.'),
  isAnonymous: z
    .boolean()
    .optional()
    .default(false)
    .describe('True when the author opted to hide their identity from other residents.'),
  pinned: z
    .boolean()
    .optional()
    .default(false)
    .describe('True when the notice is pinned to the top of the notice board.'),
  createdAt: z.string().describe('ISO-8601 timestamp when the notice was created.'),
  updatedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
  createdByName: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Author display name. Null when `isAnonymous` is true or the author has been deleted.',
    ),
  allowComments: z
    .boolean()
    .optional()
    .default(true)
    .describe('True when comments are enabled on this notice.'),
  commentsCount: z
    .number()
    .int()
    .default(0)
    .describe('Number of non-archived comments on this notice.'),
  canApprove: z.boolean().describe('True when the calling user may approve or reject the notice.'),
  canEdit: z.boolean().describe('True when the calling user may edit the notice.'),
  canDelete: z.boolean().describe('True when the calling user may delete the notice.'),
  isOwner: z.boolean().describe('True when the calling user is the creator of this notice.'),
  events: z
    .array(nestedEventSchema)
    .default([])
    .describe('Calendar events linked to the notice (e.g. planned works window); empty when none.'),
});

export const paginatedNoticesResponseSchema = paginatedResponseSchema(noticeResponseSchema);

export type NoticeResponse = Strict<z.infer<typeof noticeResponseSchema>>;
export type PaginatedNoticesResponse = Strict<z.infer<typeof paginatedNoticesResponseSchema>>;
