import { describe, expect, it } from 'vitest';
import { resolveVotingMethods } from '../../src/utils/voting-methods';

const BOTH_ON = { votingCertiliaEnabled: true, votingPrintedSignatureEnabled: true };
const CERTILIA_ONLY = { votingCertiliaEnabled: true, votingPrintedSignatureEnabled: false };

describe('resolveVotingMethods', () => {
  it('overlays patch fields onto the current state', () => {
    expect(resolveVotingMethods(CERTILIA_ONLY, { votingPrintedSignatureEnabled: true })).toEqual(
      BOTH_ON,
    );
  });

  it('treats an empty patch as a no-op', () => {
    expect(resolveVotingMethods(CERTILIA_ONLY, {})).toEqual(CERTILIA_ONLY);
  });
});
