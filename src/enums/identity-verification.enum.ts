export const IdentityVerificationMethod = {
  PRINTED_SIGNATURE: 'PRINTED_SIGNATURE',
  CERTILIA: 'CERTILIA',
} as const;

export type IdentityVerificationMethod =
  (typeof IdentityVerificationMethod)[keyof typeof IdentityVerificationMethod];
