import { z } from 'zod';

/**
 * Body of `POST /buildings/:buildingId/email/threads` — representative
 * opens a new outbound thread to an external party (typically the
 * building's manager / upravitelj).
 */
export const createEmailThreadRequestSchema = z
  .object({
    recipientEmail: z
      .string()
      .email()
      .describe('Primary To address of the first outbound message.'),
    recipientName: z
      .string()
      .optional()
      .describe(
        'Display name to include in the To header (renders as "Name <email>" on the manager side).',
      ),
    ccEmails: z
      .array(z.string().email())
      .optional()
      .describe('Optional list of Cc addresses for the first message.'),
    subject: z
      .string()
      .min(1)
      .max(200)
      .describe('Subject line; used for both the first message and the thread summary.'),
    body: z.string().min(1).describe('Plain-text body of the first outbound message.'),
  })
  .strict();

export type CreateEmailThreadRequestPayload = z.infer<typeof createEmailThreadRequestSchema>;
