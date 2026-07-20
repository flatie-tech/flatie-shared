/**
 * Decimal-string money primitives.
 *
 * Money is represented as a canonical two-decimal string (`"250.50"`) end to
 * end — DB `decimal` columns, API payloads, and client state — and NEVER as a
 * JavaScript `number`. All arithmetic goes through integer cents so no IEEE-754
 * float error can ever touch a monetary value.
 *
 * Why: summing floats (`0.1 + 0.2 = 0.30000000000000004`) silently corrupts
 * totals as a ledger grows. Parsing each value to cents, doing integer math,
 * and formatting back is exact for the whole supported range.
 */

/** Parse a decimal-string / number money value to an integer number of cents. */
export function toCents(money: string | number): number {
  const s = typeof money === 'number' ? money.toString() : money.trim();
  if (!/^-?\d+(\.\d{1,2})?$/.test(s)) {
    throw new Error(`Invalid money value: ${JSON.stringify(money)}`);
  }
  const negative = s.startsWith('-');
  const [whole, frac = ''] = s.replace('-', '').split('.');
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, '0'));
  return negative ? -cents : cents;
}

/** Format an integer number of cents back to a canonical `"N.NN"` string. */
export function fromCents(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(Math.trunc(cents));
  return `${sign}${Math.floor(abs / 100)}.${(abs % 100).toString().padStart(2, '0')}`;
}

/** Normalize any money input to the canonical `"N.NN"` string. */
export function normalizeMoney(money: string | number): string {
  return fromCents(toCents(money));
}

/** Exact sum of money values → canonical string. Empty list → `"0.00"`. */
export function sumMoney(values: Array<string | number>): string {
  return fromCents(values.reduce<number>((acc, v) => acc + toCents(v), 0));
}

/** Exact `a + b` → canonical string. */
export function addMoney(a: string | number, b: string | number): string {
  return fromCents(toCents(a) + toCents(b));
}

/** Exact `a - b` → canonical string. */
export function subtractMoney(a: string | number, b: string | number): string {
  return fromCents(toCents(a) - toCents(b));
}

/** True when the two money values are numerically equal. */
export function moneyEquals(a: string | number, b: string | number): boolean {
  return toCents(a) === toCents(b);
}

/**
 * Locale-aware display of a money value. Accepts the canonical string (or a
 * number / null / undefined for tolerance during the migration). `null` /
 * `undefined` render as `'-'` (the table-cell convention). Delegates the actual
 * Intl formatting to the caller-provided formatter so this module stays free of
 * locale dependencies.
 */
export function formatMoney(
  money: string | number | null | undefined,
  format: (amount: number, currency: string) => string,
  currency = 'EUR',
): string {
  if (money === null || money === undefined || money === '') return '-';
  // Single conversion of an exact ≤2dp value to a Number is lossless for the
  // supported range; only *summation* of floats corrupts, which never happens
  // here — callers sum via sumMoney/addMoney on strings.
  return format(toCents(money) / 100, currency === '€' ? 'EUR' : currency);
}
