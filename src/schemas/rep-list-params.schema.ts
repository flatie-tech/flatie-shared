import { z } from 'zod';
import { BuildingType } from '../enums/building-type.enum';
import { BuildingRole } from '../enums/role.enum';

/**
 * Query-parameter contracts for the representative list endpoints
 * (`GET /representatives/users`, `GET /representatives/buildings`).
 *
 * Extracted from the backend's local DTOs so both clients build the
 * same server-driven pagination/filter/sort requests and the backend
 * validates against the identical shape. Defaults are part of the
 * contract — changing them changes what an omitted param means.
 */

const sortOrderSchema = z.enum(['asc', 'desc']).describe('Sort direction applied to `sortBy`.');

/** Params for `GET /representatives/users`. */
export const getRepUsersParamsSchema = z.object({
  search: z.string().optional().describe('Free-text filter matched against user name and email.'),
  buildingRole: z
    .enum([
      BuildingRole.OWNER_REPRESENTATIVE,
      BuildingRole.DEPUTY_REPRESENTATIVE,
      BuildingRole.CO_OWNER,
    ])
    .optional()
    .describe('Restrict to users holding this role in at least one of the caller’s buildings.'),
  fromDate: z
    .string()
    .optional()
    .describe('Inclusive lower bound (ISO date) on the user’s earliest building-join date.'),
  toDate: z
    .string()
    .optional()
    .describe('Inclusive upper bound (ISO date) on the user’s earliest building-join date.'),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
  offset: z.coerce.number().min(0).optional().default(0),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: sortOrderSchema.optional().default('desc'),
});

/** Params for `GET /representatives/buildings`. */
export const getRepBuildingsParamsSchema = z.object({
  search: z
    .string()
    .optional()
    .describe('Free-text filter matched against building name and address.'),
  type: z
    .enum([BuildingType.RESIDENTIAL, BuildingType.COMMERCIAL, BuildingType.RESIDENTIAL_COMMERCIAL])
    .optional()
    .describe('Restrict to a single building usage type.'),
  status: z
    .string()
    .optional()
    .describe('Restrict to a building lifecycle status (`pending`, `active`, `rejected`).'),
  fromDate: z
    .string()
    .optional()
    .describe('Inclusive lower bound (ISO date) on the building creation date.'),
  toDate: z
    .string()
    .optional()
    .describe('Inclusive upper bound (ISO date) on the building creation date.'),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
  offset: z.coerce.number().min(0).optional().default(0),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: sortOrderSchema.optional().default('desc'),
});

export type GetRepUsersParams = z.infer<typeof getRepUsersParamsSchema>;
export type GetRepBuildingsParams = z.infer<typeof getRepBuildingsParamsSchema>;
