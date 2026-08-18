import { z } from 'zod';
import { DunningCaseStatus, DunningLevel } from '../../enums/dunning.enum';
import { uuidSchema } from '../base.schema';
import { PricuvaDeliveryChannel, PricuvaDeliveryStatus } from './pricuva-delivery.schema';

/**
 * Pričuva collections ("naplata") — owner accounts, dunning candidates,
 * cases and the notices (opomene) issued on them.
 *
 * ── Money is `z.number()` here ────────────────────────────────────────
 * Same documented exemption as `pricuva.schema.ts` and
 * `responses/building-funds-ledger.ts`: every figure in this family is
 * derived from Postgres `numeric` aggregates or read back from a
 * `decimal(12,2)` snapshot and rounded once at the boundary; nothing is
 * arithmetically round-tripped on the client. Keeping the whole pričuva
 * surface on one representation matters more than the string rule —
 * the ledger, the queue and the owner drawer render side by side.
 *
 * ── Sign convention ───────────────────────────────────────────────────
 * `balance` is POSITIVE when the owner owes (matches the ledger's
 * `balance`, opposite of its `diff`). Never mix the two.
 */

const periodSchema = z.string().regex(/^\d{4}-\d{2}$/, 'Period must be YYYY-MM.');
const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD.');

export const dunningLevelSchema = z.enum([DunningLevel.REMINDER, DunningLevel.FINAL_NOTICE]);
export const dunningCaseStatusSchema = z.enum([
  DunningCaseStatus.OPEN,
  DunningCaseStatus.SETTLED,
  DunningCaseStatus.HANDED_TO_ENFORCEMENT,
  DunningCaseStatus.WRITTEN_OFF,
]);
const deliveryChannelSchema = z.enum([
  PricuvaDeliveryChannel.EMAIL,
  PricuvaDeliveryChannel.DOWNLOAD,
]);
const deliveryStatusSchema = z.enum([
  PricuvaDeliveryStatus.SENT,
  PricuvaDeliveryStatus.SKIPPED,
  PricuvaDeliveryStatus.FAILED,
  PricuvaDeliveryStatus.GENERATED,
]);

// ─── Owner account (kartica suvlasnika) ───────────────────────────────

export const ownerAccountUnitSchema = z
  .object({
    unitId: uuidSchema,
    label: z.string().nullable(),
    kind: z.string().describe('apartment | garage | storage_unit'),
    area: z.number().nullable(),
    sharePercentage: z.number().nullable().describe('Owner’s share of this unit, 0–100.'),
  })
  .meta({ id: 'OwnerAccountUnit' });

/** One posted monthly charge and how much of it payments have covered (FIFO). */
export const ownerAccountChargeSchema = z
  .object({
    period: periodSchema,
    dueDate: isoDateSchema.describe('Payment due date printed on the slip (15th of the period).'),
    amount: z.number().describe('Charged EUR for the period.'),
    paidAmount: z.number().describe('Portion of this charge covered by payments, EUR.'),
    outstanding: z.number().describe('amount − paidAmount, EUR.'),
    settledOn: isoDateSchema
      .nullable()
      .describe('Date the charge was fully covered (payment period end), null while open.'),
    daysOverdue: z
      .number()
      .int()
      .describe('Days past dueDate as of the query date while outstanding > 0; else 0.'),
    interest: z
      .number()
      .describe('Statutory default interest accrued on the outstanding part, EUR, as of asOf.'),
  })
  .meta({ id: 'OwnerAccountCharge' });

export const ownerAccountPaymentSchema = z
  .object({
    id: uuidSchema,
    date: isoDateSchema.describe('Booking date of the payment.'),
    period: periodSchema.nullable().describe('Period the payment was attributed to.'),
    amount: z.number(),
    source: z.enum(['manual', 'camt']),
    description: z.string().nullable(),
  })
  .meta({ id: 'OwnerAccountPayment' });

