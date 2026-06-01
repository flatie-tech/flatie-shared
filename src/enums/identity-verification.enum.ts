export const IdentityVerificationMethod = {
  PRINTED_SIGNATURE: 'printed_signature',
  CERTILIA: 'certilia',
} as const;

export type IdentityVerificationMethod =
  (typeof IdentityVerificationMethod)[keyof typeof IdentityVerificationMethod];
