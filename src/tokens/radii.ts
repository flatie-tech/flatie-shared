/**
 * Border radius tokens. Frontend's `@theme inline` derives sm/md/lg/xl from
 * this base via `calc(var(--radius) ± Xpx)` — mobile can mirror or define its
 * own scale.
 */

export const radii = {
  radius: '0.625rem',
} as const;

export type RadiusTokenName = keyof typeof radii;
