import { describe, expect, it } from 'vitest';
import { deriveVotingStrength, VerificationTier, VotingStrength } from '../../src/enums';

describe('VotingStrength', () => {
  it('rungs are strictly ordered with gaps for future rungs', () => {
    expect(VotingStrength.NONE).toBeLessThan(VotingStrength.EMAIL);
    expect(VotingStrength.EMAIL).toBeLessThan(VotingStrength.PHONE);
    expect(VotingStrength.PHONE).toBeLessThan(VotingStrength.EID);
    expect(VotingStrength.PHONE - VotingStrength.EMAIL).toBeGreaterThan(1);
    expect(VotingStrength.EID - VotingStrength.PHONE).toBeGreaterThan(1);
  });
});

describe('deriveVotingStrength', () => {
  it('unverified account has no strength', () => {
    expect(deriveVotingStrength({})).toBe(VotingStrength.NONE);
    expect(deriveVotingStrength({ emailVerified: false, phoneVerified: true })).toBe(
      VotingStrength.NONE,
    );
  });

  it('verified email is the base rung', () => {
    expect(deriveVotingStrength({ emailVerified: true })).toBe(VotingStrength.EMAIL);
  });

  it('verified phone requires verified email too', () => {
    expect(deriveVotingStrength({ emailVerified: true, phoneVerified: true })).toBe(
      VotingStrength.PHONE,
    );
  });

  it('QUALIFIED (eID) tier tops the ladder regardless of contact rungs', () => {
    expect(
      deriveVotingStrength({ emailVerified: true, verificationTier: VerificationTier.QUALIFIED }),
    ).toBe(VotingStrength.EID);
    expect(deriveVotingStrength({ verificationTier: VerificationTier.QUALIFIED })).toBe(
      VotingStrength.EID,
    );
  });

  it('OIB / IDENTITY tiers do not raise strength above the contact rungs', () => {
    expect(
      deriveVotingStrength({ emailVerified: true, verificationTier: VerificationTier.IDENTITY }),
    ).toBe(VotingStrength.EMAIL);
    expect(
      deriveVotingStrength({
        emailVerified: true,
        phoneVerified: true,
        verificationTier: VerificationTier.OIB,
      }),
    ).toBe(VotingStrength.PHONE);
  });
});
