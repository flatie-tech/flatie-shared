import { z } from 'zod';
import { paginatedResponseSchema } from '../pagination.schema';
import type { Strict } from './_strict';

const emailDirectionSchema = z
  .enum(['outbound', 'inbound'])
  .describe(
    '`outbound` when a representative sent the message through the app; `inbound` when Flatie received the message from an external party via the inbound-mail webhook.',
  );

export const emailAttachmentSchema = z
  .looseObject({
    id: z.string().uuid().describe('UUID of the stored attachment file.'),
    fileName: z.string().describe('Original file name as sent/received.'),
    mimeType: z.string().nullable().optional().describe('MIME type when known.'),
    fileSize: z.coerce.number().nullable().optional().describe('Size in bytes when known.'),
    url: z
      .string()
      .describe('Time-limited download URL for the attachment (presigned/HMAC-signed).'),
  })
  .describe('A file attached to an email message (inbound or outbound).');

export const emailMessageSchema = z
  .looseObject({
    id: z.string().uuid().describe('UUID of the stored email message.'),
    threadId: z.string().uuid().describe('UUID of the thread this message belongs to.'),
    direction: emailDirectionSchema,
    fromAddress: z.string().describe('Envelope/From address of this message.'),
    fromName: z
      .string()
      .nullable()
      .optional()
      .describe('Display name parsed from the From header, or null when missing.'),
    toAddresses: z
      .array(z.string())
      .default([])
      .describe('Primary recipients parsed from the To header.'),
    ccAddresses: z
      .array(z.string())
      .default([])
      .describe('Carbon-copy recipients parsed from the Cc header.'),
    subject: z.string().describe('Subject line as stored (inherited from the thread for replies).'),
    bodyText: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Text body. For outbound this is the markdown source the representative wrote (clients render it as markdown); for inbound it is the plain-text MIME part and may be null.',
      ),
    bodyHtml: z
      .string()
      .nullable()
      .optional()
      .describe('Rendered HTML body when the original message included one; null otherwise.'),
    messageId: z
      .string()
      .nullable()
      .optional()
      .describe(
        'RFC 5322 Message-ID header value. Used for inbound idempotency and References-chain threading when a reply does not match the To-address route.',
      ),
    sentByUserId: z
      .string()
      .uuid()
      .nullable()
      .optional()
      .describe('UUID of the representative who triggered the outbound send; null for inbound.'),
    sentByUserName: z
      .string()
      .nullable()
      .optional()
      .describe('Display name of the sending representative; null for inbound.'),
    createdAt: z
      .string()
      .describe('ISO-8601 timestamp when the message was persisted server-side.'),
    receivedAt: z
      .string()
      .nullable()
      .optional()
      .describe(
        'ISO-8601 timestamp the provider reported receiving the message (inbound only); null/absent for outbound or when the provider omitted it. Clients display `receivedAt ?? createdAt`.',
      ),
    attachments: z
      .array(emailAttachmentSchema)
      .default([])
      .describe('Files attached to this message; empty when none.'),
  })
  .describe('A single email message within a building thread.');

export const emailThreadSchema = z
  .looseObject({
    id: z.string().uuid().describe('UUID of the thread.'),
    buildingId: z.string().uuid().describe('UUID of the building that owns the thread.'),
    subject: z.string().describe('Subject line at thread creation; not rewritten on reply.'),
    externalParticipants: z
      .array(z.string())
      .default([])
      .describe(
        'Unique external email addresses seen on this thread (recipients of outbound + senders of inbound).',
      ),
    inboxAddress: z
      .string()
      .describe('The building’s inbox address at the time the thread was routed.'),
    lastMessageAt: z.string().describe('ISO-8601 timestamp of the most recent message.'),
    lastMessagePreview: z
      .string()
      .nullable()
      .optional()
      .describe('First ~140 characters of the most recent message body, for list previews.'),
    lastMessageDirection: emailDirectionSchema
      .nullable()
      .optional()
      .describe('Direction of the most recent message; null when the thread has no messages yet.'),
    messageCount: z.coerce.number().default(0).describe('Total messages currently in the thread.'),
    unreadCount: z.coerce
      .number()
      .default(0)
      .describe('Count of inbound messages not yet marked as read.'),
    archived: z.boolean().default(false).describe('True when the thread has been archived.'),
    hasAttachments: z
      .boolean()
      .default(false)
      .describe('True when at least one message in the thread carries attachments.'),
  })
  .describe('Summary row for the thread list view.');

export const emailThreadDetailSchema = emailThreadSchema
  .extend({
    messages: z
      .array(emailMessageSchema)
      .default([])
      .describe('All messages in the thread, oldest first.'),
  })
  .describe('Full thread detail including every message.');

export const paginatedEmailThreadsResponseSchema = paginatedResponseSchema(emailThreadSchema);

export const emailUnreadCountResponseSchema = z
  .looseObject({
    unreadCount: z.coerce
      .number()
      .describe('Sum of unread inbound messages across the building’s non-archived threads.'),
  })
  .describe('Response of `GET /buildings/:buildingId/email/unread-count`; feeds the inbox badge.');

export type EmailDirection = Strict<z.infer<typeof emailDirectionSchema>>;
export type EmailAttachment = Strict<z.infer<typeof emailAttachmentSchema>>;
export type EmailMessage = Strict<z.infer<typeof emailMessageSchema>>;
export type EmailThread = Strict<z.infer<typeof emailThreadSchema>>;
export type EmailThreadDetail = Strict<z.infer<typeof emailThreadDetailSchema>>;
export type PaginatedEmailThreadsResponse = Strict<
  z.infer<typeof paginatedEmailThreadsResponseSchema>
>;
export type EmailUnreadCountResponse = Strict<z.infer<typeof emailUnreadCountResponseSchema>>;
