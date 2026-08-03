/**
 * Deprecated: the voting-method toggles are no longer enforced — consensus
 * voting is governed by `minVotingStrengthForConsensus` (see
 * `enums/voting-strength.enum.ts`), and rep-recorded paper votes are always
 * available. Kept only so old mobile builds keep type-checking; remove with
 * the toggles in a future release.
 */

export const VOTING_METHOD_SETTINGS = [
  'votingCertiliaEnabled',
  'votingPrintedSignatureEnabled',
] as const;

export type VotingMethodSetting = (typeof VOTING_METHOD_SETTINGS)[number];

export type VotingMethodState = Record<VotingMethodSetting, boolean>;

/**
 * Resolve the voting-method state a patch would produce, falling back
 * to the current state for fields the patch leaves untouched.
 */
export function resolveVotingMethods(
  current: VotingMethodState,
  patch: Partial<VotingMethodState>,
): VotingMethodState {
  return {
    votingCertiliaEnabled: patch.votingCertiliaEnabled ?? current.votingCertiliaEnabled,
    votingPrintedSignatureEnabled:
      patch.votingPrintedSignatureEnabled ?? current.votingPrintedSignatureEnabled,
  };
}
