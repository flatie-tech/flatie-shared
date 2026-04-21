import { z } from 'zod';

export const commentResponseSchema = z.looseObject({
  id: z.string().uuid(),
  entityType: z
    .string()
    .describe(
      'Type of entity this comment is attached to. One of `notice`, `failure_report`, `event`.',
    ),
  entityId: z
    .string()
    .describe('UUID of the entity (notice, failure report, or event) this comment belongs to.'),
  userId: z.string().describe('UUID of the user who authored the comment.'),
  userName: z
    .string()
    .nullable()
    .describe('Author display name. Null when the authoring user was deleted.'),
  userImage: z
    .string()
    .nullable()
    .describe('Absolute URL of the author avatar, or null if the user has no profile image.'),
  content: z.string().describe('Comment body text as entered by the user.'),
  createdAt: z.string().describe('ISO-8601 timestamp when the comment was created.'),
  updatedAt: z
    .string()
    .describe('ISO-8601 timestamp of the last edit; equal to createdAt if never edited.'),
  canEdit: z
    .boolean()
    .describe('True when the calling user is allowed to edit this comment (author only).'),
  canDelete: z
    .boolean()
    .describe(
      'True when the calling user is allowed to delete this comment (author or moderator).',
    ),
});

export type CommentResponse = z.infer<typeof commentResponseSchema>;
