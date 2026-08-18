/**
 * Naknada upravitelja — the management firm's monthly fee to each
 * building it manages, invoiced through Flatie.
 */

/** How the contract prices the fee. Amounts are EUR excl. VAT, per month. */
export const FeeModel = {
  /** `feeAmount` × billable units (apartments + commercial units). */
  PER_UNIT: 'per_unit',
  /** `feeAmount` × Σ unit area (m²). */
  PER_SQM: 'per_sqm',
  /** `feeAmount` per building per month. */
  FLAT: 'flat',
} as const;
export type FeeModel = (typeof FeeModel)[keyof typeof FeeModel];

/**
 * Invoice lifecycle. `overdue` is derived (issued + past due), never stored.
 * A cancelled invoice keeps its number — Croatian numbering is a gapless
 * sequence, so cancellation is a state, not a deletion.
 */
export const ManagementInvoiceStatus = {
  ISSUED: 'issued',
  PAID: 'paid',
  CANCELLED: 'cancelled',
} as const;
export type ManagementInvoiceStatus =
  (typeof ManagementInvoiceStatus)[keyof typeof ManagementInvoiceStatus];
