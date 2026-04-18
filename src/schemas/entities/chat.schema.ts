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
    .max(CHAT_LIMITS.MESSAGE_MAX, `Message must be at most ${CHAT_LIMITS.MESSAGE_MAX} characters`),
});

/**
 * Create conversation request schema
 */
export const createConversationSchema = z.object({
  type: z.enum([ConversationType.DIRECT, ConversationType.GROUP]),
  participantIds: z
    .array(uuidSchema)
    .min(CHAT_LIMITS.PARTICIPANTS_MIN, 'At least one participant is required')
    .max(CHAT_LIMITS.PARTICIPANTS_MAX, `Maximum ${CHAT_LIMITS.PARTICIPANTS_MAX} participants`),
  name: z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional(),
});

/**
 * Update conversation request schema (rename or add/remove participants)
 */
export const updateConversationSchema = z.object({
  name: z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional(),
  addParticipantIds: z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional(),
  removeParticipantIds: z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional(),
});

// Inferred types
export type SendMessageSchema = z.infer<typeof sendMessageSchema>;
export type CreateConversationSchema = z.infer<typeof createConversationSchema>;
export type UpdateConversationSchema = z.infer<typeof updateConversationSchema>;
