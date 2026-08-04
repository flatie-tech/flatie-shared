// Request (PATCH/PUT payload) schemas.
//
// Each schema here extends a body schema from `../entities/` with a
// required `id` field so consumers get a single canonical shape that
// covers "id from URL + optional body fields" in one place. Body
// shapes are intentionally not duplicated — they stay in `entities/`
// and are re-used here via `.extend()`.
//
// Inferred types are named `UpdateXRequestPayload` (not
// `UpdateXRequest`) so they don't collide with the hand-rolled
// interfaces in `src/types/*.types.ts`. The legacy interfaces have no
// current consumers but remain exported for backward-compat; the
// Zod-inferred payload types here are the contract-of-truth going
// forward.

export { aiChatMessageSchema, aiChatRequestSchema } from './ai-chat';
export type { CreateEmailThreadRequestPayload } from './create-email-thread';
export { createEmailThreadRequestSchema, EMAIL_LIMITS } from './create-email-thread';
export type { ReplyEmailThreadRequestPayload } from './reply-email-thread';
export { replyEmailThreadRequestSchema } from './reply-email-thread';
export { updateFailureReportRequestSchema } from './update-failure-report';
export { updateNoticeRequestSchema } from './update-notice';
export { updatePollRequestSchema } from './update-poll';
export type { UpdatePlatformFeatureRequestPayload } from './update-platform-feature';
export { updatePlatformFeatureRequestSchema } from './update-platform-feature';
