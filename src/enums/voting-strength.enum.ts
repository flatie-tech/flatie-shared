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
  /** Verified e-mail + rep-approved ID-card number (broj osobne iskaznice). */
  ID_CARD: 15,
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
 * QUALIFIED (eID) raises strength above the contact rungs. ID_CARD sits
 * between EMAIL and PHONE — a rep-approved ID-card number that proves the
 * voter's identity without requiring phone verification or eID.
 */
export function deriveVotingStrength(user: {
  emailVerified?: boolean | null;
  phoneVerified?: boolean | null;
  idCardVerified?: boolean | null;
  verificationTier?: number | null;
}): VotingStrength {
  if ((user.verificationTier ?? 0) >= VerificationTier.QUALIFIED) return VotingStrength.EID;
  if (user.phoneVerified && user.emailVerified) return VotingStrength.PHONE;
  if (user.idCardVerified && user.emailVerified) return VotingStrength.ID_CARD;
  if (user.emailVerified) return VotingStrength.EMAIL;
  return VotingStrength.NONE;
}
