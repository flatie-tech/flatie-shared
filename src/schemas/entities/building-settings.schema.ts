import { z } from 'zod';

/**
 * Update building settings request — body of
 * `PATCH /buildings/:buildingId/settings`.
 *
 * Every field optional (partial patch). The backend service enforces
 * two invariants on top of this shape:
 *  - last-method-lock: at least one `voting*Enabled` flag must remain
 *    true (see `utils/voting-methods.ts` for the client-side check);
 *  - `minVerificationTierForConsensus` cannot go below the ZUOZ legal
 *    floor and must stay consistent with the printed-signature toggle.
 */
export const updateBuildingSettingsSchema = z.object({
  ownershipPercentageSource: z
    .enum(['units', 'users'])
    .nullable()
    .optional()
    .describe('Ownership-percentage source for consensus polls; null resets to auto-detect.'),
  requireApprovalForNotices: z.boolean().optional(),
  requireApprovalForFailureReports: z.boolean().optional(),
  requireApprovalForPolls: z.boolean().optional(),
  requireApprovalForEvents: z.boolean().optional(),
  allowAnonymousPosting: z.boolean().optional(),
  faqEnabled: z.boolean().optional(),
  houseRulesEnabled: z.boolean().optional(),
  chatEnabled: z.boolean().optional(),
  commentsEnabled: z.boolean().optional(),
  votingCertiliaEnabled: z.boolean().optional(),
  votingPrintedSignatureEnabled: z.boolean().optional(),
  minVerificationTierForConsensus: z
    .number()
    .int()
    .min(0)
    .max(3)
    .optional()
    .describe(
      'Minimum durable VerificationTier ordinal for CONSENSUS ballots. The backend enforces the ZUOZ legal floor (IDENTITY = 2) and consistency with the printed-signature toggle.',
    ),
  addonAiEnabled: z.boolean().optional(),
  addonStorage5gbEnabled: z.boolean().optional(),
});

export type UpdateBuildingSettingsSchema = z.infer<typeof updateBuildingSettingsSchema>;
