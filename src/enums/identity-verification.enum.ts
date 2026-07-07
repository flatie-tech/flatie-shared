export const IdentityVerificationMethod = {
  PRINTED_SIGNATURE: 'printed_signature',
  CERTILIA: 'certilia',
  KYC_VENDOR: 'kyc_vendor',
  OIB_SELF_DECLARED: 'oib_self_declared',
} as const;

export type IdentityVerificationMethod =
  (typeof IdentityVerificationMethod)[keyof typeof IdentityVerificationMethod];

/**
 * Durable per-user identity assurance level. Numeric ordinals so building
 * policy can compare with `>=` and the value stores as a smallint.
 *
 * Grounded in Croatian ZUOZ (NN 152/2024) Čl. 40, which accepts consent
 * "with proof of identity OR a qualified electronic signature":
 *  - IDENTITY (2) satisfies the "dokaz identiteta" limb,
 *  - QUALIFIED (3) is the eID/QES limb.
 */
export const VerificationTier = {
  /** Account exists, email verified. No identity claim. */
  UNVERIFIED: 0,
  /** OIB self-declared, checksum-valid, unique. Data quality only. */
  OIB: 1,
  /** One-time identity proof (KYC doc+liveness, bank-level, or rep-attested signature). */
  IDENTITY: 2,
  /** eID / qualified electronic signature (Certilia). Legally binding equivalence. */
  QUALIFIED: 3,
} as const;

export type VerificationTier = (typeof VerificationTier)[keyof typeof VerificationTier];

/** Map a verification method to the durable tier it confers. */
export function methodToTier(method: IdentityVerificationMethod): VerificationTier {
  switch (method) {
    case IdentityVerificationMethod.CERTILIA:
      return VerificationTier.QUALIFIED;
    case IdentityVerificationMethod.PRINTED_SIGNATURE:
    case IdentityVerificationMethod.KYC_VENDOR:
      return VerificationTier.IDENTITY;
    case IdentityVerificationMethod.OIB_SELF_DECLARED:
      return VerificationTier.OIB;
    default:
      return VerificationTier.UNVERIFIED;
  }
}
