import { z } from 'zod';

/**
 * Update building settings request — body of
 * `PATCH /buildings/:buildingId/settings`.
 *
 * Every field optional (partial patch). Consensus voting is governed by
 * `minVotingStrengthForConsensus` (a `VotingStrength` rung): the minimum
 * account verification an ONLINE consensus ballot must carry. Rep-recorded
 * paper votes are never gated by it. The backend rejects the PHONE rung
 * while no SMS provider is configured.
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
  emailEnabled: z.boolean().optional(),
  commentsEnabled: z.boolean().optional(),
  coOwnerConsensusEnabled: z
    .boolean()
    .optional()
    .describe(
      'When true, co-owners can start consensus (binding) polls. When false (default), co-owners can only start community (non-binding) polls.',
    ),
  votingCertiliaEnabled: z
    .boolean()
    .optional()
    .describe('Deprecated: no longer enforced; accepted for old clients and ignored.'),
  votingPrintedSignatureEnabled: z
    .boolean()
    .optional()
    .describe('Deprecated: no longer enforced; accepted for old clients and ignored.'),
  minVerificationTierForConsensus: z
    .number()
    .int()
    .min(0)
    .max(3)
    .optional()
    .describe(
      'Deprecated: superseded by minVotingStrengthForConsensus. Accepted from old clients and translated by the backend (3 → EID, else EMAIL).',
    ),
  minVotingStrengthForConsensus: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional()
    .describe(
      'Minimum VotingStrength rung (EMAIL=10, PHONE=20, EID=30) an ONLINE consensus ballot must carry. Paper votes recorded by the representative are never gated by it.',
    ),
  addonAiEnabled: z.boolean().optional(),
  addonStorage5gbEnabled: z.boolean().optional(),
  // ── Pričuva collections (dunning) policy ─────────────────────────────
  dunningEnabled: z
    .boolean()
    .optional()
    .describe('Master switch for the collections ladder (opomene). Off by default.'),
  dunningReminderAfterDays: z
    .number()
    .int()
    .min(1)
    .max(365)
    .optional()
    .describe('Days a charge must be past due before a reminder (opomena) is suggested.'),
  dunningFinalAfterDays: z
    .number()
    .int()
    .min(1)
    .max(365)
    .optional()
    .describe('Days after an unpaid reminder before the final notice (pred ovrhu) is suggested.'),
  dunningPaymentDeadlineDays: z
    .number()
    .int()
    .min(1)
    .max(90)
    .optional()
    .describe('Payment deadline printed on every letter, in days from issue.'),
  dunningMinDebt: z
    .number()
    .min(0)
    .max(100000)
    .optional()
    .describe('Minimum balance (EUR) before an owner is suggested for a letter.'),
  dunningInterestEnabled: z
    .boolean()
    .optional()
    .describe('Show and claim statutory default interest on letters and statements.'),
});

export type UpdateBuildingSettingsSchema = z.infer<typeof updateBuildingSettingsSchema>;
