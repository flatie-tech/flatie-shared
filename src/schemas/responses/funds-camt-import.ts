import { z } from 'zod';
import { TransactionType } from '../../enums/status.enum';
import type { Strict } from './_strict';

/**
 * Row-level result for a single CAMT `<Ntry>` that was persisted as an
 * income or expense transaction. Returned in the `imported` array so
 * the UI can show exactly which rows landed where and link back to
 * them for recategorisation.
 */
const camtImportedEntrySchema = z
  .looseObject({
    transactionId: z
      .string()
      .uuid()
      .describe('UUID of the newly inserted income_transactions or expense_transactions row.'),
    type: z
      .enum([TransactionType.INCOME, TransactionType.EXPENSE])
      .describe(
        '`INCOME` when the CAMT entry was a credit (money into the fund); `EXPENSE` when it was a debit.',
      ),
    bankRef: z
      .string()
      .describe(
        'Bank-assigned unique reference (`AcctSvcrRef` from CAMT.053) used as the idempotency key. Re-importing the same file will skip rows that already have this ref.',
      ),
    amount: z.string().describe('Entry amount serialized as a decimal string (e.g. "1234.56").'),
    bookingDate: z
      .string()
      .describe('ISO-8601 date (YYYY-MM-DD) the entry was booked, taken from `BookgDt`.'),
    description: z
      .string()
      .nullable()
      .describe(
        'Unstructured remittance info (`RmtInf/Ustrd`) concatenated into a single string, or null when the entry carried none.',
      ),
  })
  .describe("One imported CAMT entry persisted to the building's fund transactions.");

/**
 * Row-level error for a CAMT entry that could not be persisted
 * (malformed amount, missing booking date, IBAN mismatch, etc.).
 * Admins use this to understand why the summary counts differ from
 * the number of `<Ntry>` blocks in the source file.
 */
const camtImportErrorSchema = z
  .looseObject({
    bankRef: z
      .string()
      .nullable()
      .describe(
        '`AcctSvcrRef` of the offending entry, or null when the entry lacked one (which itself is an error).',
      ),
    reason: z
      .string()
      .describe(
        'Human-readable explanation of why this entry was rejected. Surfaced directly in the upload-result toast.',
      ),
  })
  .describe('A CAMT entry that failed to import, with the reason.');

/**
 * Response from `POST /buildings/:buildingId/funds/import/camt`.
 * Summarises the outcome of a single CAMT.053 file upload so the
 * admin UI can render an at-a-glance result without refetching the
 * funds list.
 */
export const camtImportResponseSchema = z
  .looseObject({
    statementId: z
      .string()
      .describe(
        'Statement identifier from the CAMT `<Stmt><Id>` field, echoed back so the admin can correlate with the source file.',
      ),
    statementIban: z
      .string()
      .describe(
        'IBAN of the account the statement was issued against. Validated to match `building.iban` before any row is persisted.',
      ),
    periodFrom: z
      .string()
      .nullable()
      .describe(
        'ISO-8601 timestamp of the statement start (`FrToDt/FrDtTm`), or null when the bank omitted the period block.',
      ),
    periodTo: z
      .string()
      .nullable()
      .describe('ISO-8601 timestamp of the statement end (`FrToDt/ToDtTm`), or null.'),
    importedCount: z
      .number()
      .int()
      .nonnegative()
      .describe('Number of CAMT entries that produced a new transaction row in this call.'),
    skippedCount: z
      .number()
      .int()
      .nonnegative()
      .describe(
        'Number of CAMT entries whose `bankRef` already existed for this building (idempotent re-import).',
      ),
    errorCount: z
      .number()
      .int()
      .nonnegative()
      .describe('Number of CAMT entries that were rejected for the reasons listed in `errors`.'),
    imported: z
      .array(camtImportedEntrySchema)
      .describe('Detail rows for each newly persisted transaction.'),
    errors: z
      .array(camtImportErrorSchema)
      .describe('Detail rows for each rejected entry, matched 1:1 against `errorCount`.'),
  })
  .describe('Outcome summary for a CAMT.053 statement import.');

export type CamtImportResponse = Strict<z.infer<typeof camtImportResponseSchema>>;

/**
 * One building's outcome inside an org-wide statement import. Real
 * FINA/PBZ HUB3 exports bundle an upravitelj's whole portfolio — one
 * statement per building account — so the org import parses the file
 * once and routes each statement to the org building matching its IBAN.
 */
