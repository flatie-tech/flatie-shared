import { describe, expect, it } from 'vitest';
import { formatCurrency, formatText, getDateRange } from '../../src/utils';

describe('Utility Functions', () => {
  describe('formatText', () => {
    it('should convert SCREAMING_SNAKE_CASE to Title Case', () => {
      expect(formatText('CAN_EDIT_BUILDING')).toBe('Can Edit Building');
    });

    it('should convert snake_case to Title Case', () => {
      expect(formatText('hello_world')).toBe('Hello World');
    });

    it('should handle single word', () => {
      expect(formatText('ADMIN')).toBe('Admin');
    });
  });

  describe('formatCurrency', () => {
    it('should format number as EUR by default', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('1');
      expect(result).toContain('234');
      expect(result).toContain('56');
    });

    it('should format with custom currency', () => {
      const result = formatCurrency(1234.56, 'en-US', 'USD');
      expect(result).toContain('$');
    });
  });

  describe('getDateRange', () => {
    it('should return same date for today filter', () => {
      const result = getDateRange('today');
      expect(result.fromDate).toBe(result.toDate);
    });

    it('should return date in yyyy-MM-dd format', () => {
      const result = getDateRange('today');
      expect(result.fromDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should return different dates for week filter', () => {
      const result = getDateRange('week');
      expect(result.fromDate).not.toBe(result.toDate);
    });
  });
});
