/**
 * Voting-method last-method-lock invariant.
 *
 * Buildings offer one or more voting paths on CONSENSUS polls
 * (`voting_<method>_enabled` flags in building settings). At least one
 * method must stay enabled at all times — otherwise consensus polls
 * would have no way to collect binding votes.
 *
 * The backend settings service is the enforcement authority (it
 * rejects a patch that would disable the last method). These helpers
 * give clients the same check so the UI can lock the final toggle
 * instead of letting the user hit a server error.
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

/**
 * True when applying `patch` on top of `current` would disable every
 * voting method — i.e. the patch violates the last-method-lock and the
 * backend will reject it.
 */
export function violatesVotingMethodLock(
  current: VotingMethodState,
  patch: Partial<VotingMethodState>,
): boolean {
  const next = resolveVotingMethods(current, patch);
  return VOTING_METHOD_SETTINGS.every((field) => !next[field]);
}

/**
 * True when `method` is the only voting method currently enabled —
 * the UI should render its toggle locked (disabling it would violate
 * the invariant).
 */
export function isLastEnabledVotingMethod(
  current: VotingMethodState,
  method: VotingMethodSetting,
): boolean {
  if (!current[method]) return false;
  return VOTING_METHOD_SETTINGS.every((field) => field === method || !current[field]);
}
