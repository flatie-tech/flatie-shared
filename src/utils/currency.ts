import { formatCurrencyByLocale } from './locale';

/**
 * Locale-aware EUR-ish currency formatting with the two normalizations the
 * apps were hand-rolling at every call site (identical copies lived in the
 * frontend's BuildingsTable + funds PDF hook and mobile's funds helpers):
 *
 *  - a literal `'€'` currency value (stored on some legacy rows) is
 *    normalized to the ISO `'EUR'` code Intl expects;
 *  - the amount is rounded to cents before formatting so float artifacts
 *    (e.g. 12.004999) don't leak into rendered totals.
 *
 * `undefined` renders as `'-'` — the table-cell convention.
 */
export function formatCurrencyEUR(
  amount: number | undefined,
  locale: string,
  currency = 'EUR',
): string {
  if (amount === undefined) return '-';
  const normalizedCurrency = currency === '€' ? 'EUR' : currency;
  const rounded = Math.round(amount * 100) / 100;
  return formatCurrencyByLocale(rounded, locale, normalizedCurrency);
}
