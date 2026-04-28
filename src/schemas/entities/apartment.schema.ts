import { z } from 'zod';
import { ApartmentRole } from '../../enums/apartment-role.enum';

export const apartmentRoleSchema = z
  .enum([ApartmentRole.OWNER, ApartmentRole.TENANT])
  .describe('`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.');

export const apartmentUserSchema = z.looseObject({
  id: z.string(),
  name: z.string().describe('Display name of the apartment member.'),
  email: z.string().describe('Contact email of the apartment member.'),
  image: z
    .string()
    .nullable()
    .optional()
    .describe('Absolute URL to the member’s profile image; null when none is set.'),
  roleType: apartmentRoleSchema.describe(
    'Relationship of this user to the apartment (`OWNER` or `TENANT`).',
  ),
  joinedAt: z.string().describe('ISO-8601 timestamp when the user was attached to the apartment.'),
  ownershipPercentage: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Share of the apartment held by this user, 0–100. Null for tenants and for owners whose share has not been recorded.',
    ),
});
export type ApartmentUser = z.infer<typeof apartmentUserSchema>;

export const apartmentSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  number: z
    .string()
    .describe('Apartment identifier as used by residents and mail (e.g. "12A", "3.5").'),
  paymentRefCode: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Apartment code used as the middle segment of the HR01 poziv-na-broj in `apartment` ref mode. Auto-assigned on create (sequential per building, zero-padded e.g. `001`); editable. Null is allowed on legacy rows that pre-date the column.',
    ),
  floor: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Floor label where the apartment is located (e.g. "1", "Ground", "Basement"); null when not recorded.',
    ),
  area: z
    .number()
    .nullable()
    .optional()
    .describe('Floor area in square metres; null when not recorded.'),
  surnameOnDoor: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Surname displayed on the apartment door, used for deliveries; null when not provided.',
    ),
  surnameOnIntercom: z
    .string()
    .nullable()
    .optional()
    .describe('Surname listed on the building intercom; null when not provided.'),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z
    .array(apartmentUserSchema)
    .describe('Owners and tenants currently attached to the apartment.'),
  userCount: z.number().describe('Total number of users linked to this apartment.'),
  canEdit: z.boolean().describe('True when the calling user may edit this apartment’s metadata.'),
  canDelete: z.boolean().describe('True when the calling user may delete this apartment.'),
});
export type Apartment = z.infer<typeof apartmentSchema>;

export const paginatedApartmentsResponseSchema = z.looseObject({
  data: z.array(apartmentSchema).describe('Apartments on the current page, ordered as requested.'),
  count: z
    .number()
    .optional()
    .describe('Total number of apartments matching the query across all pages.'),
  page: z.number().optional().describe('Current page number, 1-indexed.'),
  totalPages: z.number().describe('Total number of pages available for this query.'),
  limit: z.number().describe('Maximum number of items returned per page.'),
  hasNextPage: z
    .boolean()
    .optional()
    .describe('True when at least one more page follows the current one.'),
  hasPreviousPage: z
    .boolean()
    .optional()
    .describe('True when at least one page precedes the current one.'),
});
export type PaginatedApartmentsResponse = z.infer<typeof paginatedApartmentsResponseSchema>;
