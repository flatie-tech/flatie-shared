import { describe, expect, it } from 'vitest';
import { formatCurrencyEUR } from '../../src/utils/currency';

describe('formatCurrencyEUR', () => {
  it('formats EUR for a Croatian locale', () => {
    const out = formatCurrencyEUR(1234.5, 'hr');
    expect(out).toContain('1.234,50');
    expect(out).toContain('€');
  });

  it('normalizes a literal € currency value to EUR', () => {
    expect(formatCurrencyEUR(10, 'hr', '€')).toBe(formatCurrencyEUR(10, 'hr', 'EUR'));
  });

  it('rounds to cents before formatting', () => {
    expect(formatCurrencyEUR(12.004999, 'en')).toBe(formatCurrencyEUR(12, 'en'));
    expect(formatCurrencyEUR(12.005001, 'en')).toBe(formatCurrencyEUR(12.01, 'en'));
  });

  it('renders undefined as the dash placeholder', () => {
    expect(formatCurrencyEUR(undefined, 'hr')).toBe('-');
  });
});
