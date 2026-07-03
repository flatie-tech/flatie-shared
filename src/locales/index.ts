import * as z from 'zod';
import type { $ZodErrorMap } from 'zod/v4/core';

import hrLocale from './hr';

export { hrLocale };

export function setZodLocale(lang: string): void {
  if (lang === 'hr') {
    z.config(hrLocale());
    return;
  }

  const builtIn = (z.locales as Record<string, (() => { localeError: $ZodErrorMap }) | undefined>)[
    lang
  ];
  if (builtIn) {
    z.config(builtIn());
  }
}
