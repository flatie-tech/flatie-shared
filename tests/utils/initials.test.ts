import { describe, expect, it } from 'vitest';
import { getInitials } from '../../src/utils/initials';

describe('getInitials', () => {
  it('takes the first letter of the first two words, uppercased', () => {
    expect(getInitials('Ana Barić')).toBe('AB');
    expect(getInitials('ivan horvat mlađi')).toBe('IH');
  });

  it('single word yields a single initial', () => {
    expect(getInitials('ana')).toBe('A');
  });

  it('empty string yields empty string', () => {
    expect(getInitials('')).toBe('');
  });

  it('collapses repeated spaces without crashing (undefined parts skipped by join)', () => {
    // 'Ana  Barić' splits into ['Ana', '', 'Barić'] — part[0] of '' is
    // undefined; String.join renders undefined as '' → still 'AB'.
    expect(getInitials('Ana  Barić')).toBe('AB');
  });
});
