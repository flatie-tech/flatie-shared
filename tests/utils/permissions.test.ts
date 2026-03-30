import { describe, expect, it } from 'vitest';
import { Permission } from '../../src/enums';
import { hasAllPermissions, hasAnyPermission, hasPermission } from '../../src/utils';

describe('Permission Utilities', () => {
  const userPermissions = [
    Permission.BUILDING_READ,
    Permission.NOTICE_CREATE,
    Permission.NOTICE_READ,
  ];

  describe('hasPermission', () => {
    it('returns true when user has the permission', () => {
      expect(hasPermission(userPermissions, Permission.BUILDING_READ)).toBe(true);
    });

    it('returns false when user lacks the permission', () => {
      expect(hasPermission(userPermissions, Permission.BUILDING_DELETE)).toBe(false);
    });

    it('returns false for empty user permissions', () => {
      expect(hasPermission([], Permission.BUILDING_READ)).toBe(false);
    });
  });

  describe('hasAnyPermission', () => {
    it('returns true if at least one permission matches', () => {
      expect(
        hasAnyPermission(userPermissions, [Permission.BUILDING_DELETE, Permission.NOTICE_CREATE]),
      ).toBe(true);
    });

    it('returns false if no permissions match', () => {
      expect(
        hasAnyPermission(userPermissions, [Permission.BUILDING_DELETE, Permission.BUILDING_UPDATE]),
      ).toBe(false);
    });

    it('returns false for empty permissions argument', () => {
      expect(hasAnyPermission(userPermissions, [])).toBe(false);
    });

    it('returns false for empty user permissions', () => {
      expect(hasAnyPermission([], [Permission.BUILDING_READ])).toBe(false);
    });
  });

  describe('hasAllPermissions', () => {
    it('returns true when user has all specified permissions', () => {
      expect(
        hasAllPermissions(userPermissions, [Permission.BUILDING_READ, Permission.NOTICE_CREATE]),
      ).toBe(true);
    });

    it('returns false when user lacks any specified permission', () => {
      expect(
        hasAllPermissions(userPermissions, [Permission.BUILDING_READ, Permission.BUILDING_DELETE]),
      ).toBe(false);
    });

    it('returns true for empty permissions argument (vacuous truth)', () => {
      expect(hasAllPermissions(userPermissions, [])).toBe(true);
    });

    it('returns false for empty user permissions with non-empty check', () => {
      expect(hasAllPermissions([], [Permission.BUILDING_READ])).toBe(false);
    });
  });
});
