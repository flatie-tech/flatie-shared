/**
 * Pričuva collections ("naplata") — the dunning ladder a manager walks
 * when a co-owner falls behind: reminder → final notice → hand-over to
 * enforcement (ovrha). Modelled on Croatian upravitelj practice under
 * ZUOZ (NN 152/2024) čl. 52 t. 10–11: the manager collects the pričuva,
 * notifies the representative and, if needed, pursues enforcement of
 * overdue instalments.
 *
 * Levels are the letters that leave the system. Anything after
 * `final_notice` (the ovrha itself) is tracked as a case status, not a
 * letter — Flatie records that a case was handed over, it does not draft
 * enforcement filings.
 */
export const DunningLevel = {
  /** "Opomena" — first written reminder with the outstanding balance. */
  REMINDER: 'reminder',
  /** "Opomena pred ovrhu" — last notice before enforcement, with default interest. */
  FINAL_NOTICE: 'final_notice',
} as const;
export type DunningLevel = (typeof DunningLevel)[keyof typeof DunningLevel];

/**
 * A case is one owner's open collection thread on one building. At most
 * one case is `open` per owner; it closes when the balance is settled or
 * the manager decides the debt is uncollectible.
 */
export const DunningCaseStatus = {
  OPEN: 'open',
  /** Balance reached zero (or credit) — closed automatically by the nightly sweep. */
  SETTLED: 'settled',
  /** Handed to a lawyer / notary / court for ovrha; the enforcement reference is kept. */
  HANDED_TO_ENFORCEMENT: 'handed_to_enforcement',
  /** Manager decided not to pursue. The arrears stay on the ledger; only the case closes. */
  WRITTEN_OFF: 'written_off',
} as const;
export type DunningCaseStatus = (typeof DunningCaseStatus)[keyof typeof DunningCaseStatus];

/** Case statuses that terminate the thread. */
export const DUNNING_CLOSED_STATUSES: ReadonlySet<DunningCaseStatus> = new Set<DunningCaseStatus>([
  DunningCaseStatus.SETTLED,
  DunningCaseStatus.HANDED_TO_ENFORCEMENT,
  DunningCaseStatus.WRITTEN_OFF,
]);
