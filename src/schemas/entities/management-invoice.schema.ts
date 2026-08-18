import { z } from 'zod';
import { FeeModel, ManagementInvoiceStatus } from '../../enums/management-invoice.enum';
import { uuidSchema } from '../base.schema';
import { moneyStringSchema } from '../money.schema';
import { paginatedResponseSchema } from '../pagination.schema';

/**
 * Naknada upravitelja — the management firm's monthly fee invoice to a
 * building it manages. Money is the canonical two-decimal STRING (these
 * are stored `decimal` columns, not derived report figures).
 *
 * The invoice number follows Croatian practice: `{seq}/{poslovni
 * prostor}/{naplatni uređaj}`, sequence gapless per org per year. A
 * cancelled invoice keeps its number.
 */

const periodSchema = z.string().regex(/^\d{4}-\d{2}$/, 'Period must be YYYY-MM.');
const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD.');

export const feeModelSchema = z.enum([FeeModel.PER_UNIT, FeeModel.PER_SQM, FeeModel.FLAT]);
export const managementInvoiceStatusSchema = z.enum([
  ManagementInvoiceStatus.ISSUED,
  ManagementInvoiceStatus.PAID,
  ManagementInvoiceStatus.CANCELLED,
]);

export const managementInvoiceSchema = z
  .object({
    id: uuidSchema,
    orgId: uuidSchema,
    buildingId: uuidSchema,
    buildingName: z.string(),
    invoiceNumber: z.string().describe('e.g. "12/1/1"'),
    year: z.number().int(),
    period: periodSchema.describe('Service month the fee covers.'),
    issuedAt: z.string().describe('ISO timestamp.'),
    issueDate: isoDateSchema,
    dueDate: isoDateSchema,
    feeModel: feeModelSchema,
    quantity: z.string().describe('Units, m² or 1 — two decimals as string.'),
    unitPrice: moneyStringSchema,
    netAmount: moneyStringSchema,
    vatRate: z.number().describe('Percent.'),
    vatAmount: moneyStringSchema,
    grossAmount: moneyStringSchema,
    currency: z.string(),
    model: z.string().describe('HUB3 model, HR00.'),
    reference: z.string().describe('Poziv na broj: {seq}-{year}.'),
    supplierName: z.string(),
    supplierOib: z.string().nullable(),
    supplierAddress: z.string().nullable(),
    supplierIban: z.string(),
    customerName: z.string(),
    customerOib: z.string().nullable(),
    customerAddress: z.string().nullable(),
    description: z.string(),
    status: managementInvoiceStatusSchema,
    /** Derived: issued and past due. */
    isOverdue: z.boolean(),
    paidAt: z.string().nullable(),
    cancelledAt: z.string().nullable(),
    cancelReason: z.string().nullable(),
    fileId: uuidSchema.nullable().describe('Archived PDF on the building.'),
    emailSentAt: z.string().nullable(),
    eposlovanjeId: z.number().int().nullable(),
    eposlovanjeStatus: z.number().int().nullable(),
    sentToEposlovanjeAt: z.string().nullable(),
    canMarkPaid: z.boolean(),
    canCancel: z.boolean(),
    canSendEracun: z.boolean(),
  })
  .meta({ id: 'ManagementInvoice' });

export type ManagementInvoice = z.infer<typeof managementInvoiceSchema>;

export const managementInvoiceListQuerySchema = z
  .object({
    status: managementInvoiceStatusSchema.optional(),
    buildingId: uuidSchema.optional(),
    year: z.coerce.number().int().min(2000).max(2100).optional(),
    period: periodSchema.optional(),
    search: z.string().trim().max(100).optional(),
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
  })
  .meta({ id: 'ManagementInvoiceListQuery' });

export type ManagementInvoiceListQuery = z.infer<typeof managementInvoiceListQuerySchema>;

export const managementInvoiceListResponseSchema = paginatedResponseSchema(
  managementInvoiceSchema,
).meta({ id: 'ManagementInvoiceListResponse' });

export const managementInvoiceSummarySchema = z
  .object({
    issuedThisMonth: moneyStringSchema,
    openTotal: moneyStringSchema.describe('Σ gross of issued (unpaid) invoices.'),
    overdueTotal: moneyStringSchema,
    paidYtd: moneyStringSchema,
    openCount: z.number().int(),
    overdueCount: z.number().int(),
  })
  .meta({ id: 'ManagementInvoiceSummary' });

export type ManagementInvoiceSummary = z.infer<typeof managementInvoiceSummarySchema>;

