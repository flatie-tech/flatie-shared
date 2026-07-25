import { z } from 'zod';
import { paginatedResponseSchema } from '../pagination.schema';

/**
 * Unified building unit. Replaces the former apartment / garage /
 * storage-unit triplet — one table, one schema, a `kind` discriminant.
 * `label` is the land-registry-style identifier residents use
 * (e.g. "ST 3448", "GR 364", "12A").
 */
export const UNIT_KINDS = ['apartment', 'garage', 'storage_unit'] as const;
export type UnitKind = (typeof UNIT_KINDS)[number];

export const unitKindSchema = z
  .enum(UNIT_KINDS)
  .describe('What the unit physically is: `apartment`, `garage`, or `storage_unit`.');

export const unitSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  kind: unitKindSchema,
  label: z
    .string()
    .describe(
      'Unit identifier as used by residents and the land registry (e.g. "ST 3448", "GR 364", "12A").',
    ),
  floor: z
    .string()
    .nullable()
    .optional()
    .describe('Floor label (e.g. "1", "PR", "POD", "POT"); null when not recorded.'),
  area: z
    .number()
    .nullable()
    .optional()
    .describe('Floor area in square metres; null when not recorded.'),
  type: z
    .enum(['residential', 'commercial'])
    .optional()
    .describe('Usage classification — drives the pričuva rate coefficient.'),
  paymentRefCode: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Code used as the middle segment of the HR01 poziv-na-broj in unit ref mode. Auto-assigned on create for apartments; null elsewhere.',
    ),
  surnameOnDoor: z
    .string()
    .nullable()
    .optional()
    .describe('Surname shown on the door plate; apartments only, null otherwise.'),
  surnameOnIntercom: z
    .string()
    .nullable()
    .optional()
    .describe('Surname shown on the intercom; apartments only, null otherwise.'),
  canEdit: z
    .boolean()
    .optional()
    .describe('True when the calling user may edit this unit (management gate).'),
  canDelete: z
    .boolean()
    .optional()
    .describe('True when the calling user may archive this unit (management gate).'),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
});
export type Unit = z.infer<typeof unitSchema>;

export const paginatedUnitsResponseSchema = paginatedResponseSchema(unitSchema);
export type PaginatedUnitsResponse = z.infer<typeof paginatedUnitsResponseSchema>;

/** Create/update requests. `kind` is create-only (a garage never becomes an apartment). */
export const createUnitSchema = z.object({
  kind: unitKindSchema,
  label: z.string().trim().min(1).max(50),
  floor: z.string().trim().max(50).optional().nullable(),
  area: z.coerce.number().positive().max(100000).optional().nullable(),
  type: z.enum(['residential', 'commercial']).optional(),
  paymentRefCode: z.string().trim().max(22).optional().nullable(),
  surnameOnDoor: z.string().trim().max(100).optional().nullable(),
  surnameOnIntercom: z.string().trim().max(100).optional().nullable(),
});
export type CreateUnitInput = z.infer<typeof createUnitSchema>;

export const updateUnitSchema = createUnitSchema.omit({ kind: true }).partial();
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>;
