import { z } from 'zod';

/**
 * Validation constants for the building mailbox. Clients derive their form
 * validation from these instead of inventing local caps.
 */
export const EMAIL_LIMITS = {
  SUBJECT_MAX: 200,
  BODY_MAX: 50_000,
  RECIPIENT_NAME_MAX: 100,
  CC_MAX: 10,
  /** Per-message attachment cap; individual files obey the shared 10MB/type rules. */
  ATTACHMENTS_MAX: 10,
} as const;

/**
 * Body of `POST /buildings/:buildingId/email/threads` — representative
 * opens a new outbound thread to an external party (typically the
 * building's manager / upravitelj).
 *
 * Attachments ride along as multipart file parts (extracted server-side by
 * MultipartFilesInterceptor, same convention as notices/documents), so they
 * are not part of this schema.
 */
export const createEmailThreadRequestSchema = z
  .object({
    recipientEmail: z
      .string()
      .email()
      .describe('Primary To address of the first outbound message.'),
    recipientName: z
      .string()
      .max(EMAIL_LIMITS.RECIPIENT_NAME_MAX)
      .optional()
      .describe(
        'Display name to include in the To header (renders as "Name <email>" on the manager side).',
      ),
    ccEmails: z
      .array(z.string().email())
      .max(EMAIL_LIMITS.CC_MAX)
      .optional()
      .describe('Optional list of Cc addresses for the first message (max 10).'),
    subject: z
      .string()
      .min(1)
      .max(EMAIL_LIMITS.SUBJECT_MAX)
      .describe('Subject line; used for both the first message and the thread summary.'),
    body: z
      .string()
      .min(1)
      .max(EMAIL_LIMITS.BODY_MAX)
      .describe('Plain-text body of the first outbound message, up to 50k chars.'),
  })
  .strict();

export type CreateEmailThreadRequestPayload = z.infer<typeof createEmailThreadRequestSchema>;
