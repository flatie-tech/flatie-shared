import { describe, expect, it } from 'vitest';
import { Permission } from '../../src/enums';
import { createPermissionChecker, type PermissionSubject } from '../../src/utils';

const OWNER_ID = 'user-owner';
const OTHER_ID = 'user-other';

const subject: PermissionSubject = {
  userId: OWNER_ID,
  permissions: [
    Permission.BUILDING_READ,
    Permission.NOTICE_CREATE,
    Permission.NOTICE_READ,
    // scoped: can edit any notice, but only delete own
    Permission.NOTICE_UPDATE_ANY,
    Permission.NOTICE_DELETE_OWN,
    Permission.NOTICE_APPROVE,
  ],
};

describe('createPermissionChecker', () => {
  const checker = createPermissionChecker(subject);

  describe('can', () => {
    it('returns true when the subject holds the permission', () => {
      expect(checker.can(Permission.BUILDING_READ)).toBe(true);
    });

    it('returns false when the subject lacks the permission', () => {
      expect(checker.can(Permission.BUILDING_DELETE)).toBe(false);
    });
  });

  describe('canAny', () => {
    it('returns true when at least one permission matches', () => {
      expect(checker.canAny([Permission.BUILDING_DELETE, Permission.NOTICE_CREATE])).toBe(true);
    });

    it('returns false when none match', () => {
      expect(checker.canAny([Permission.BUILDING_DELETE, Permission.BUILDING_UPDATE])).toBe(false);
    });

    it('returns false for an empty list', () => {
      expect(checker.canAny([])).toBe(false);
    });
  });

  describe('canAll', () => {
    it('returns true when every permission is held', () => {
      expect(checker.canAll([Permission.BUILDING_READ, Permission.NOTICE_CREATE])).toBe(true);
    });

    it('returns false when any permission is missing', () => {
      expect(checker.canAll([Permission.BUILDING_READ, Permission.BUILDING_DELETE])).toBe(false);
    });

    it('returns true for an empty list (vacuous truth)', () => {
      expect(checker.canAll([])).toBe(true);
    });
  });

  describe('canOnResource', () => {
    it('grants via the :any permission regardless of owner', () => {
      expect(checker.canOnResource('notice', 'update', OTHER_ID)).toBe(true);
    });

    it('grants via the :own permission when the subject owns the resource', () => {
      expect(checker.canOnResource('notice', 'delete', OWNER_ID)).toBe(true);
    });

    it('denies via the :own permission when the subject does not own the resource', () => {
      expect(checker.canOnResource('notice', 'delete', OTHER_ID)).toBe(false);
    });

    it('denies when the subject has neither :own nor :any', () => {
      expect(checker.canOnResource('event', 'update', OWNER_ID)).toBe(false);
    });
  });

  describe('actionFlags', () => {
    it('reflects :any edit, :own delete, and approve', () => {
      expect(checker.actionFlags('notice', OWNER_ID)).toEqual({
        canEdit: true,
        canDelete: true,
        canApprove: true,
        isOwner: true,
      });
    });

    it('drops delete for a resource the subject does not own', () => {
      expect(checker.actionFlags('notice', OTHER_ID)).toEqual({
        canEdit: true,
        canDelete: false,
        canApprove: true,
        isOwner: false,
      });
    });
  });

  describe('null subject (loading / error / preview)', () => {
    const none = createPermissionChecker(null);

    it('denies every check', () => {
      expect(none.can(Permission.BUILDING_READ)).toBe(false);
      expect(none.canAny([Permission.BUILDING_READ])).toBe(false);
      expect(none.canOnResource('notice', 'update', OWNER_ID)).toBe(false);
      expect(none.actionFlags('notice', OWNER_ID)).toEqual({
        canEdit: false,
        canDelete: false,
        canApprove: false,
        isOwner: false,
      });
    });

    it('still returns vacuous truth for canAll([])', () => {
      expect(none.canAll([])).toBe(true);
    });
  });
});
