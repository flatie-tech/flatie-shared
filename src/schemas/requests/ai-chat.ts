import { z } from 'zod';
import { AI_CHAT_LIMITS } from '../../constants/ai-chat';

// Schemas intentionally do NOT use .strict(). The Vercel AI SDK adds fields
// to UI messages and request bodies between minor versions (metadata,
// revisionId, createdAt, ...); rejecting unknown fields turns every SDK bump
// into a silent 400. Validate what we depend on; ignore the rest.
//
// The .max() caps are abuse ceilings, not UX limits — see AI_CHAT_LIMITS.
export const aiChatMessageSchema = z.object({
  id: z.string().optional().describe('Client-generated message id (AI SDK UIMessage id).'),
  role: z
    .enum(['user', 'assistant', 'system'])
    .describe('Author of the message in the conversation history.'),
  content: z
    .string()
    .max(AI_CHAT_LIMITS.MAX_MESSAGE_CHARS)
    .optional()
    .describe('Plain-text body; legacy shape, superseded by parts.'),
  parts: z
    .array(z.any())
    .optional()
    .refine(
      (parts) =>
        parts === undefined ||
        parts.every(
          (part) =>
            typeof part?.text !== 'string' || part.text.length <= AI_CHAT_LIMITS.MAX_MESSAGE_CHARS,
        ),
      { message: `Text part exceeds ${AI_CHAT_LIMITS.MAX_MESSAGE_CHARS} characters` },
    )
    .describe(
      'AI SDK UIMessage parts (text, tool invocations, ...). Text parts are capped at ' +
        'MAX_MESSAGE_CHARS.',
    ),
});

export const aiChatRequestSchema = z.object({
  id: z.string().optional().describe('AI SDK chat/session id.'),
  trigger: z.string().optional().describe('AI SDK submit trigger metadata; ignored by the API.'),
  buildingId: z
    .string()
    .optional()
    .describe(
      'Building context for the turn. When present, building-data tools are attached and the ' +
        'building AI budget applies; without it the assistant answers from general knowledge only.',
    ),
  locale: z
    .enum(['hr', 'en', 'de'])
    .optional()
    .describe(
      'The user’s active UI locale, sent per request so the assistant locks its reply ' +
        'language without relying on content inference (unreliable on small models). ' +
        'Defaults to hr.',
    ),
  messages: z
    .array(aiChatMessageSchema)
    .min(1)
    .max(AI_CHAT_LIMITS.MAX_MESSAGES)
    .describe('Full client-held conversation history, newest last; the server windows it.'),
});

export type AiChatMessagePayload = z.infer<typeof aiChatMessageSchema>;
export type AiChatRequestPayload = z.infer<typeof aiChatRequestSchema>;
