import { z } from 'zod';
import { ConversationType } from '../entities/chat.schema';

export const conversationParticipantSchema = z
  .looseObject({
    id: z.string().describe('Participation record ID.'),
    userId: z.string().describe('UUID of the participant user.'),
    name: z.string().describe('Participant display name.'),
    image: z
      .string()
      .nullable()
      .optional()
      .describe('Avatar URL; null when the user has no profile image.'),
    roleType: z
      .string()
      .nullable()
      .optional()
      .describe('Building role type of the participant; null when not applicable.'),
    lastReadAt: z
      .string()
      .describe('ISO-8601 timestamp of the last message this participant has read.'),
  })
  .describe('A participant in a chat conversation.');

export const conversationLastMessageSchema = z
  .looseObject({
    id: z.string().describe('UUID of the message.'),
    content: z.string().describe('Plain-text message body (may be truncated for preview).'),
    senderId: z.string().describe('UUID of the user who sent the message.'),
    senderName: z.string().describe('Display name of the sender.'),
    createdAt: z.string().describe('ISO-8601 timestamp when the message was sent.'),
  })
  .describe('Last message preview embedded in conversation list responses.');

export const conversationResponseSchema = z
  .looseObject({
    id: z.string().describe('UUID of the conversation.'),
    buildingId: z.string().describe('UUID of the building this conversation belongs to.'),
    type: z
      .enum([ConversationType.DIRECT, ConversationType.GROUP])
      .describe('`direct` for 1:1 threads, `group` for named multi-user conversations.'),
    name: z.string().nullable().optional().describe('Group name; null for direct conversations.'),
    participants: z
      .array(conversationParticipantSchema)
      .describe('All participants in the conversation.'),
    lastMessage: conversationLastMessageSchema
      .nullable()
      .optional()
      .describe('Most recent message; null when no messages have been sent.'),
    unreadCount: z
      .number()
      .describe('Number of unread messages for the calling user in this conversation.'),
    lastMessageAt: z.string().describe('ISO-8601 timestamp of the most recent message.'),
    createdAt: z.string().describe('ISO-8601 timestamp when the conversation was created.'),
  })
  .describe('Conversation response from list and detail endpoints.');

export const chatMessageResponseSchema = z
  .looseObject({
    id: z.string().describe('UUID of the message.'),
    conversationId: z.string().describe('UUID of the parent conversation.'),
    senderId: z.string().describe('UUID of the user who sent the message.'),
    senderName: z.string().describe('Display name of the sender.'),
    senderImage: z
      .string()
      .nullable()
      .optional()
      .describe('Avatar URL of the sender; null when no profile image is set.'),
    senderRoleType: z
      .string()
      .nullable()
      .optional()
      .describe('Building role type of the sender; null when not applicable.'),
    content: z.string().describe('Plain-text message body.'),
    createdAt: z.string().describe('ISO-8601 timestamp when the message was sent.'),
  })
  .describe('Chat message response from message list endpoints.');

export const conversationsListResponseSchema = z
  .looseObject({
    data: z.array(conversationResponseSchema).describe('Page of conversations.'),
    nextCursor: z
      .string()
      .nullable()
      .optional()
      .describe('Opaque cursor for the next page; null when there are no more results.'),
  })
  .describe('Cursor-paginated list of conversations.');

export const messagesListResponseSchema = z
  .looseObject({
    data: z.array(chatMessageResponseSchema).describe('Page of messages.'),
    nextCursor: z
      .string()
      .nullable()
      .optional()
      .describe('Opaque cursor for the next page; null when there are no more results.'),
  })
  .describe('Cursor-paginated list of chat messages.');

export const unreadCountResponseSchema = z
  .looseObject({
    unreadCount: z.number().describe('Total number of unread messages across all conversations.'),
  })
  .describe('Unread message count for a building.');

import type { Strict } from './_strict';

export type ConversationParticipant = Strict<z.infer<typeof conversationParticipantSchema>>;
export type ConversationLastMessage = Strict<z.infer<typeof conversationLastMessageSchema>>;
export type ConversationResponse = Strict<z.infer<typeof conversationResponseSchema>>;
export type ChatMessageResponse = Strict<z.infer<typeof chatMessageResponseSchema>>;
export type ConversationsListResponse = Strict<z.infer<typeof conversationsListResponseSchema>>;
export type MessagesListResponse = Strict<z.infer<typeof messagesListResponseSchema>>;
export type UnreadCountResponse = Strict<z.infer<typeof unreadCountResponseSchema>>;
