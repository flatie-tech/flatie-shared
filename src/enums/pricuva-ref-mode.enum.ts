/**
 * How the building expects co-owners to address their pričuva payments
 * in the HR01 poziv-na-broj reference.
 *
 * - `apartment`: the middle reference segment is the apartment's
 *   `paymentRefCode` (e.g. `015-001-202604`). All co-owners of the
 *   apartment are credited proportionally to their ownership share.
 * - `owner`: the middle segment is the co-owner's own `paymentRefCode`
 *   on the building (e.g. `015-001-202604` where `001` is Ivan
 *   Horvat). Payments are credited directly to that owner.
 *
 * The mode is a per-building choice set by the representative; CAMT
 * imports branch on it when matching references to units or owners.
 */
export const PricuvaRefMode = {
  APARTMENT: 'apartment',
  OWNER: 'owner',
} as const;

export type PricuvaRefMode = (typeof PricuvaRefMode)[keyof typeof PricuvaRefMode];
