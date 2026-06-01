export const ApartmentRole = {
  OWNER: 'owner',
  TENANT: 'tenant',
} as const;

export type ApartmentRole = (typeof ApartmentRole)[keyof typeof ApartmentRole];
