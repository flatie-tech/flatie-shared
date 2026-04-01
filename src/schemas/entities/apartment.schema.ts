import { z } from 'zod';

export const apartmentRoleSchema = z.enum(['OWNER', 'TENANT']);
export type ApartmentRole = z.infer<typeof apartmentRoleSchema>;

export const apartmentUserSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable().optional(),
  roleType: apartmentRoleSchema,
  joinedAt: z.string(),
  ownershipPercentage: z.number().nullable().optional(),
});
export type ApartmentUser = z.infer<typeof apartmentUserSchema>;

export const apartmentSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  number: z.string(),
  floor: z.string().nullable().optional(),
  area: z.number().nullable().optional(),
  surnameOnDoor: z.string().nullable().optional(),
  surnameOnIntercom: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(apartmentUserSchema),
  userCount: z.number(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
});
export type Apartment = z.infer<typeof apartmentSchema>;

export const paginatedApartmentsResponseSchema = z.looseObject({
  data: z.array(apartmentSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  totalPages: z.number(),
  limit: z.number(),
  hasNextPage: z.boolean().optional(),
  hasPreviousPage: z.boolean().optional(),
});
export type PaginatedApartmentsResponse = z.infer<typeof paginatedApartmentsResponseSchema>;
