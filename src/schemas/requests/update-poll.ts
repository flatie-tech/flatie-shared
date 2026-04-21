import type { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { updatePollSchema as updatePollBodySchema } from '../entities/poll.schema';

/**
 * Update poll request schema — the canonical PATCH request shape,
 * combining the poll `id` (from the URL) with the optional body fields
 * validated by `updatePollSchema` in `entities/poll.schema.ts`.
 */
export const updatePollRequestSchema = updatePollBodySchema.extend({
  id: uuidSchema.describe('UUID of the poll to update, taken from the URL.'),
});

export type UpdatePollRequestPayload = z.infer<typeof updatePollRequestSchema>;
