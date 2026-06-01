export const BuildingType = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  RESIDENTIAL_COMMERCIAL: 'residential_commercial',
} as const;

export type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];
