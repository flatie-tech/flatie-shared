/**
 * How a building's fund transactions are populated.
 *
 * - `MANUAL` — representatives record income/expense by hand through the
 *   regular funds UI. Default for all new buildings.
 * - `CAMT` — funds are ingested from the bank's CAMT.053 XML statements
 *   by a platform admin; manual add/edit endpoints return 403 while the
 *   building is in this mode. Switching back to `MANUAL` is allowed and
 *   leaves prior CAMT-sourced rows intact.
 */
export const FundsSource = {
  MANUAL: 'manual',
  CAMT: 'camt',
} as const;

export type FundsSource = (typeof FundsSource)[keyof typeof FundsSource];

/**
 * Per-row provenance on income/expense transactions. Mirrors
 * `FundsSource` but is applied at the transaction level so the UI can
 * render a source badge and so CAMT re-imports can dedupe against
 * `bankRef`.
 */
export const TransactionSource = {
  MANUAL: 'manual',
  CAMT: 'camt',
} as const;

export type TransactionSource = (typeof TransactionSource)[keyof typeof TransactionSource];
