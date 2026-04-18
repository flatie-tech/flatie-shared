export const ApartmentRole = {
  OWNER: 'OWNER',
  TENANT: 'TENANT',
} as const;

export type ApartmentRole = (typeof ApartmentRole)[keyof typeof ApartmentRole];
