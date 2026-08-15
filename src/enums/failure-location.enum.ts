export const FailureLocationType = {
  COMMON_AREA: 'common_area',
  OWN_UNIT: 'own_unit',
} as const;

export type FailureLocationType = (typeof FailureLocationType)[keyof typeof FailureLocationType];

export const FailureUnitType = {
  APARTMENT: 'apartment',
  GARAGE: 'garage',
  STORAGE_UNIT: 'storage_unit',
} as const;

export type FailureUnitType = (typeof FailureUnitType)[keyof typeof FailureUnitType];

/**
 * Who paid for the repair — "financirano od" on the report.
 *
 * Bookkeeping only: recording `pricuva` here does NOT move money or create a
 * fund transaction, it just says where the money came from so residents can
 * read the record. Fund movements live in expense_transactions.
 */
export const FailureFundingSource = {
  /** Building reserve fund (pričuva). */
  PRICUVA: 'pricuva',
  /** Covered by an insurance claim (osiguranje). */
  OSIGURANJE: 'osiguranje',
  /** Paid by an individual co-owner (suvlasnik). */
  SUVLASNIK: 'suvlasnik',
  /** Anything else (ostalo). */
  OSTALO: 'ostalo',
} as const;

export type FailureFundingSource = (typeof FailureFundingSource)[keyof typeof FailureFundingSource];
