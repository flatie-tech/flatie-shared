/**
 * Usage classification for a physical unit (apartment, garage, or
 * storage). Drives split pričuva rates — a building can carry a
 * residential rate per m² and a commercial rate per m², and expected
 * contributions are computed per-unit against the matching rate.
 *
 * Added late; existing rows default to `residential` via backfill.
 */
export const UnitType = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
} as const;

export type UnitType = (typeof UnitType)[keyof typeof UnitType];
