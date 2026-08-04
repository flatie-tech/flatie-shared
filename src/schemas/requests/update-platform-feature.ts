import { z } from 'zod';

/**
 * Body of `PATCH /platform/features/:key` — a platform admin flips a feature
 * on or off app-wide. The `note` is the audit-friendly "why", surfaced back on
 * the admin page next to who changed it.
 */
export const updatePlatformFeatureRequestSchema = z
  .object({
    enabled: z.boolean().describe('New platform-wide state.'),
    note: z
      .string()
      .max(500)
      .optional()
      .describe('Optional reason, shown on /platform/features and recorded in the audit log.'),
  })
  .strict();

export type UpdatePlatformFeatureRequestPayload = z.infer<
  typeof updatePlatformFeatureRequestSchema
>;
