import { z } from 'zod';
import type { Strict } from './_strict';

/**
 * Building settings response — shape returned from
 * `GET /buildings/:buildingId/settings`.
 *
 * Field set mirrors the backend `building_settings` row. Consensus voting
 * is governed by `minVotingStrengthForConsensus`; the legacy voting-method
 * toggles and `minVerificationTierForConsensus` are still emitted for old
 * clients but no longer enforced.
 */
export const buildingSettingsResponseSchema = z
  .looseObject({
    id: z.string().uuid().optional(),
    buildingId: z.string().uuid().optional(),
    ownershipPercentageSource: z
      .enum(['units', 'users'])
      .nullable()
      .optional()
      .describe(
        'Which ownership-percentage source consensus polls use: `units` (unit surface areas) or `users` (per-user shares). Null = auto-detect (units when the building has units, users otherwise).',
      ),
    requireApprovalForNotices: z
      .boolean()
      .describe('When true, co-owner notices need representative approval before publishing.'),
    requireApprovalForFailureReports: z
      .boolean()
      .describe('When true, failure reports need representative approval before publishing.'),
    requireApprovalForPolls: z
      .boolean()
      .describe('When true, co-owner polls need representative approval before opening.'),
    requireApprovalForEvents: z
      .boolean()
      .describe('When true, co-owner events need representative approval before publishing.'),
    allowAnonymousPosting: z
      .boolean()
      .describe('When true, co-owners may post notices/reports without their name shown.'),
    faqEnabled: z.boolean().describe('Whether the FAQ section is available in this building.'),
    houseRulesEnabled: z
      .boolean()
      .describe('Whether the house-rules section is available in this building.'),
    chatEnabled: z.boolean().describe('Whether building chat is available in this building.'),
    emailEnabled: z
      .boolean()
      .default(false)
      .describe(
        'Whether the building mailbox (Korisnički pretinac) is available in this building. Defaults to FALSE — the feature is parked pending an inbound-architecture decision (see flatie-docs/team-knowledge/20).',
      ),
    commentsEnabled: z
      .boolean()
      .describe('Whether commenting on notices/reports is available in this building.'),
    coOwnerConsensusEnabled: z
      .boolean()
      .describe(
        'When true, co-owners can start consensus (binding) polls. When false (default), co-owners can only start community (non-binding) polls.',
      ),
    votingCertiliaEnabled: z
      .boolean()
      .describe('Deprecated: emitted for old clients, no longer enforced.'),
    votingPrintedSignatureEnabled: z
      .boolean()
      .describe('Deprecated: emitted for old clients, no longer enforced.'),
    minVerificationTierForConsensus: z
      .number()
      .int()
      .describe(
        'Deprecated: derived from minVotingStrengthForConsensus for old clients (EID → 3, else 2).',
      ),
    minVotingStrengthForConsensus: z
      .number()
      .int()
      .optional()
      .describe(
        'Minimum VotingStrength rung (EMAIL=10, PHONE=20, EID=30) an ONLINE consensus ballot must carry. Rep-recorded paper votes are never gated by it.',
      ),
    addonAiEnabled: z
      .boolean()
      .optional()
      .describe('Whether the AI add-on is enabled (billed on the next HUB-3 invoice).'),
    addonStorage5gbEnabled: z
      .boolean()
      .optional()
      .describe('Whether the 5 GB storage add-on is enabled.'),
    dunningEnabled: z.boolean().optional().describe('Collections ladder switched on.'),
    dunningReminderAfterDays: z
      .number()
      .int()
      .optional()
      .describe('Days past due before a reminder (opomena) is suggested.'),
    dunningFinalAfterDays: z
      .number()
      .int()
      .optional()
      .describe('Days after an unpaid reminder before the final notice is suggested.'),
    dunningPaymentDeadlineDays: z
      .number()
      .int()
      .optional()
      .describe('Payment deadline printed on letters, days from issue.'),
    dunningMinDebt: z
      .number()
      .optional()
      .describe('Minimum balance (EUR) before a letter is suggested.'),
    dunningInterestEnabled: z
      .boolean()
      .optional()
      .describe('Statutory default interest shown and claimed on letters/statements.'),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
  })
  .describe('Payload of `GET /buildings/:buildingId/settings`.');

export type BuildingSettingsResponse = Strict<z.infer<typeof buildingSettingsResponseSchema>>;
