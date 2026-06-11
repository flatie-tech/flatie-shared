import { z } from 'zod';
import { BuildingStatus } from '../../enums/building-status.enum';
import { FundsSource } from '../../enums/funds-source.enum';
import { PricuvaRefMode } from '../../enums/pricuva-ref-mode.enum';
import { buildingTypeSchema } from '../entities/building.schema';
import { paginatedResponseSchema } from '../pagination.schema';
import type { Strict } from './_strict';

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
  .describe('Building representative (owner or deputy) nested inside building detail responses.');

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
  slug: z
    .string()
    .nullable()
    .optional()
    .describe('URL-friendly slug derived from the building address.'),
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
  status: buildingStatusSchema
    .optional()
    .describe(
      'Platform onboarding status (`pending`, `active`, `rejected`). Optional on list ' +
        'responses where all buildings returned are known-active.',
    ),
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
  iban: z
    .string()
    .nullable()
    .optional()
    .describe('IBAN of the building fund bank account, or null when unset.'),
  oib: z
    .string()
    .nullable()
    .optional()
    .describe('Croatian tax ID (OIB) of the building, or null when unset.'),
  houseNumber: z
    .string()
    .nullable()
    .optional()
    .describe('Street/house number, or null when not set.'),
  billingBuildingCode: z
    .string()
    .nullable()
    .optional()
    .describe('Building identifier used in HR01 poziv-na-broj references, or null until assigned.'),
  monthlyFeePerSqm: z
    .number()
    .nullable()
    .optional()
    .describe('Monthly residential pričuva rate in EUR per m², or null when not configured.'),
  monthlyFeeCommercialPerSqm: z
    .number()
    .nullable()
    .optional()
    .describe('Monthly commercial pričuva rate in EUR per m², or null when not configured.'),
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
  slug: z
    .string()
    .nullable()
    .optional()
    .describe('URL-friendly slug derived from the building address.'),
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
    .describe(
      'Geographic latitude in decimal degrees (WGS 84); null when geocoding not performed.',
    ),
  longitude: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Geographic longitude in decimal degrees (WGS 84); null when geocoding not performed.',
    ),
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
  iban: z
    .string()
    .nullable()
    .optional()
    .describe(
      'IBAN of the building fund bank account, or null when unset. Required on the building before a CAMT.053 import can match statements to this building.',
    ),
  oib: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Croatian tax ID (OIB) of the building (Zajednica suvlasnika), or null when unset. Used as the payee OIB on generated uplatnicas.',
    ),
  houseNumber: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Street/house number as stored on the building row. Address data only — the HR01 reference uses `billingBuildingCode`.',
    ),
  fundsSource: z
    .enum([FundsSource.MANUAL, FundsSource.CAMT])
    .optional()
    .describe(
      'Current funding-entry mode for this building. `manual` = representatives add income/expense through the UI; `camt` = platform admin ingests CAMT.053 XML statements and manual writes are blocked.',
    ),
  monthlyFeePerSqm: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Monthly RESIDENTIAL pričuva rate in EUR per m² of owned residential area. Null when not yet configured.',
    ),
  monthlyFeeCommercialPerSqm: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Monthly COMMERCIAL pričuva rate in EUR per m² of owned commercial area. Null when the building has no commercial units or the rate has not been configured.',
    ),
  hasResidentialUnits: z
    .boolean()
    .optional()
    .describe(
      'True when the building has at least one unit (apartment/garage/storage) with `type = residential`. Lets the UI decide whether to show the residential rate input.',
    ),
  hasCommercialUnits: z
    .boolean()
    .optional()
    .describe(
      'True when the building has at least one unit (apartment/garage/storage) with `type = commercial`. Lets the UI decide whether to show the commercial rate input.',
    ),
  apartmentResidentialCoef: z
    .number()
    .optional()
    .describe('Multiplier on the residential rate for apartment areas. Defaults to 1.'),
  apartmentCommercialCoef: z
    .number()
    .optional()
    .describe('Multiplier on the commercial rate for apartment areas. Defaults to 1.'),
  garageResidentialCoef: z
    .number()
    .optional()
    .describe('Multiplier on the residential rate for garage areas. Defaults to 1.'),
  garageCommercialCoef: z
    .number()
    .optional()
    .describe('Multiplier on the commercial rate for garage areas. Defaults to 1.'),
  storageResidentialCoef: z
    .number()
    .optional()
    .describe('Multiplier on the residential rate for storage areas. Defaults to 1.'),
  storageCommercialCoef: z
    .number()
    .optional()
    .describe('Multiplier on the commercial rate for storage areas. Defaults to 1.'),
  billingBuildingCode: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Building identifier used as the first segment of HR01 poziv-na-broj references. Null until the managing org assigns one.',
    ),
  pricuvaRefMode: z
    .enum([PricuvaRefMode.APARTMENT, PricuvaRefMode.OWNER])
    .optional()
    .describe(
      'Which middle-segment identifier the HR01 poziv-na-broj uses: `apartment` (per-apartment code) or `owner` (per-co-owner code).',
    ),
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

export type BuildingResponse = Strict<z.infer<typeof buildingResponseSchema>>;
export type BuildingDetailResponse = Strict<z.infer<typeof buildingDetailResponseSchema>>;
export type PaginatedBuildingsResponse = Strict<z.infer<typeof paginatedBuildingsResponseSchema>>;
