// Main entry point for @flatie/shared package

// Address value-object. Named exports only — the house-number helpers it
// re-exports for subpath cohesion already flow through './utils'; a star
// export here would make those names ambiguous in the root barrel.
export type {
  AddressDisplayProps,
  AddressSearchResult,
  AddressValue,
  ExistingBuildingRef,
  MapUrlInput,
  StructuredAddressInput,
} from './address';
export {
  addressSearchResultSchema,
  buildMapUrl,
  compareHouseNumbers,
  existingBuildingRefSchema,
  structuredAddressInputSchema,
} from './address';
// Constants (Query keys, etc.)
export * from './constants';

// Enums
export * from './enums';

// Error codes
export * from './errors';

// Schemas
export * from './schemas';
// Test IDs
export * from './test-ids';
// Tokens (design tokens: colors, themes, radii)
export * from './tokens';
// Types
export * from './types';
// URLs (API route constants)
export * from './urls';
// Utilities
export * from './utils';
// Validation helpers
export * from './validation';
