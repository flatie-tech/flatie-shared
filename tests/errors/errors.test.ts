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

  it('contains chat, poll, and workflow codes (v0.17.1+)', () => {
    expect(BACKEND_ERROR_CODES.CONVERSATION_NOT_FOUND).toBe('CONVERSATION_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.POLL_NOT_ACTIVE).toBe('POLL_NOT_ACTIVE');
    expect(BACKEND_ERROR_CODES.POLL_EXPIRED).toBe('POLL_EXPIRED');
    expect(BACKEND_ERROR_CODES.USER_ALREADY_VOTED).toBe('USER_ALREADY_VOTED');
    expect(BACKEND_ERROR_CODES.JOIN_REQUEST_PENDING).toBe('JOIN_REQUEST_PENDING');
    expect(BACKEND_ERROR_CODES.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
  });

  it('contains join-request, approval, and second-wave not-found codes (v0.17.2+)', () => {
    expect(BACKEND_ERROR_CODES.JOIN_REQUEST_NOT_FOUND).toBe('JOIN_REQUEST_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.JOIN_REQUEST_ALREADY_DECIDED).toBe('JOIN_REQUEST_ALREADY_DECIDED');
    expect(BACKEND_ERROR_CODES.ALREADY_APPROVED).toBe('ALREADY_APPROVED');
    expect(BACKEND_ERROR_CODES.ALREADY_DECLINED).toBe('ALREADY_DECLINED');
    expect(BACKEND_ERROR_CODES.INCOME_TRANSACTION_NOT_FOUND).toBe('INCOME_TRANSACTION_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.RECURRING_TEMPLATE_NOT_FOUND).toBe('RECURRING_TEMPLATE_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.INVOICE_NOT_FOUND).toBe('INVOICE_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.BLOG_POST_NOT_FOUND).toBe('BLOG_POST_NOT_FOUND');
    expect(BACKEND_ERROR_CODES.INVOICE_ALREADY_PAID).toBe('INVOICE_ALREADY_PAID');
    expect(BACKEND_ERROR_CODES.BUILDING_NOT_PENDING_APPROVAL).toBe('BUILDING_NOT_PENDING_APPROVAL');
    expect(BACKEND_ERROR_CODES.USER_ALREADY_PLATFORM_MEMBER).toBe('USER_ALREADY_PLATFORM_MEMBER');
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
