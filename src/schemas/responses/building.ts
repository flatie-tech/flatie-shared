import { z } from 'zod';
import { BuildingStatus } from '../../enums/building-status.enum';
import { buildingTypeSchema } from '../entities/building.schema';
import { paginatedResponseSchema } from '../pagination.schema';

const buildingStatusSchema = z.enum(Object.values(BuildingStatus) as [string, ...string[]]);

const buildingManagerSchema = z.looseObject({
  name: z.string(),
  email: z.string(),
});

const buildingRepresentativeSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
});

const buildingFundsSchema = z.looseObject({
  currentBalance: z.string(),
  currency: z.string(),
});

/**
 * Building summary response — shape returned from the paginated
 * list endpoints (`GET /buildings`, admin building lists).
 */
export const buildingResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  coverImage: z.string().optional().nullable(),
  type: buildingTypeSchema,
  status: buildingStatusSchema.optional(),
  totalUnits: z.number(),
  isStratified: z.boolean(),
  houseRulesFileUrl: z.string().nullable().optional(),
  createdBy: z.string().uuid().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
});

/**
 * Building detail response — full shape returned from
 * `GET /buildings/:buildingId`.
 */
export const buildingDetailResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  coverImage: z.string().nullable().optional(),
  type: buildingTypeSchema,
  totalUnits: z.number(),
  isStratified: z.boolean(),
  houseRulesFileUrl: z.string().nullable().optional(),
  numberOfFloors: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  manager: buildingManagerSchema.nullable().optional(),
  funds: buildingFundsSchema.nullable().optional(),
  ownerRepresentatives: z.array(buildingRepresentativeSchema).default([]),
  deputyRepresentatives: z.array(buildingRepresentativeSchema).default([]),
});

export const paginatedBuildingsResponseSchema = paginatedResponseSchema(buildingResponseSchema);

export type BuildingResponse = z.infer<typeof buildingResponseSchema>;
export type BuildingDetailResponse = z.infer<typeof buildingDetailResponseSchema>;
export type PaginatedBuildingsResponse = z.infer<typeof paginatedBuildingsResponseSchema>;
