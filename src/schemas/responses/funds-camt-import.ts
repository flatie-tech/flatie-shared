import { z } from 'zod';
import { TransactionType } from '../../enums/status.enum';

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

export type CamtImportResponse = z.infer<typeof camtImportResponseSchema>;
