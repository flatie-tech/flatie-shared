import type { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { updateNoticeSchema as updateNoticeBodySchema } from '../entities/notice.schema';

/**
 * Update notice request schema — the canonical PATCH request shape,
 * combining the notice `id` (from the URL) with the optional body
 * fields validated by `updateNoticeSchema` in `entities/notice.schema.ts`.
 *
 * Consumers (frontend server actions, backend handlers that want a
 * single-object signature) should prefer this over hand-rolling their
 * own wrapper — the body shape stays in lockstep with the backend
 * controller because it reuses the entity-level body schema directly.
 */
export const updateNoticeRequestSchema = updateNoticeBodySchema.extend({
  id: uuidSchema,
});

export type UpdateNoticeRequestPayload = z.infer<typeof updateNoticeRequestSchema>;