// ─── Preview / issue ─────────────────────────────────────────────────

export const previewManagementInvoicesSchema = z
  .object({
    period: periodSchema,
    buildingIds: z.array(uuidSchema).max(500).optional(),
  })
  .meta({ id: 'PreviewManagementInvoices' });

export type PreviewManagementInvoicesSchema = z.infer<typeof previewManagementInvoicesSchema>;

/** Why a building cannot be invoiced for the period. */
export const InvoiceBlocker = {
  NO_FEE: 'no_fee',
  BUILDING_OIB_MISSING: 'building_oib_missing',
  ALREADY_ISSUED: 'already_issued',
  ORG_IDENTITY_INCOMPLETE: 'org_identity_incomplete',
  ZERO_QUANTITY: 'zero_quantity',
} as const;
export type InvoiceBlocker = (typeof InvoiceBlocker)[keyof typeof InvoiceBlocker];

export const managementInvoicePreviewRowSchema = z
  .object({
    buildingId: uuidSchema,
    buildingName: z.string(),
    feeModel: feeModelSchema.nullable(),
    quantity: z.string(),
    unitPrice: moneyStringSchema.nullable(),
    netAmount: moneyStringSchema,
    vatRate: z.number(),
    vatAmount: moneyStringSchema,
    grossAmount: moneyStringSchema,
    blocker: z
      .enum([
        InvoiceBlocker.NO_FEE,
        InvoiceBlocker.BUILDING_OIB_MISSING,
        InvoiceBlocker.ALREADY_ISSUED,
        InvoiceBlocker.ORG_IDENTITY_INCOMPLETE,
        InvoiceBlocker.ZERO_QUANTITY,
      ])
      .nullable(),
    existingInvoiceId: uuidSchema.nullable(),
  })
  .meta({ id: 'ManagementInvoicePreviewRow' });

export const previewManagementInvoicesResponseSchema = z
  .object({
    orgId: uuidSchema,
    period: periodSchema,
    identityComplete: z.boolean(),
    missingIdentityFields: z.array(z.string()),
    rows: z.array(managementInvoicePreviewRowSchema),
    issuableCount: z.number().int(),
    totalGross: moneyStringSchema,
  })
  .meta({ id: 'PreviewManagementInvoicesResponse' });

export type PreviewManagementInvoicesResponse = z.infer<
  typeof previewManagementInvoicesResponseSchema
>;
export type ManagementInvoicePreviewRow = z.infer<typeof managementInvoicePreviewRowSchema>;

export const issueManagementInvoicesSchema = z
  .object({
    period: periodSchema,
    buildingIds: z.array(uuidSchema).min(1).max(500),
    sendEmail: z
      .boolean()
      .optional()
      .describe('Also email the PDF to the building’s representatives.'),
  })
  .meta({ id: 'IssueManagementInvoices' });

export type IssueManagementInvoicesSchema = z.infer<typeof issueManagementInvoicesSchema>;

export const issueManagementInvoicesResponseSchema = z
  .object({
    issued: z.array(managementInvoiceSchema),
    skipped: z.array(
      z.object({ buildingId: uuidSchema, buildingName: z.string(), reason: z.string() }),
    ),
  })
  .meta({ id: 'IssueManagementInvoicesResponse' });

export type IssueManagementInvoicesResponse = z.infer<typeof issueManagementInvoicesResponseSchema>;

export const markManagementInvoicePaidSchema = z
  .object({
    paidAt: isoDateSchema.optional().describe('Defaults to today.'),
    recordExpense: z
      .boolean()
      .optional()
      .describe(
        'Also book the payment as an expense on the building (manual-mode buildings). Default true.',
      ),
  })
  .meta({ id: 'MarkManagementInvoicePaid' });

export type MarkManagementInvoicePaidSchema = z.infer<typeof markManagementInvoicePaidSchema>;

export const cancelManagementInvoiceSchema = z
  .object({
    reason: z.string().trim().min(3).max(500),
  })
  .meta({ id: 'CancelManagementInvoice' });

export type CancelManagementInvoiceSchema = z.infer<typeof cancelManagementInvoiceSchema>;

/** Building-side list (reps / co-owners see the invoices addressed to their building). */
export const buildingManagementInvoicesResponseSchema = z
  .object({
    buildingId: uuidSchema,
    orgName: z.string().nullable(),
    rows: z.array(managementInvoiceSchema),
  })
  .meta({ id: 'BuildingManagementInvoicesResponse' });

export type BuildingManagementInvoicesResponse = z.infer<
  typeof buildingManagementInvoicesResponseSchema
>;
