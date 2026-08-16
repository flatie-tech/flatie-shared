import { describe, expect, it } from 'vitest';
import * as rootBarrel from '../src/index';

/**
 * Every barrel in this package lists its re-exports **explicitly** (no
 * `export *` inside `constants/`, `schemas/requests/`, `schemas/responses/`).
 * That is deliberate — it keeps the public surface reviewable — but it means a
 * new export is only reachable by consumers once it has been added by hand at
 * *every* level, and forgetting one fails at consumer runtime rather than here.
 *
 * That has now happened twice: `emailUnreadCountResponseSchema` (missing from
 * both schema barrels) and `featureFlagKeys` / `platformFeatureKeys` (defined in
 * `constants/query-keys.ts`, never listed in `constants/index.ts`). Both built,
 * type-checked, published, and only surfaced as `undefined` in a consumer.
 *
 * So: walk the leaf modules and assert each value export is reachable from the
 * root barrel — the entry point consumers actually import. A gap at any
 * intermediate level fails this test.
 *
 * Type-only exports don't exist in a runtime namespace, so they aren't covered.
 * A missing `export type` is a consumer compile error, which is loud already;
 * a missing value export is a silent `undefined`, which is not.
 */

const leafModules = import.meta.glob<Record<string, unknown>>(
  [
    '../src/constants/*.ts',
    '../src/enums/*.ts',
    // `entities/` was missing until 2026-08-16, which is why `ConversationType`
    // — a const object re-exported from the entities barrel with `export type`
    // — shipped as `undefined` at runtime while type-checking as a value.
    '../src/schemas/entities/*.ts',
    '../src/schemas/requests/*.ts',
    '../src/schemas/responses/*.ts',
    '../src/utils/*.ts',
  ],
  { eager: true },
);

/** Barrels and private helpers — nothing here is meant to be a leaf. */
const SKIP = /\/(index|_[^/]+)\.ts$/;

describe('root barrel reachability', () => {
  const entries = Object.entries(leafModules).filter(([path]) => !SKIP.test(path));

  it('covers a meaningful number of modules (glob patterns still match)', () => {
    // Guards against the globs silently matching nothing after a move — the
    // test would otherwise "pass" while checking zero files.
    expect(entries.length).toBeGreaterThan(50);
  });

  // Some exports are re-exported under a different name on purpose — e.g.
  // `locale.ts`'s `formatDate` is `formatDateByLocale` at the root, to keep the
  // flat namespace unambiguous. So a name miss isn't conclusive: fall back to
  // asking whether the *value* is reachable under any name. That still catches
  // a genuine drop while accepting an intentional rename.
  const rootValues = new Set(Object.values(rootBarrel as Record<string, unknown>));

  it.each(entries)('%s — every value export is reachable from the root barrel', (_path, mod) => {
    const missing = Object.entries(mod)
      .filter(([name]) => name !== 'default')
      .filter(([name, value]) => !(name in rootBarrel) && !rootValues.has(value))
      .map(([name]) => name);

    expect(missing).toEqual([]);
  });
});
