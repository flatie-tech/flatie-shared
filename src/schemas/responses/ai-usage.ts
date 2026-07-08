import { z } from 'zod';

// Monetary fields are micro-USD integers ($1 = 1_000_000) — the backend's
// budget ledger unit, chosen to avoid float drift when accumulating many
// sub-cent LLM calls.
export const aiUsageResponseSchema = z
  .looseObject({
    buildingId: z.string().describe('UUID of the building this usage row belongs to.'),
    period: z
      .string()
      .describe('Billing period key in YYYY-MM (UTC calendar month); resets implicitly.'),
    spentMicroUsd: z
      .number()
      .describe('Estimated AI spend accumulated by the whole building this period, in micro-USD.'),
    messageCount: z
      .number()
      .describe('Number of AI chat replies the building has consumed this period.'),
    capMicroUsd: z
      .number()
      .describe('Monthly building cap in micro-USD ($1 base, $6 with the AI add-on).'),
    userSpentMicroUsd: z
      .number()
      .optional()
      .describe(
        'Requesting user’s own spend this period, in micro-USD. Omitted when the ' +
          'per-user tracker (Redis) is unavailable.',
      ),
    userCapMicroUsd: z
      .number()
      .optional()
      .describe(
        'Requesting user’s personal share of the building cap, in micro-USD (fairness ' +
          'limit so one member cannot drain the building budget). Omitted with userSpentMicroUsd.',
      ),
  })
  .describe('AI chat budget usage for one building in the current monthly period.');

export type AiUsageResponse = z.infer<typeof aiUsageResponseSchema>;
