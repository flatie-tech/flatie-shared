/**
 * GDPR data-subject-access-request (DSAR) handling.
 *
 * Flatie's DPO works these from the platform console; before that they lived
 * as uncommitted markdown files (see flatie-backend/docs/runbooks/dsar.md).
 */

/** The right the data subject is exercising (GDPR Arts. 15–21). */
export const DsarRequestType = {
  /** Art. 15 — access / copy of the data held. */
  ACCESS: 'access',
  /** Art. 16 — correction of inaccurate data. */
  RECTIFICATION: 'rectification',
  /** Art. 17 — erasure ("right to be forgotten"). */
  ERASURE: 'erasure',
  /** Art. 18 — restriction of processing. */
  RESTRICTION: 'restriction',
  /** Art. 20 — machine-readable export for transfer elsewhere. */
  PORTABILITY: 'portability',
  /** Art. 21 — objection to processing. */
  OBJECTION: 'objection',
} as const;

export type DsarRequestType = (typeof DsarRequestType)[keyof typeof DsarRequestType];

export const DsarRequestStatus = {
  RECEIVED: 'received',
  IN_PROGRESS: 'in_progress',
  /** Blocked on the subject — e.g. awaiting identity verification. */
  AWAITING_SUBJECT: 'awaiting_subject',
  FULFILLED: 'fulfilled',
  /** Lawfully refused (Art. 12(5)) — the reason belongs in the resolution note. */
  REFUSED: 'refused',
  CANCELLED: 'cancelled',
} as const;

export type DsarRequestStatus = (typeof DsarRequestStatus)[keyof typeof DsarRequestStatus];

/** Statuses that close a request and stop the SLA clock. */
export const DSAR_CLOSED_STATUSES: readonly DsarRequestStatus[] = [
  DsarRequestStatus.FULFILLED,
  DsarRequestStatus.REFUSED,
  DsarRequestStatus.CANCELLED,
];

/** Art. 12(3) — one month to respond. */
export const DSAR_SLA_DAYS = 30;

/** Art. 12(3) allows a further two months for complex requests. */
export const DSAR_MAX_EXTENSION_DAYS = 60;

/**
 * How long a CLOSED request is retained before the nightly sweep purges it.
 * Basis: Art. 5(2) accountability + the limitation period for legal claims.
 */
export const DSAR_RETENTION_YEARS = 3;
