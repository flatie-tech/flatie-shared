import * as z from 'zod';
import type { $ZodErrorMap } from 'zod/v4/core';

import deLocale from './de';
import enLocale from './en';
import hrLocale from './hr';

export { deLocale, enLocale, hrLocale };

type LocaleFactory = () => { localeError: $ZodErrorMap };

/**
 * Curated, user-facing locales. These override Zod's built-in maps (including
 * `en`/`de`) so validation errors read the same friendly way in every language.
 * Any language not listed here falls back to Zod's built-in `z.locales[lang]`.
 */
const CUSTOM_LOCALES: Record<string, LocaleFactory> = {
  hr: hrLocale,
  en: enLocale,
  de: deLocale,
};

export function setZodLocale(lang: string): void {
  const custom = CUSTOM_LOCALES[lang];
  if (custom) {
    z.config(custom());
    return;
  }

  const builtIn = (z.locales as Record<string, LocaleFactory | undefined>)[lang];
  if (builtIn) {
    z.config(builtIn());
  }
}
