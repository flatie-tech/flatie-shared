import { describe, expect, it } from 'vitest';
import { createExpenseSchema, createIncomeSchema } from '../../src/schemas/entities';
import { moneyStringSchema, signedMoneyStringSchema } from '../../src/schemas/money.schema';
import {
  addMoney,
  formatMoney,
  fromCents,
  moneyEquals,
  normalizeMoney,
  subtractMoney,
  sumMoney,
  toCents,
} from '../../src/utils/money';

describe('money primitives (integer cents, exact)', () => {
  it('round-trips value ↔ cents', () => {
    expect(toCents('250.50')).toBe(25050);
    expect(toCents('250.5')).toBe(25050);
    expect(toCents('250')).toBe(25000);
    expect(toCents(250.5)).toBe(25050);
    expect(toCents('-42')).toBe(-4200);
    expect(fromCents(25050)).toBe('250.50');
    expect(fromCents(-4200)).toBe('-42.00');
    expect(fromCents(5)).toBe('0.05');
  });

  it('sums exactly where floats would drift', () => {
    // 0.1 + 0.2 === 0.30000000000000004 as floats; exact here.
    expect(sumMoney(['0.10', '0.20'])).toBe('0.30');
    // 10 × 0.1 === 0.9999999999999999 as a running float sum; exact here.
    expect(sumMoney(Array.from({ length: 10 }, () => '0.10'))).toBe('1.00');
    expect(sumMoney([])).toBe('0.00');
    expect(addMoney('250.50', '0.05')).toBe('250.55');
    expect(subtractMoney('100.00', '250.50')).toBe('-150.50');
  });

  it('normalizes + compares', () => {
    expect(normalizeMoney('7')).toBe('7.00');
    expect(normalizeMoney(7.1)).toBe('7.10');
    expect(moneyEquals('7.00', 7)).toBe(true);
    expect(moneyEquals('7.00', '7.01')).toBe(false);
  });

  it('rejects invalid money values', () => {
    expect(() => toCents('12.999')).toThrow();
    expect(() => toCents('abc')).toThrow();
  });

  it('formatMoney renders null/undefined/"" as "-" and delegates otherwise', () => {
    const fmt = (n: number, ccy: string) => `${ccy} ${n.toFixed(2)}`;
    expect(formatMoney(null, fmt)).toBe('-');
    expect(formatMoney(undefined, fmt)).toBe('-');
    expect(formatMoney('', fmt)).toBe('-');
    expect(formatMoney('250.50', fmt)).toBe('EUR 250.50');
    expect(formatMoney('250.50', fmt, '€')).toBe('EUR 250.50'); // €→EUR
  });
});

describe('money Zod schemas', () => {
  it('moneyStringSchema accepts string|number, outputs canonical string', () => {
    expect(moneyStringSchema.parse('250.5')).toBe('250.50');
    expect(moneyStringSchema.parse(250.5)).toBe('250.50');
    expect(moneyStringSchema.parse('0')).toBe('0.00');
  });

  it('moneyStringSchema rejects negatives, >2 decimals, over-max', () => {
    expect(moneyStringSchema.safeParse('-1').success).toBe(false);
    expect(moneyStringSchema.safeParse('1.999').success).toBe(false);
    expect(moneyStringSchema.safeParse('100000000').success).toBe(false);
  });

  it('signedMoneyStringSchema allows negatives', () => {
    expect(signedMoneyStringSchema.parse('-42').valueOf()).toBe('-42.00');
  });

  it('income/expense create schemas emit amount as a canonical string', () => {
    const cat = '11111111-1111-4111-8111-111111111111';
    expect(createIncomeSchema.parse({ amount: 250.5 }).amount).toBe('250.50');
    expect(createExpenseSchema.parse({ categoryId: cat, amount: '120' }).amount).toBe('120.00');
  });
});
