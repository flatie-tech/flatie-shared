import { describe, expect, it } from 'vitest';
import { BACKEND_ERROR_CODES, isBackendErrorCode } from '../../src/errors';

describe('BACKEND_ERROR_CODES', () => {
  it('values match their keys', () => {
    for (const [key, value] of Object.entries(BACKEND_ERROR_CODES)) {
      expect(key).toBe(value);
    }
  });

  it('contains core auth codes', () => {
    expect(BACKEND_ERROR_CODES.EMAIL_NOT_VERIFIED).toBe('EMAIL_NOT_VERIFIED');
    expect(BACKEND_ERROR_CODES.INVALID_CREDENTIALS).toBe('INVALID_CREDENTIALS');
    expect(BACKEND_ERROR_CODES.TOKEN_EXPIRED).toBe('TOKEN_EXPIRED');
    expect(BACKEND_ERROR_CODES.SESSION_EXPIRED).toBe('SESSION_EXPIRED');
    expect(BACKEND_ERROR_CODES.UNAUTHORIZED).toBe('UNAUTHORIZED');
    expect(BACKEND_ERROR_CODES.FORBIDDEN).toBe('FORBIDDEN');
  });

  it('contains domain resource not-found codes', () => {
    expect(BACKEND_ERROR_CODES.BUILDING_NOT_FOUND).toBe('BUILDING_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.APARTMENT_NOT_FOUND).toBe('APARTMENT_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.NOTICE_NOT_FOUND).toBe('NOTICE_NOT_FOUND');
  });

  it('contains membership and permission codes', () => {
    expect(BACKEND_ERROR_CODES.USER_NOT_MEMBER_OF_BUILDING).toBe('USER_NOT_MEMBER_OF_BUILDING');
    expect(BACKEND_ERROR_CODES.USER_ALREADY_MEMBER).toBe('USER_ALREADY_MEMBER');
    expect(BACKEND_ERROR_CODES.INSUFFICIENT_PERMISSIONS).toBe('INSUFFICIENT_PERMISSIONS');
  });
});

describe('isBackendErrorCode', () => {
  it('returns true for known error codes', () => {
    expect(isBackendErrorCode('EMAIL_NOT_VERIFIED')).toBe(true);
    expect(isBackendErrorCode('TOKEN_EXPIRED')).toBe(true);
    expect(isBackendErrorCode('USER_NOT_FOUND')).toBe(true);
  });

  it('returns false for unknown strings', () => {
    expect(isBackendErrorCode('UNKNOWN_CODE')).toBe(false);
    expect(isBackendErrorCode('random')).toBe(false);
    expect(isBackendErrorCode('')).toBe(false);
  });

  it('returns false for non-string values', () => {
    expect(isBackendErrorCode(null)).toBe(false);
    expect(isBackendErrorCode(undefined)).toBe(false);
    expect(isBackendErrorCode(42)).toBe(false);
    expect(isBackendErrorCode({})).toBe(false);
  });
});
