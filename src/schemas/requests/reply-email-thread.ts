import { z } from 'zod';

/**
 * Body of `POST /buildings/:buildingId/email/threads/:threadId/reply` —
 * representative sends a reply message on an existing thread.
 */
export const replyEmailThreadRequestSchema = z
  .object({
    body: z.string().min(1).describe('Plain-text body of the reply.'),
    ccEmails: z
      .array(z.string().email())
      .optional()
      .describe('Optional Cc addresses for this reply; do not persist beyond this message.'),
  })
  .strict();

export type ReplyEmailThreadRequestPayload = z.infer<typeof replyEmailThreadRequestSchema>;
