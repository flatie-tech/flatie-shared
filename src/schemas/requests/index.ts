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

export type { UpdateFailureReportRequestPayload } from './update-failure-report';
export { updateFailureReportRequestSchema } from './update-failure-report';
export type { UpdateMaintenanceLogRequestPayload } from './update-maintenance-log';
export { updateMaintenanceLogRequestSchema } from './update-maintenance-log';
export type { UpdateNoticeRequestPayload } from './update-notice';
export { updateNoticeRequestSchema } from './update-notice';
export type { UpdatePollRequestPayload } from './update-poll';
export { updatePollRequestSchema } from './update-poll';
