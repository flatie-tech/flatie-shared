import { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { BUILDING_LIMITS, buildingTypeSchema } from './building.schema';

/**
 * Org-level AI building import: upload the founding documents
 * (međuvlasnički ugovor, ZK izvadak, upravitelj tables) for a building
 * that does not exist on Flatie yet. Extraction returns the building's
 * own metadata alongside the unit/owner rows; the admin reviews it,
 * confirms the address, and one commit creates the building under the
 * organization and imports everything.
 */

/** Building-level metadata the model read out of the documents. */
export const orgAiImportBuildingSchema = z.object({
  name: z.string().nullable().describe('Building name/label as the documents call it, or null.'),
  address: z
    .string()
    .nullable()
    .describe('Street + house number as written in the documents, or null.'),
  city: z.string().nullable().describe('City/settlement, or null.'),
  postalCode: z.string().nullable().describe('Postal code, or null.'),
  oib: z.string().nullable().describe('OIB of the co-owners association if stated, or null.'),
  iban: z.string().nullable().describe('Pričuva account IBAN if stated, or null.'),
});

/** One address-registry candidate for the extracted free-text address. */
export const orgAiImportAddressCandidateSchema = z.object({
  addressId: uuidSchema.describe('Registry address UUID, usable directly on commit.'),
  fullAddress: z.string().describe('Rendered "Street 12, 10000 Zagreb" form for display.'),
});

export const orgAiImportExtractResponseSchema = z
  .object({
    extractionId: uuidSchema.describe(
      'Handle for the cached extraction; pass to commit. Expires after an hour.',
    ),
    building: orgAiImportBuildingSchema,
    addressCandidates: z
      .array(orgAiImportAddressCandidateSchema)
      .describe('Registry matches for the extracted address, best first; may be empty.'),
    unitCount: z.number().int().nonnegative().describe('Units found in the documents.'),
    ownerCount: z.number().int().nonnegative().describe('Owner entries found across units.'),
    pagesProcessed: z.number().int().nonnegative().describe('OCR pages consumed.'),
    extractionWarnings: z
      .array(z.string())
      .describe('Model ambiguity notes + server-side extraction warnings, reviewer-facing.'),
  })
  .meta({ id: 'OrgAiImportExtractResponse' });

export const orgAiImportCommitSchema = z.object({
  extractionId: uuidSchema.describe('The extraction to commit.'),
  name: z
    .string()
    .trim()
    .min(BUILDING_LIMITS.NAME_MIN)
    .max(BUILDING_LIMITS.NAME_MAX)
    .describe('Confirmed building name.'),
  addressId: uuidSchema
    .optional()
    .describe('Confirmed registry address (one of the candidates, or user-searched).'),
  streetId: uuidSchema
    .optional()
    .describe('Street UUID when no addressId — pairs with houseNumber.'),
  houseNumber: z
    .string()
    .trim()
    .min(1)
    .max(BUILDING_LIMITS.HOUSE_NUMBER_MAX)
    .optional()
    .describe('House number when no addressId.'),
  type: buildingTypeSchema,
  oib: z
    .string()
    .regex(/^\d{11}$/)
    .optional()
    .nullable()
    .describe('Confirmed association OIB; omit/null to skip.'),
  iban: z
    .string()
    .trim()
    .max(34)
    .optional()
    .nullable()
    .describe('Confirmed pričuva IBAN; omit/null to skip.'),
});

export type OrgAiImportCommitSchema = z.infer<typeof orgAiImportCommitSchema>;

export const orgAiImportSkippedRowSchema = z.object({
  unitLabel: z.string().describe('Label of the row that could not be imported.'),
  errors: z.array(z.string()).describe('Why the row was skipped (reviewer-facing, Croatian).'),
});

export const orgAiImportCommitResponseSchema = z
  .object({
    buildingId: uuidSchema.describe('The created building.'),
    unitsCreated: z.number().int().nonnegative().describe('Units created by the import.'),
    ownersCreated: z.number().int().nonnegative().describe('Owner records created.'),
    assignmentsCreated: z
      .number()
      .int()
      .nonnegative()
      .describe('Owner↔unit assignments (with shares) created.'),
    skippedRows: z
      .array(orgAiImportSkippedRowSchema)
      .describe(
        'Extracted rows that failed validation and were left out — fix them on the building afterwards.',
      ),
  })
  .meta({ id: 'OrgAiImportCommitResponse' });

export type OrgAiImportBuilding = z.infer<typeof orgAiImportBuildingSchema>;
export type OrgAiImportExtractResponse = z.infer<typeof orgAiImportExtractResponseSchema>;
export type OrgAiImportCommitResponse = z.infer<typeof orgAiImportCommitResponseSchema>;
