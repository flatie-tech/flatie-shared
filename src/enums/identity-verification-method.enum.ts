/**
 * How a CONSENSUS poll vote's identity was established. Stored on
 * `poll_votes.identity_verification_method` so the artefact behind the
 * row is reproducible after the fact.
 *
 * - `CERTILIA_OIDC`: voter completed the Certilia eID OAuth flow and
 *   the qualifying claims (OIB, signed JWT, full userinfo payload) are
 *   persisted on the row.
 * - `PRINTED_SIGNATURE`: voter downloaded a pre-filled ballot PDF,
 *   signed it on paper, and re-uploaded the scan. A representative
 *   approved the upload before the vote was counted.
 */
export const IdentityVerificationMethod = {
  CERTILIA_OIDC: 'certilia_oidc',
  PRINTED_SIGNATURE: 'printed_signature',
} as const;

export type IdentityVerificationMethod =
  (typeof IdentityVerificationMethod)[keyof typeof IdentityVerificationMethod];
