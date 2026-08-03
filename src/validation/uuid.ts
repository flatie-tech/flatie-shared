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
