import { z } from 'zod';

export const commentResponseSchema = z.looseObject({
  id: z.string().uuid(),
  entityType: z.string(),
  entityId: z.string(),
  userId: z.string(),
  userName: z.string().nullable(),
  userImage: z.string().nullable(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
});

export type CommentResponse = z.infer<typeof commentResponseSchema>;
