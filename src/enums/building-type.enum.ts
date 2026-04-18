export const BuildingType = {
  RESIDENTIAL: 'RESIDENTIAL',
  COMMERCIAL: 'COMMERCIAL',
  RESIDENTIAL_COMMERCIAL: 'RESIDENTIAL_COMMERCIAL',
} as const;

export type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];