export const dunningNoticeSchema = z
  .object({
    id: uuidSchema,
    caseId: uuidSchema,
    ownerId: uuidSchema,
    ownerName: z.string(),
    level: dunningLevelSchema,
    issuedAt: z.string().describe('ISO timestamp.'),
    asOfDate: isoDateSchema.describe('Balance/interest cut-off the letter was computed for.'),
    deadlineDate: isoDateSchema.describe('Payment deadline printed on the letter.'),
    principalAmount: z.number(),
    interestAmount: z.number(),
    totalAmount: z.number(),
    channel: deliveryChannelSchema,
    deliveryStatus: deliveryStatusSchema,
    deliveryReason: z.string().nullable(),
    recipientEmail: z.string().nullable(),
    fileId: uuidSchema.nullable().describe('Archived PDF (documents container), if persisted.'),
    batchId: uuidSchema,
    actorName: z.string().nullable(),
    voidedAt: z.string().nullable(),
    voidReason: z.string().nullable(),
    canVoid: z.boolean().describe('Latest live notice of an open case, and caller may manage.'),
    canResend: z.boolean(),
  })
  .meta({ id: 'DunningNotice' });

export const dunningCaseSchema = z
  .object({
    id: uuidSchema,
    buildingId: uuidSchema,
    ownerId: uuidSchema,
    ownerName: z.string(),
    linkedUserId: uuidSchema.nullable(),
    status: dunningCaseStatusSchema,
    openedAt: z.string(),
    closedAt: z.string().nullable(),
    enforcementRef: z.string().nullable().describe('Court / notary / lawyer file reference.'),
    enforcementAt: isoDateSchema.nullable(),
    note: z.string().nullable(),
    currentBalance: z.number().describe('Owner’s live balance (positive = owes).'),
    noticeCount: z.number().int().describe('Live (non-voided) notices on the case.'),
    lastNoticeLevel: dunningLevelSchema.nullable(),
    lastNoticeAt: z.string().nullable(),
    canManage: z.boolean(),
  })
  .meta({ id: 'DunningCase' });

export const ownerAccountResponseSchema = z
  .object({
    buildingId: uuidSchema,
    ownerId: uuidSchema,
    ownerName: z.string(),
    linkedUserId: uuidSchema.nullable(),
    email: z.string().nullable(),
    address: z.string().nullable(),
    paymentRefCode: z
      .string()
      .nullable()
      .describe('Owner-mode ref, or the primary apartment ref in apartment mode.'),
    units: z.array(ownerAccountUnitSchema),
    asOf: isoDateSchema,
    trackingFrom: periodSchema.nullable(),
    trackingActive: z.boolean(),
    openingBalance: z.number(),
    chargedTotal: z.number(),
    paidTotal: z.number(),
    balance: z.number().describe('opening + charged − paid; positive = owes.'),
    interestToDate: z.number(),
    interestEnabled: z.boolean(),
    interestRateNote: z
      .string()
      .nullable()
      .describe(
        'Human-readable rate provenance, e.g. "ESB 2,40 % + 3 p.b. = 5,40 % (2. pol. 2026.)".',
      ),
    charges: z.array(ownerAccountChargeSchema),
    payments: z.array(ownerAccountPaymentSchema),
    openCase: dunningCaseSchema.nullable(),
    notices: z.array(dunningNoticeSchema).describe('All notices for this owner, newest first.'),
    canManage: z.boolean().describe('Caller may issue notices / manage cases.'),
  })
  .meta({ id: 'OwnerAccountResponse' });

export const ownerAccountQuerySchema = z
  .object({
    asOf: isoDateSchema.optional().describe('Defaults to today.'),
  })
  .meta({ id: 'OwnerAccountQuery' });

// ─── Candidates (the "za opomenu" queue) ───────────────────────────────

/** Why an owner with a positive balance is not (yet) suggested for a letter. */
export const DunningHoldReason = {
  /** Collections are switched off for the building. */
  DISABLED: 'disabled',
  /** Balance below the building’s minimum debt threshold. */
  BELOW_MIN_DEBT: 'below_min_debt',
  /** Oldest unpaid charge is not yet past the reminder grace period. */
  NOT_YET_OVERDUE: 'not_yet_overdue',
  /** A reminder is out; the final-notice waiting period has not elapsed. */
  AWAITING_FINAL_WINDOW: 'awaiting_final_window',
  /** A final notice was already issued — next step is manual hand-over. */
  FINAL_ISSUED: 'final_issued',
  /** The case is closed as handed over / written off; reopen it first. */
  CASE_CLOSED: 'case_closed',
} as const;
export type DunningHoldReason = (typeof DunningHoldReason)[keyof typeof DunningHoldReason];

