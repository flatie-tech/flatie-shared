import { z } from 'zod';

/**
 * Branded UUID string.
 *
 * A plain `string` that TypeScript treats as distinct from an ordinary string
 * thanks to the `__brand` phantom field. Consumers can opt in to stricter
 * typing at boundary points (URL builders, DB query helpers) without breaking
 * any of the existing signatures that still accept `string`.
 *
 * The brand exists only at compile time; at runtime a `UuidString` is an
 * ordinary string with no extra properties.
 */
export type UuidString = string & { readonly __brand: 'UuidString' };

/**
 * Zod schema that parses any input into a `UuidString`. Convenient when a
 * schema field needs to carry the brand into the inferred type.
 */
export const uuidStringSchema = z
  .string()
  .uuid('Must be a valid UUID')
  .transform((value): UuidString => value as UuidString);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Type guard — narrows `string` to `UuidString` in a conditional branch.
 *
 * @example
 *   if (isUuid(id)) {
 *     // id: UuidString here
 *     API_ROUTES.BUILDINGS.BY_ID(id);
 *   }
 */
export function isUuid(value: string): value is UuidString {
  return UUID_RE.test(value);
}

/**
 * Assert-cast: returns the input as `UuidString` if valid, throws otherwise.
 *
 * @example
 *   const buildingId = toUuid(req.params.id); // throws 422 if invalid
 *
 * @throws {Error} when the input is not a valid UUID.
 */
export function toUuid(value: string): UuidString {
  if (!UUID_RE.test(value)) {
    throw new Error(`Expected a valid UUID, got: ${value}`);
  }
  return value as UuidString;
}

/**
 * Cast-without-check. Use ONLY when the source is a constant known to be a
 * valid UUID (e.g. a hard-coded fixture in tests). Never use on untrusted
 * input — that's what `toUuid` is for.
 */
export function unsafeUuid(value: string): UuidString {
  return value as UuidString;
}
