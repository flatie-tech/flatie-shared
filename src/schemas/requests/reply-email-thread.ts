import { z } from 'zod';
import { multipartArray } from '../multipart.schema';
import { EMAIL_LIMITS } from './create-email-thread';

/**
 * Body of `POST /buildings/:buildingId/email/threads/:threadId/reply` —
 * representative sends a reply message on an existing thread. Attachments
 * ride along as multipart file parts (see create-email-thread).
 */
export const replyEmailThreadRequestSchema = z
  .object({
    body: z
      .string()
      .min(1)
      .max(EMAIL_LIMITS.BODY_MAX)
      .describe('Plain-text body of the reply, up to 50k chars.'),
    // multipartArray: with attachments the endpoints are multipart — accepts a
    // real array, repeated form fields, or a JSON-encoded array string.
    ccEmails: multipartArray(z.string().email())
      .pipe(z.array(z.string().email()).max(EMAIL_LIMITS.CC_MAX))
      .optional()
      .describe('Optional Cc addresses for this reply; do not persist beyond this message.'),
  })
  .strict();

export type ReplyEmailThreadRequestPayload = z.infer<typeof replyEmailThreadRequestSchema>;
