import { beforeEach, describe, expect, it } from 'vitest';
import * as z from 'zod';
import { setZodLocale } from '../../src/locales';

/**
 * Pins the user-facing wording of the custom Zod locales (hr/en/de). These are
 * the fallback messages shown whenever a schema doesn't set its own `message`,
 * so a silent regression here degrades every un-customised form field.
 *
 * `setZodLocale` calls `z.config()`, which is global/singleton — so each block
 * sets its locale in `beforeEach` and the assertions run against that config.
 */

const firstMessage = (result: z.ZodSafeParseResult<unknown>): string => {
  if (result.success) throw new Error('expected parse to fail');
  return result.error.issues[0].message;
};

describe('custom Zod locales — friendly messages', () => {
  describe('en', () => {
    beforeEach(() => setZodLocale('en'));

    it('renders missing input as required', () => {
      expect(firstMessage(z.string().safeParse(undefined))).toBe('This field is required.');
    });

    it('renders empty required string as required', () => {
      expect(firstMessage(z.string().min(1).safeParse(''))).toBe('This field is required.');
    });

    it('renders too-short string with the min count', () => {
      expect(firstMessage(z.string().min(8).safeParse('short'))).toBe(
        'Please use at least 8 characters.',
      );
    });

    it('renders too-long string with the max count', () => {
      expect(firstMessage(z.string().max(5).safeParse('toolong'))).toBe(
        'Please use 5 characters or fewer.',
      );
    });

    it('renders invalid email', () => {
      expect(firstMessage(z.email().safeParse('nope'))).toBe('Please enter a valid email address.');
    });

    it('renders wrong type as a valid-value prompt', () => {
      expect(firstMessage(z.number().safeParse('x'))).toBe('Please enter a valid number.');
    });

    it('renders enum miss as choose-an-option', () => {
      expect(firstMessage(z.enum(['a', 'b']).safeParse('c'))).toBe('Please choose a valid option.');
    });
  });

  describe('hr', () => {
    beforeEach(() => setZodLocale('hr'));

    it('renders missing input as required', () => {
      expect(firstMessage(z.string().safeParse(undefined))).toBe('Ovo polje je obavezno.');
    });

    it('renders too-short string with the min count', () => {
      expect(firstMessage(z.string().min(8).safeParse('kratk'))).toBe('Unesite barem 8 znakova.');
    });

    it('renders invalid email', () => {
      expect(firstMessage(z.email().safeParse('nope'))).toBe('Unesite ispravnu adresu e-pošte.');
    });
  });

  describe('de', () => {
    beforeEach(() => setZodLocale('de'));

    it('renders missing input as required', () => {
      expect(firstMessage(z.string().safeParse(undefined))).toBe('Dieses Feld ist erforderlich.');
    });

    it('renders too-short string with the min count', () => {
      expect(firstMessage(z.string().min(8).safeParse('kurz'))).toBe(
        'Bitte mindestens 8 Zeichen eingeben.',
      );
    });

    it('renders invalid email', () => {
      expect(firstMessage(z.email().safeParse('nope'))).toBe(
        'Bitte eine gültige E-Mail-Adresse eingeben.',
      );
    });
  });
});
