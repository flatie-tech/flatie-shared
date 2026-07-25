import { VerificationTier } from './identity-verification.enum';

/**
 * How strongly a voter's account is verified — the ladder a building's
 * `minVotingStrengthForConsensus` floor is measured against.
 *
 * Distinct from {@link VerificationTier}: strength is about the *account*
 * (contact + identity confirmation a co-owner has completed), not about the
 * evidence attached to a single ballot. Rep-recorded paper votes sit outside
 * this ladder entirely — they are attested by the representative and are never
 * gated by the floor.
 *
 * Numeric with gaps so future rungs (declared OIB, ID-card number, …) can slot
 * between existing ones without renumbering. Stored as a smallint, compared
 * with `>=`.
 */
export const VotingStrength = {
  /** No verified contact — cannot vote online. */
  NONE: 0,
  /** Verified e-mail address (the default floor — every active account). */
  EMAIL: 10,
  /** Verified e-mail + SMS-verified mobile number. */
  PHONE: 20,
  /** eID / qualified electronic signature (Certilia-verified account). */
  EID: 30,
} as const;

export type VotingStrength = (typeof VotingStrength)[keyof typeof VotingStrength];

/**
 * Derive a user's current voting strength from account state.
 *
 * `verificationTier` is the user's durable {@link VerificationTier}; only
 * QUALIFIED (eID) raises strength above the contact rungs — OIB/IDENTITY
 * are identity-proof concepts that don't (yet) map to a rung of their own.
 */
export function deriveVotingStrength(user: {
  emailVerified?: boolean | null;
  phoneVerified?: boolean | null;
  verificationTier?: number | null;
}): VotingStrength {
  if ((user.verificationTier ?? 0) >= VerificationTier.QUALIFIED) return VotingStrength.EID;
  if (user.phoneVerified && user.emailVerified) return VotingStrength.PHONE;
  if (user.emailVerified) return VotingStrength.EMAIL;
  return VotingStrength.NONE;
}