export const orgStatementImportResultSchema = z.object({
  buildingId: z.string().uuid().describe('Building the statements were routed to.'),
  buildingName: z.string().describe('Building display name.'),
  iban: z.string().describe('The building IBAN the statements matched on.'),
  statements: z.number().int().nonnegative().describe('Statements in the file for this account.'),
  status: z
    .enum(['imported', 'not_camt_mode'])
    .describe(
      '`imported` = entries were processed; `not_camt_mode` = the IBAN matched but the building is not in CAMT funds mode, nothing was written.',
    ),
  importedCount: z.number().int().nonnegative().describe('New transaction rows written.'),
  skippedCount: z
    .number()
    .int()
    .nonnegative()
    .describe('Entries already imported earlier (idempotent skip).'),
  errorCount: z.number().int().nonnegative().describe('Entries rejected with errors.'),
});

export const orgStatementImportResponseSchema = z
  .object({
    results: z
      .array(orgStatementImportResultSchema)
      .describe('One row per org building whose IBAN appeared in the file.'),
    unmatchedIbans: z
      .array(
        z.object({
          iban: z.string().describe('Account IBAN found in the file.'),
          statements: z.number().int().nonnegative().describe('Statements for this account.'),
          entries: z.number().int().nonnegative().describe('Transactions across those statements.'),
        }),
      )
      .describe(
        'Accounts in the file that match NO building of this organization — buildings not yet on Flatie, or with a missing/mismatched IBAN.',
      ),
  })
  .describe('Outcome of an organization-wide bank statement import.');

export type OrgStatementImportResult = Strict<z.infer<typeof orgStatementImportResultSchema>>;
export type OrgStatementImportResponse = Strict<z.infer<typeof orgStatementImportResponseSchema>>;

/**
 * Unmatched pričuva references: incoming payments that carried a
 * structured HR00/HR01 reference whose middle (unit) segment matches no
 * unit's paymentRefCode. The statement itself teaches the incumbent
 * upravitelj's numbering — the rep maps each code to a unit once and
 * past + future payments link up.
 */
export const unmatchedPricuvaRefRowSchema = z.object({
  refCode: z.string().describe('The middle (unit) segment of the reference, e.g. "183003".'),
  count: z.number().int().positive().describe('How many unmatched payments carry this code.'),
  totalAmount: z.number().describe('Σ amounts of those payments, EUR.'),
  firstPeriod: z.string().nullable().describe('Earliest reference period seen, YYYY-MM.'),
  lastPeriod: z.string().nullable().describe('Latest reference period seen, YYYY-MM.'),
  samplePayer: z
    .string()
    .nullable()
    .describe('Description of one of the payments — usually carries the payer name.'),
});

export const unmatchedPricuvaRefsResponseSchema = z
  .object({
    buildingId: z.string().uuid().describe('Building the aggregation is scoped to.'),
    rows: z.array(unmatchedPricuvaRefRowSchema).describe('One row per distinct unmatched code.'),
  })
  .describe('Aggregated unmatched pričuva reference codes for a building.');

export const mapPricuvaRefSchema = z
  .object({
    refCode: z
      .string()
      .trim()
      .regex(/^\d{1,22}$/)
      .describe('The unit segment to adopt as the unit’s paymentRefCode.'),
    unitId: z.string().uuid().describe('The unit this code belongs to.'),
  })
  .meta({ id: 'MapPricuvaRef' });

export const mapPricuvaRefResponseSchema = z
  .object({
    unitId: z.string().uuid().describe('Unit that adopted the code.'),
    refCode: z.string().describe('The adopted paymentRefCode.'),
    linkedCount: z
      .number()
      .int()
      .nonnegative()
      .describe('Previously-unmatched income rows retroactively linked to the unit.'),
  })
  .describe('Result of adopting an incumbent ref code for a unit.');

export type UnmatchedPricuvaRefsResponse = Strict<
  z.infer<typeof unmatchedPricuvaRefsResponseSchema>
>;
export type MapPricuvaRefSchema = z.infer<typeof mapPricuvaRefSchema>;
export type MapPricuvaRefResponse = Strict<z.infer<typeof mapPricuvaRefResponseSchema>>;
