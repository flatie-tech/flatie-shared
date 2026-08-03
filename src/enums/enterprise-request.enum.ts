/**
 * Lifecycle of an inbound "request enterprise pricing" lead.
 *
 * Before this existed the request was only an email to info@flatie.hr, so
 * there was no queue, no dedupe and no way to tell a fulfilled request from a
 * forgotten one.
 */
export const EnterpriseRequestStatus = {
  OPEN: 'open',
  CONTACTED: 'contacted',
  /** A negotiated subscription price has been set for the entity. */
  FULFILLED: 'fulfilled',
  DISMISSED: 'dismissed',
} as const;

export type EnterpriseRequestStatus =
  (typeof EnterpriseRequestStatus)[keyof typeof EnterpriseRequestStatus];
