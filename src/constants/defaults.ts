/**
 * Default pagination page size used across the stack.
 *
 * Backend clamps requests to `[1, 100]`. Clients that don't specify a limit
 * default to this value so list responses stay predictable.
 */
export const DEFAULT_PAGINATION_LIMIT = 10;

/** Maximum pagination page size the backend accepts. */
export const MAX_PAGINATION_LIMIT = 100;

/**
 * Chat conversation-list polling interval, shared by web and mobile so the
 * two clients can't drift (mobile shipped 10s against web's 15s once).
 */
export const CHAT_CONVERSATIONS_POLL_MS = 15_000;
