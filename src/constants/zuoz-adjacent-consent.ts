/**
 * ZUOZ čl. 33, 34, 35 — consensus categories that require:
 *   - building-wide electorate (all co-owners vote)
 *   - strictly more than 2/3 of total ownership shares voting "za"
 *   - unanimous approval from owners of all selected adjacent units
 *
 * These categories use scoped units to track adjacent (dodirne) units,
 * but unlike standard unit-scoped polls, the electorate is NOT restricted
 * to those units — the entire building participates.
 */
export const ZUOZ_ADJACENT_CONSENT_CATEGORIES = [
  'noisyActivityConsent', // čl. 33. st. 2.
  'shortTermRentalConsent', // čl. 34. st. 1.
  'multiPersonRentalConsent', // čl. 35. st. 1.
] as const;

export type ZuozAdjacentConsentCategory = (typeof ZUOZ_ADJACENT_CONSENT_CATEGORIES)[number];

export function isZuozAdjacentConsentCategory(
  category: string | null | undefined,
): category is ZuozAdjacentConsentCategory {
  return (
    category != null &&
    ZUOZ_ADJACENT_CONSENT_CATEGORIES.includes(category as ZuozAdjacentConsentCategory)
  );
}
