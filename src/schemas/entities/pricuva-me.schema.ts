import { z } from 'zod';
import { DunningCaseStatus, DunningLevel } from '../../enums/dunning.enum';
import { uuidSchema } from '../base.schema';
import { ownerAccountUnitSchema } from './dunning.schema';

/**
 * Co-owner self-service — `GET /buildings/:id/pricuva/me`.
 *
 * The rep-facing ledger is a whole-building table; this is the one
 * screen where a co-owner sees only *their* position: what this month
 * costs, whether they are behind, and a HUB3 slip they can scan in a
 * banking app. A user may be linked to more than one owner record on
 * the building (e.g. two apartments held separately) — hence `owners[]`.
 *
 * Money is `z.number()` (see the exemption note in `dunning.schema.ts`).
 */

const periodSchema = z.string().regex(/^\d{4}-\d{2}$/);
const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

/** What the owner sees as their headline state for the current period. */
export const MyPricuvaStatus = {
  /** Charges are not configured / tracking is off — nothing to pay through Flatie yet. */
  NOT_CONFIGURED: 'not_configured',
  /** Current period fully covered, no arrears. */
  PAID: 'paid',
  /** Current period not yet covered, no older arrears. */
  OPEN: 'open',
  /** Older periods outstanding (balance > this period’s expected). */
  IN_ARREARS: 'in_arrears',
  /** Prepaid — balance is negative. */
  CREDIT: 'credit',
} as const;
export type MyPricuvaStatus = (typeof MyPricuvaStatus)[keyof typeof MyPricuvaStatus];

/** HUB3 payment slip data — enough to render the barcode and the copy rows. */
export const paymentSlipSchema = z
  .object({
    payeeName: z.string(),
    payeeIban: z.string(),
    model: z.string().describe('HR01 / HR00 / HR99'),
    reference: z.string().describe('Poziv na broj (without the model).'),
    amount: z.number(),
    description: z.string(),
    dueDate: isoDateSchema.nullable(),
    barcodePng: z.string().describe('Base64 PNG of the PDF417 barcode.'),
  })
  .meta({ id: 'PaymentSlip' });

export const myPricuvaOwnerSchema = z
  .object({
    ownerId: uuidSchema,
    ownerName: z.string(),
    paymentRefCode: z.string().nullable(),
    units: z.array(ownerAccountUnitSchema),
    period: periodSchema.describe('The current billing period (this month).'),
    expected: z.number().describe('Amount due for `period`.'),
    paidThisPeriod: z.number(),
    balance: z.number().describe('Cumulative balance; positive = owes.'),
    interestToDate: z.number(),
    status: z.enum([
      MyPricuvaStatus.NOT_CONFIGURED,
      MyPricuvaStatus.PAID,
      MyPricuvaStatus.OPEN,
      MyPricuvaStatus.IN_ARREARS,
      MyPricuvaStatus.CREDIT,
    ]),
    slip: paymentSlipSchema
      .nullable()
      .describe('Slip for this period’s expected amount. Null when not configured.'),
    balanceSlip: paymentSlipSchema
      .nullable()
      .describe('Slip for the whole outstanding balance; only when balance > expected.'),
    recentMonths: z
      .array(
        z.object({
          period: periodSchema,
          charged: z.number(),
          paid: z.number(),
        }),
      )
      .describe('Last 12 tracked periods, newest first.'),
    notices: z.array(
      z.object({
        id: uuidSchema,
        level: z.enum([DunningLevel.REMINDER, DunningLevel.FINAL_NOTICE]),
        issuedAt: z.string(),
        deadlineDate: isoDateSchema,
        totalAmount: z.number(),
      }),
    ),
    openCaseStatus: z
      .enum([
        DunningCaseStatus.OPEN,
        DunningCaseStatus.SETTLED,
        DunningCaseStatus.HANDED_TO_ENFORCEMENT,
        DunningCaseStatus.WRITTEN_OFF,
      ])
      .nullable(),
  })
  .meta({ id: 'MyPricuvaOwner' });

export const myPricuvaResponseSchema = z
  .object({
    buildingId: uuidSchema,
    trackingFrom: periodSchema.nullable(),
    owners: z.array(myPricuvaOwnerSchema),
  })
  .meta({ id: 'MyPricuvaResponse' });

export const myPricuvaSlipQuerySchema = z
  .object({
    ownerId: uuidSchema.optional().describe('Required when the user maps to several owners.'),
    period: periodSchema.optional(),
    amount: z.enum(['period', 'balance']).optional().describe('Which slip: default `period`.'),
  })
  .meta({ id: 'MyPricuvaSlipQuery' });

export type PaymentSlip = z.infer<typeof paymentSlipSchema>;
export type MyPricuvaOwner = z.infer<typeof myPricuvaOwnerSchema>;
export type MyPricuvaResponse = z.infer<typeof myPricuvaResponseSchema>;
export type MyPricuvaSlipQuery = z.infer<typeof myPricuvaSlipQuerySchema>;
