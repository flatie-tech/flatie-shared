import { z } from 'zod';
import type { Strict } from './_strict';

/**
 * Building settings response — shape returned from
 * `GET /buildings/:buildingId/settings`.
 *
 * Field set mirrors the backend `building_settings` row. The voting
 * method toggles are subject to the last-method-lock invariant (see
 * `utils/voting-methods.ts`): at least one of the `voting*Enabled`
 * flags must stay true so CONSENSUS polls always have a voting path.
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
    commentsEnabled: z
      .boolean()
      .describe('Whether commenting on notices/reports is available in this building.'),
    votingCertiliaEnabled: z
      .boolean()
      .describe(
        'Whether the Certilia eID online voting path is offered on CONSENSUS polls. Subject to the last-method-lock invariant.',
      ),
    votingPrintedSignatureEnabled: z
      .boolean()
      .describe(
        'Whether the printed-signature voting path (rep-reviewed paper ballots) is offered on CONSENSUS polls. Subject to the last-method-lock invariant.',
      ),
    minVerificationTierForConsensus: z
      .number()
      .int()
      .describe(
        'Minimum durable VerificationTier ordinal a co-owner must hold to cast a binding CONSENSUS vote. The backend enforces the ZUOZ legal floor.',
      ),
    addonAiEnabled: z
      .boolean()
      .optional()
      .describe('Whether the AI add-on is enabled (billed on the next HUB-3 invoice).'),
    addonStorage5gbEnabled: z
      .boolean()
      .optional()
      .describe('Whether the 5 GB storage add-on is enabled.'),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
  })
  .describe('Payload of `GET /buildings/:buildingId/settings`.');

export type BuildingSettingsResponse = Strict<z.infer<typeof buildingSettingsResponseSchema>>;
