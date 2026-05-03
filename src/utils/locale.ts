/**
 * Locale utilities — shared across web, mobile, and backend so app-locale
 * codes (e.g. `'hr'`, `'en'`, `'de'` from i18n libraries) consistently map
 * to BCP-47 strings consumed by `Intl.*`.
 *
 * Pure functions only — no React, no next-intl, no platform globals. Web
 * wraps these in a hook (see flatie-frontend `useLocaleDateFormat`); mobile
 * and backend call them directly.
 */

/**
 * Maps short application-locale codes to the BCP-47 strings expected by
 * `Intl.DateTimeFormat` / `Intl.NumberFormat`. Add a key here when adding
 * a new app language.
 */
export const LOCALE_MAP: Record<string, string> = {
  hr: 'hr-HR',
  de: 'de-DE',
  en: 'en-US',
};

const DEFAULT_LOCALE = 'en-US';

/**
 * Resolve a short app-locale code to a BCP-47 locale, falling back to
 * `en-US` when the code is unknown. Accepts `undefined` so callers can
 * pass an optional locale through without a separate guard.
 */
export function getDateLocale(appLocale: string | undefined | null): string {
  if (!appLocale) return DEFAULT_LOCALE;
  return LOCALE_MAP[appLocale] ?? DEFAULT_LOCALE;
}

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const DEFAULT_DATETIME_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

/**
 * Format a date using `Intl.DateTimeFormat`. `locale` accepts either a
 * short app code (`'hr'`) or an explicit BCP-47 string (`'hr-HR'`); the
 * function normalises via `getDateLocale`.
 */
export function formatDate(
  date: Date | string | number,
  locale: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_OPTIONS,
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(getDateLocale(locale), options).format(dateObj);
}

/**
 * Format a date with date + time fields. Convenience wrapper used by
 * notification templates and chat timestamps.
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATETIME_OPTIONS,
): string {
  return formatDate(date, locale, options);
}

/**
 * Format a number as currency. `locale` accepts either a short app code
 * or an explicit BCP-47 string. Currency defaults to EUR — Flatie's
 * primary market is Croatia (€).
 */
export function formatCurrencyByLocale(amount: number, locale: string, currency = 'EUR'): string {
  return new Intl.NumberFormat(getDateLocale(locale), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
