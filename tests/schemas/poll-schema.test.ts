import { describe, expect, it } from 'vitest';
import { UNIMPLEMENTED_NOTIFICATION_TYPES } from '../../src/enums/notification.enum';
import { createPollSchema, updatePollSchema } from '../../src/schemas/entities/poll.schema';

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
