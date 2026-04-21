import { z } from 'zod';

/**
 * Response shape returned by bare-action endpoints (approve, archive, restore,
 * permanent-delete, decline, etc.) — the controller finishes the side effect
 * and returns a single human-readable confirmation string.
 *
 * Shape is intentionally minimal: backend controllers across notices, polls,
 * failure-reports, maintenance-logs, events, garages, storage-units, apartments,
 * transaction-categories, income-transactions, and more all return
 * `{ message: string }` with no additional fields.
 */
export const messageResponseSchema = z.object({
  message: z
    .string()
    .describe(
      'Human-readable confirmation that the action completed successfully (e.g., "Notice approved").',
    ),
});

export type MessageResponse = z.infer<typeof messageResponseSchema>;
