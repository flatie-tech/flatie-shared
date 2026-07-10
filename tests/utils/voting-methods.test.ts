import { describe, expect, it } from 'vitest';
import {
  isLastEnabledVotingMethod,
  resolveVotingMethods,
  violatesVotingMethodLock,
} from '../../src/utils/voting-methods';

const BOTH_ON = { votingCertiliaEnabled: true, votingPrintedSignatureEnabled: true };
const CERTILIA_ONLY = { votingCertiliaEnabled: true, votingPrintedSignatureEnabled: false };
const PRINTED_ONLY = { votingCertiliaEnabled: false, votingPrintedSignatureEnabled: true };

describe('violatesVotingMethodLock', () => {
  it('allows disabling one method while the other stays on', () => {
    expect(violatesVotingMethodLock(BOTH_ON, { votingCertiliaEnabled: false })).toBe(false);
    expect(violatesVotingMethodLock(BOTH_ON, { votingPrintedSignatureEnabled: false })).toBe(false);
  });

  it('rejects disabling the last enabled method', () => {
    expect(violatesVotingMethodLock(CERTILIA_ONLY, { votingCertiliaEnabled: false })).toBe(true);
    expect(violatesVotingMethodLock(PRINTED_ONLY, { votingPrintedSignatureEnabled: false })).toBe(
      true,
    );
  });

  it('rejects a patch disabling both methods at once', () => {
    expect(
      violatesVotingMethodLock(BOTH_ON, {
        votingCertiliaEnabled: false,
        votingPrintedSignatureEnabled: false,
      }),
    ).toBe(true);
  });

  it('allows a swap that enables one method while disabling the other', () => {
    expect(
      violatesVotingMethodLock(CERTILIA_ONLY, {
        votingCertiliaEnabled: false,
        votingPrintedSignatureEnabled: true,
      }),
    ).toBe(false);
  });

  it('treats an empty patch as a no-op', () => {
    expect(violatesVotingMethodLock(CERTILIA_ONLY, {})).toBe(false);
  });
});

describe('isLastEnabledVotingMethod', () => {
  it('flags the only enabled method as locked', () => {
    expect(isLastEnabledVotingMethod(CERTILIA_ONLY, 'votingCertiliaEnabled')).toBe(true);
    expect(isLastEnabledVotingMethod(PRINTED_ONLY, 'votingPrintedSignatureEnabled')).toBe(true);
  });

  it('does not flag when another method is also enabled', () => {
    expect(isLastEnabledVotingMethod(BOTH_ON, 'votingCertiliaEnabled')).toBe(false);
  });

  it('does not flag a method that is already disabled', () => {
    expect(isLastEnabledVotingMethod(PRINTED_ONLY, 'votingCertiliaEnabled')).toBe(false);
  });
});

describe('resolveVotingMethods', () => {
  it('overlays patch fields onto the current state', () => {
    expect(resolveVotingMethods(CERTILIA_ONLY, { votingPrintedSignatureEnabled: true })).toEqual(
      BOTH_ON,
    );
  });
});
