import { describe, expect, it } from 'vitest';
import { UNIMPLEMENTED_NOTIFICATION_TYPES } from '../../src/enums/notification.enum';
import {
  createPollSchema,
  recordOfflineVotesSchema,
  updatePollSchema,
} from '../../src/schemas/entities/poll.schema';
import { pollEligibleVotersResponseSchema } from '../../src/schemas/responses/polls';

describe('poll schemas (v0.67.0 additions)', () => {
  it('updatePollSchema carries consensusCategory and legalBasis (create already did)', () => {
    const parsed = updatePollSchema.parse({
      consensusCategory: 'fundUsage',
      legalBasis: 'ZV čl. 87',
    });
    expect(parsed.consensusCategory).toBe('fundUsage');
    expect(parsed.legalBasis).toBe('ZV čl. 87');

    const created = createPollSchema.parse({
      question: 'Repair the roof?',
      // Consensus polls carry exactly one option — the proposal itself.
      options: ['Popravak krova'],
      pollType: 'consensus',
      requiredConsensusPercentage: 51,
      consensusCategory: 'fundUsage',
      legalBasis: 'ZV čl. 87',
    });
    expect(created.consensusCategory).toBe('fundUsage');
  });

  it('rejects over-limit consensusCategory/legalBasis on update', () => {
    expect(updatePollSchema.safeParse({ consensusCategory: 'x'.repeat(101) }).success).toBe(false);
    expect(updatePollSchema.safeParse({ legalBasis: 'x'.repeat(101) }).success).toBe(false);
  });

  it('poll deadline reminder types are no longer marked unimplemented', () => {
    expect(UNIMPLEMENTED_NOTIFICATION_TYPES.has('poll_deadline_24h' as never)).toBe(false);
    expect(UNIMPLEMENTED_NOTIFICATION_TYPES.has('poll_deadline_1h' as never)).toBe(false);
  });
});

describe('poll schemas (owners-model additions)', () => {
  it('createPollSchema accepts scopedOwnerIds and no longer knows scopedUserIds', () => {
    const parsed = createPollSchema.parse({
      question: 'Povećanje pričuve?',
      options: ['Povećanje pričuve na 1,00 eur/m²'],
      pollType: 'consensus',
      requiredConsensusPercentage: 51,
      scopedOwnerIds: ['550e8400-e29b-41d4-a716-446655440000'],
    });
    expect(parsed.scopedOwnerIds).toEqual(['550e8400-e29b-41d4-a716-446655440000']);
    expect('scopedUserIds' in parsed).toBe(false);
  });

  it('recordOfflineVotesSchema requires at least one ownerId and validates uuids', () => {
    expect(recordOfflineVotesSchema.safeParse({ ownerIds: [] }).success).toBe(false);
    expect(recordOfflineVotesSchema.safeParse({ ownerIds: ['not-a-uuid'] }).success).toBe(false);
    const ok = recordOfflineVotesSchema.parse({
      ownerIds: ['550e8400-e29b-41d4-a716-446655440000'],
      proofFileId: '550e8400-e29b-41d4-a716-446655440001',
    });
    expect(ok.ownerIds).toHaveLength(1);
  });

  it('pollEligibleVotersResponseSchema parses a roster with string-exact weights', () => {
    const parsed = pollEligibleVotersResponseSchema.parse({
      pollId: '550e8400-e29b-41d4-a716-446655440002',
      voters: [
        {
          ownerId: '550e8400-e29b-41d4-a716-446655440003',
          userId: null,
          fullName: 'Ajduković Ankica i Vlado',
          email: null,
          oib: '16165280959',
          weightPct: '12.20000',
          holdings: [
            {
              unitType: 'apartment',
              unitId: '550e8400-e29b-41d4-a716-446655440004',
              label: 'ST 3448',
              floor: 'PR',
              areaM2: '91.52',
              unitSharePct: '100.00000',
            },
          ],
          voteStatus: 'not_voted',
        },
      ],
      totalWeightPct: '100.00000',
      warnings: { unitsWithoutArea: [], unitsWithoutOwners: [] },
    });
    expect(parsed.voters[0]?.weightPct).toBe('12.20000');
    expect(parsed.voters[0]?.userId).toBeNull();
  });
});
