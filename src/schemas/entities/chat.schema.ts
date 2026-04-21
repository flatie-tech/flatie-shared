import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Validation constants for chat
 */
export const CHAT_LIMITS = {
  MESSAGE_MIN: 1,
  MESSAGE_MAX: 5000,
  GROUP_NAME_MAX: 100,
  PARTICIPANTS_MIN: 1,
  PARTICIPANTS_MAX: 50,
} as const;

/**
 * Conversation type — direct (1:1) or group
 */
export const ConversationType = {
  DIRECT: 'direct',
  GROUP: 'group',
} as const;

export type ConversationType = (typeof ConversationType)[keyof typeof ConversationType];

/**
 * Send message request schema
 */
export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(CHAT_LIMITS.MESSAGE_MIN, 'Message is required')
    .max(CHAT_LIMITS.MESSAGE_MAX, `Message must be at most ${CHAT_LIMITS.MESSAGE_MAX} characters`)
    .describe('Plain-text message body, 1–5000 characters. Trimmed and stored verbatim.'),
});

/**
 * Create conversation request schema
 */
export const createConversationSchema = z.object({
  type: z
    .enum([ConversationType.DIRECT, ConversationType.GROUP])
    .describe(
      '`direct` for a one-to-one thread, `group` for a named multi-user conversation.',
    ),
  participantIds: z
    .array(uuidSchema)
    .min(CHAT_LIMITS.PARTICIPANTS_MIN, 'At least one participant is required')
    .max(CHAT_LIMITS.PARTICIPANTS_MAX, `Maximum ${CHAT_LIMITS.PARTICIPANTS_MAX} participants`)
    .describe(
      'UUIDs of the other participants. The caller is added automatically; direct conversations must have exactly one other participant.',
    ),
  name: z
    .string()
    .max(CHAT_LIMITS.GROUP_NAME_MAX)
    .optional()
    .describe('Group display name, max 100 chars. Ignored for direct conversations.'),
});

/**
 * Update conversation request schema (rename or add/remove participants)
 */
export const updateConversationSchema = z.object({
  name: z
    .string()
    .max(CHAT_LIMITS.GROUP_NAME_MAX)
    .optional()
    .describe('New group name, max 100 chars. Omit to leave the name unchanged.'),
  addParticipantIds: z
    .array(uuidSchema)
    .max(CHAT_LIMITS.PARTICIPANTS_MAX)
    .optional()
    .describe('UUIDs of users to add to the conversation. Omit or pass [] to add no one.'),
  removeParticipantIds: z
    .array(uuidSchema)
    .max(CHAT_LIMITS.PARTICIPANTS_MAX)
    .optional()
    .describe('UUIDs of users to remove from the conversation. Omit or pass [] to remove no one.'),
});

/**
 * Cursor-based pagination query schema (conversations / messages)
 */
export const cursorQuerySchema = z.object({
  cursor: z
    .string()
    .optional()
    .describe(
      'Opaque pagination cursor returned by a previous response. Omit to fetch the first page.',
    ),
});

// Inferred types
export type SendMessageSchema = z.infer<typeof sendMessageSchema>;
export type CreateConversationSchema = z.infer<typeof createConversationSchema>;
export type UpdateConversationSchema = z.infer<typeof updateConversationSchema>;
export type CursorQuerySchema = z.infer<typeof cursorQuerySchema>;
