// AI chat guardrails, shared so backend validation, the web widget, and the
// mobile input agree on the same numbers.
//
// The DTO caps (MAX_*) are abuse ceilings, deliberately generous: clients
// resend the full conversation each turn, and a single assistant reply can
// legitimately reach ~16k characters at the 4096-output-token ceiling. The
// actual cost control is the server-side history window (WINDOW_*), which
// trims silently before the model call.
export const AI_CHAT_LIMITS = {
  /** Hard ceiling on the messages array per request. */
  MAX_MESSAGES: 100,
  /** Hard ceiling on a single message's text content, in characters. */
  MAX_MESSAGE_CHARS: 20_000,
  /** Client-side cap for the user's input box (web textarea / mobile TextInput). */
  MAX_INPUT_CHARS: 4_000,
  /** Server-side history window: newest messages kept per model call. */
  WINDOW_MAX_MESSAGES: 20,
  /** Server-side history window: character budget (~6k tokens) per model call. */
  WINDOW_MAX_CHARS: 24_000,
} as const;