export const dunningCandidateSchema = z
  .object({
    ownerId: uuidSchema,
    ownerName: z.string(),
    linkedUserId: uuidSchema.nullable(),
    email: z.string().nullable(),
    unitsLabel: z.string().nullable().describe('"Stan 12 · Gar 3" — display only.'),
    balance: z.number(),
    oldestDueDate: isoDateSchema.nullable(),
    daysOverdue: z.number().int(),
    interestToDate: z.number(),
    lastBilledAt: z
      .string()
      .nullable()
      .describe('Latest `sent` uplatnica delivery to this payer, ISO; null = never emailed.'),
    neverBilled: z.boolean().describe('No delivery row of any kind exists for any charged period.'),
    caseId: uuidSchema.nullable(),
    caseStatus: dunningCaseStatusSchema.nullable(),
    lastNoticeLevel: dunningLevelSchema.nullable(),
    lastNoticeAt: z.string().nullable(),
    suggestedLevel: dunningLevelSchema
      .nullable()
      .describe('The letter the ladder would issue now; null when on hold.'),
    holdReason: z
      .enum([
        DunningHoldReason.DISABLED,
        DunningHoldReason.BELOW_MIN_DEBT,
        DunningHoldReason.NOT_YET_OVERDUE,
        DunningHoldReason.AWAITING_FINAL_WINDOW,
        DunningHoldReason.FINAL_ISSUED,
        DunningHoldReason.CASE_CLOSED,
      ])
      .nullable(),
  })
  .meta({ id: 'DunningCandidate' });

export const dunningSettingsSnapshotSchema = z
  .object({
    enabled: z.boolean(),
    reminderAfterDays: z.number().int(),
    finalAfterDays: z.number().int(),
    paymentDeadlineDays: z.number().int(),
    minDebt: z.number(),
    interestEnabled: z.boolean(),
  })
  .meta({ id: 'DunningSettingsSnapshot' });

export const dunningSummarySchema = z
  .object({
    totalOverdue: z.number().describe('Σ positive balances, EUR.'),
    debtors: z.number().int(),
    readyForNotice: z.number().int().describe('Candidates with a suggestedLevel.'),
    openCases: z.number().int(),
    inEnforcement: z.number().int(),
  })
  .meta({ id: 'DunningSummary' });

export const dunningCandidatesResponseSchema = z
  .object({
    buildingId: uuidSchema,
    asOf: isoDateSchema,
    trackingActive: z.boolean(),
    settings: dunningSettingsSnapshotSchema,
    summary: dunningSummarySchema,
    rows: z.array(dunningCandidateSchema).describe('Every owner with balance > 0, worst first.'),
    canManage: z.boolean(),
  })
  .meta({ id: 'DunningCandidatesResponse' });

export const dunningCandidatesQuerySchema = z
  .object({
    asOf: isoDateSchema.optional(),
  })
  .meta({ id: 'DunningCandidatesQuery' });

// ─── Issuing ──────────────────────────────────────────────────────────

export const issueDunningNoticesSchema = z
  .object({
    ownerIds: z.array(uuidSchema).min(1).max(200),
    channel: deliveryChannelSchema.describe(
      'email = send each letter to the owner; download = produce a ZIP the manager distributes.',
    ),
    asOfDate: isoDateSchema.optional().describe('Balance/interest cut-off; defaults to today.'),
    overrideNeverBilled: z
      .boolean()
      .optional()
      .describe('Issue even to owners the register shows were never billed. Recorded on the case.'),
    note: z.string().trim().max(500).optional(),
  })
  .meta({ id: 'IssueDunningNotices' });

export type IssueDunningNoticesSchema = z.infer<typeof issueDunningNoticesSchema>;

