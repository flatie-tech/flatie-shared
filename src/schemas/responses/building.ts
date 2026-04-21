import { z } from 'zod';
import { BuildingStatus } from '../../enums/building-status.enum';
import { buildingTypeSchema } from '../entities/building.schema';
import { paginatedResponseSchema } from '../pagination.schema';

const buildingStatusSchema = z
  .enum(Object.values(BuildingStatus) as [string, ...string[]])
  .describe(
    'Building lifecycle status — reflects where the building is in the platform onboarding pipeline (pending approval, active, rejected, etc.).',
  );

const buildingManagerSchema = z
  .looseObject({
    name: z.string().describe('Display name of the assigned management-firm contact.'),
    email: z.string().describe('Contact email for the assigned manager.'),
  })
  .describe('Summary of the building’s assigned management-firm contact.');

const buildingRepresentativeSchema = z
  .looseObject({
    id: z.string().describe('UUID of the user who holds the representative role.'),
    name: z.string().describe('Representative display name.'),
    email: z.string().describe('Representative contact email.'),
    phone: z
      .string()
      .optional()
      .nullable()
      .describe('Contact phone in E.164 format, or null when the representative has not set one.'),
  })
  .describe(
    'Building representative (owner or deputy) nested inside building detail responses.',
  );

const buildingFundsSchema = z
  .looseObject({
    currentBalance: z
      .string()
      .describe(
        'Current building-fund balance, serialized as a decimal string (e.g. "27820.54") to preserve precision from the numeric column.',
      ),
    currency: z
      .string()
      .describe('ISO-4217-ish currency symbol or code displayed alongside the balance (e.g. "€").'),
  })
  .describe('Summary of the building’s current fund balance and currency.');

/**
 * Building summary response — shape returned from the paginated
 * list endpoints (`GET /buildings`, admin building lists).
 */
export const buildingResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string().describe('Building display name.'),
  address: z.string().describe('Full postal address of the building.'),
  coverImage: z
    .string()
    .optional()
    .nullable()
    .describe('Absolute URL of the cover photo, or null when no cover image is set.'),
  type: buildingTypeSchema.describe(
    'Usage type: `RESIDENTIAL`, `COMMERCIAL`, or `RESIDENTIAL_COMMERCIAL`.',
  ),
  status: buildingStatusSchema.optional(),
  totalUnits: z
    .number()
    .describe('Declared number of individual units (apartments, garages, storage units).'),
  isStratified: z
    .boolean()
    .describe(
      'True when the building is stratified (each unit has its own title deed), affecting voting weight calculations.',
    ),
  houseRulesFileUrl: z
    .string()
    .nullable()
    .optional()
    .describe('Absolute URL to the uploaded house-rules PDF, or null if none has been uploaded.'),
  createdBy: z
    .string()
    .uuid()
    .optional()
    .nullable()
    .describe('UUID of the user who registered the building on the platform.'),
  createdAt: z.string().describe('ISO-8601 timestamp when the building record was created.'),
  updatedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
});

/**
 * Building detail response — full shape returned from
 * `GET /buildings/:buildingId`.
 */
export const buildingDetailResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string().describe('Building display name.'),
  address: z.string().describe('Full postal address of the building.'),
  coverImage: z
    .string()
    .nullable()
    .optional()
    .describe('Absolute URL of the cover photo, or null when no cover image is set.'),
  type: buildingTypeSchema.describe(
    'Usage type: `RESIDENTIAL`, `COMMERCIAL`, or `RESIDENTIAL_COMMERCIAL`.',
  ),
  totalUnits: z.number().describe('Declared number of individual units in the building.'),
  isStratified: z
    .boolean()
    .describe(
      'True when the building is stratified (per-unit title deeds), affecting voting weight.',
    ),
  houseRulesFileUrl: z
    .string()
    .nullable()
    .optional()
    .describe('Absolute URL to the uploaded house-rules PDF, or null when none has been uploaded.'),
  numberOfFloors: z
    .number()
    .nullable()
    .optional()
    .describe('Floor count above ground, or null when the information is not set.'),
  description: z
    .string()
    .nullable()
    .optional()
    .describe('Free-form description shown on the building page; null when not provided.'),
  latitude: z
    .number()
    .nullable()
    .optional()
    .describe('Geographic latitude in decimal degrees (WGS 84); null when geocoding not performed.'),
  longitude: z
    .number()
    .nullable()
    .optional()
    .describe('Geographic longitude in decimal degrees (WGS 84); null when geocoding not performed.'),
  createdBy: z.string().describe('UUID of the user who registered the building.'),
  createdAt: z.string().describe('ISO-8601 timestamp when the building record was created.'),
  updatedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
  manager: buildingManagerSchema
    .nullable()
    .optional()
    .describe(
      'Assigned management-firm contact, or null when the building has no manager assigned.',
    ),
  funds: buildingFundsSchema
    .nullable()
    .optional()
    .describe('Current fund balance summary, or null when funds have not been initialised.'),
  ownerRepresentatives: z
    .array(buildingRepresentativeSchema)
    .default([])
    .describe('Users with the owner-representative role for this building.'),
  deputyRepresentatives: z
    .array(buildingRepresentativeSchema)
    .default([])
    .describe('Users with the deputy-representative role, if any.'),
});

export const paginatedBuildingsResponseSchema = paginatedResponseSchema(buildingResponseSchema);

export type BuildingResponse = z.infer<typeof buildingResponseSchema>;
export type BuildingDetailResponse = z.infer<typeof buildingDetailResponseSchema>;
export type PaginatedBuildingsResponse = z.infer<typeof paginatedBuildingsResponseSchema>;
