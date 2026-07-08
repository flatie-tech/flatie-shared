// src/constants/ai-chat.ts
var AI_CHAT_LIMITS = {
  /** Hard ceiling on the messages array per request. */
  MAX_MESSAGES: 100,
  /** Hard ceiling on a single message's text content, in characters. */
  MAX_MESSAGE_CHARS: 2e4,
  /** Client-side cap for the user's input box (web textarea / mobile TextInput). */
  MAX_INPUT_CHARS: 4e3,
  /** Server-side history window: newest messages kept per model call. */
  WINDOW_MAX_MESSAGES: 20,
  /** Server-side history window: character budget (~6k tokens) per model call. */
  WINDOW_MAX_CHARS: 24e3
};

export { AI_CHAT_LIMITS };
//# sourceMappingURL=chunk-BYX5R6MR.js.map
//# sourceMappingURL=chunk-BYX5R6MR.js.map