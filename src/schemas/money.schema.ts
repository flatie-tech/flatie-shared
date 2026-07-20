import { z } from 'zod';
import { normalizeMoney } from '../utils/money';

/**
 * Canonical monetary field schemas. Money is a two-decimal string end to end.
 *
 * Both schemas accept a string OR a number on the way in (so a client that has
 * not yet migrated off `number` payloads still validates during the transition)
 * and always OUTPUT the canonical `"N.NN"` string. Backends type their
 * `decimal` columns against these; clients parse responses through them.
 */

/** Non-negative amount, up to `decimal(10,2)` (max 99,999,999.99). */
export const moneyStringSchema = z
  .union([z.string(), z.number()])
  .transform((v) => (typeof v === 'number' ? v.toString() : v.trim()))
  .pipe(
    z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, 'must be a non-negative amount with at most 2 decimals')
      .refine((s) => Number(s) <= 99_999_999.99, 'amount exceeds the maximum of 99,999,999.99')
      .transform((s) => normalizeMoney(s)),
  );

/** Signed balance, up to `decimal(12,2)` — may be negative (overdrawn fund). */
export const signedMoneyStringSchema = z
  .union([z.string(), z.number()])
  .transform((v) => (typeof v === 'number' ? v.toString() : v.trim()))
  .pipe(
    z
      .string()
      .regex(/^-?\d+(\.\d{1,2})?$/, 'must be an amount with at most 2 decimals')
      .refine((s) => Math.abs(Number(s)) <= 9_999_999_999.99, 'balance exceeds the maximum')
      .transform((s) => normalizeMoney(s)),
  );

export type MoneyString = z.infer<typeof moneyStringSchema>;
