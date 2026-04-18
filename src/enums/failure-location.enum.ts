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