export const issueDunningNoticesResponseSchema = z
  .object({
    batchId: uuidSchema,
    channel: deliveryChannelSchema,
    issued: z.array(
      z.object({
        ownerId: uuidSchema,
        noticeId: uuidSchema,
        level: dunningLevelSchema,
        totalAmount: z.number(),
        deliveryStatus: deliveryStatusSchema,
        deliveryReason: z.string().nullable(),
      }),
    ),
    skipped: z.array(
      z.object({
        ownerId: uuidSchema,
        ownerName: z.string(),
        reason: z.string().describe('Machine reason: never_billed | not_eligible | no_email | …'),
      }),
    ),
  })
  .meta({ id: 'IssueDunningNoticesResponse' });

export const voidDunningNoticeSchema = z
  .object({
    reason: z.string().trim().min(3).max(500),
  })
  .meta({ id: 'VoidDunningNotice' });

export const updateDunningCaseSchema = z
  .object({
    status: z.enum([
      DunningCaseStatus.OPEN,
      DunningCaseStatus.HANDED_TO_ENFORCEMENT,
      DunningCaseStatus.WRITTEN_OFF,
    ]),
    enforcementRef: z.string().trim().max(120).nullable().optional(),
    enforcementAt: isoDateSchema.nullable().optional(),
    note: z.string().trim().max(1000).nullable().optional(),
  })
  .meta({ id: 'UpdateDunningCase' });

export type UpdateDunningCaseSchema = z.infer<typeof updateDunningCaseSchema>;

// ─── Lists ────────────────────────────────────────────────────────────

export const dunningCasesQuerySchema = z
  .object({
    status: dunningCaseStatusSchema.optional(),
  })
  .meta({ id: 'DunningCasesQuery' });

export const dunningCasesResponseSchema = z
  .object({
    buildingId: uuidSchema,
    rows: z.array(dunningCaseSchema),
  })
  .meta({ id: 'DunningCasesResponse' });

export const dunningCaseDetailResponseSchema = dunningCaseSchema
  .extend({
    notices: z.array(dunningNoticeSchema),
  })
  .meta({ id: 'DunningCaseDetailResponse' });

export const dunningNoticesQuerySchema = z
  .object({
    level: dunningLevelSchema.optional(),
    ownerId: uuidSchema.optional(),
    includeVoided: z.coerce.boolean().optional(),
    issuedFrom: isoDateSchema.optional(),
    issuedTo: isoDateSchema.optional(),
    batchId: uuidSchema.optional(),
  })
  .meta({ id: 'DunningNoticesQuery' });

export const dunningNoticesResponseSchema = z
  .object({
    buildingId: uuidSchema,
    rows: z.array(dunningNoticeSchema),
  })
  .meta({ id: 'DunningNoticesResponse' });

export type OwnerAccountUnit = z.infer<typeof ownerAccountUnitSchema>;
export type OwnerAccountCharge = z.infer<typeof ownerAccountChargeSchema>;
export type OwnerAccountPayment = z.infer<typeof ownerAccountPaymentSchema>;
export type OwnerAccountResponse = z.infer<typeof ownerAccountResponseSchema>;
export type DunningNotice = z.infer<typeof dunningNoticeSchema>;
export type DunningCase = z.infer<typeof dunningCaseSchema>;
export type DunningCandidate = z.infer<typeof dunningCandidateSchema>;
export type DunningSummary = z.infer<typeof dunningSummarySchema>;
export type DunningSettingsSnapshot = z.infer<typeof dunningSettingsSnapshotSchema>;
export type DunningCandidatesResponse = z.infer<typeof dunningCandidatesResponseSchema>;
export type IssueDunningNoticesResponse = z.infer<typeof issueDunningNoticesResponseSchema>;
export type DunningCasesResponse = z.infer<typeof dunningCasesResponseSchema>;
export type DunningCaseDetailResponse = z.infer<typeof dunningCaseDetailResponseSchema>;
export type DunningNoticesResponse = z.infer<typeof dunningNoticesResponseSchema>;
export type DunningNoticesQuery = z.infer<typeof dunningNoticesQuerySchema>;
export type DunningCasesQuery = z.infer<typeof dunningCasesQuerySchema>;
