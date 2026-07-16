import { describe, expect, it } from 'vitest';
import {
  applyResidentRestriction,
  applyResidentRestrictionToItem,
} from '../../src/utils/resident-restriction';

const ownerItem = {
  id: 'a',
  canEdit: true,
  canDelete: true,
  canApprove: true,
  isOwner: true,
};

const foreignItem = {
  id: 'b',
  canEdit: true,
  canDelete: true,
  canApprove: true,
  isOwner: false,
};

describe('applyResidentRestrictionToItem', () => {
  it('passes the item through unchanged when the view is not restricted', () => {
    expect(applyResidentRestrictionToItem(foreignItem, false)).toBe(foreignItem);
  });

  it('keeps edit/delete for the owner but always drops approve', () => {
    expect(applyResidentRestrictionToItem(ownerItem, true)).toEqual({
      ...ownerItem,
      canApprove: false,
    });
  });

  it('revokes edit/delete/approve on items the user does not own', () => {
    expect(applyResidentRestrictionToItem(foreignItem, true)).toEqual({
      id: 'b',
      canEdit: false,
      canDelete: false,
      canApprove: false,
      isOwner: false,
    });
  });

  it('leaves canApprove absent on items that never had it', () => {
    const noApprove = { canEdit: true, canDelete: false, isOwner: false };
    const restricted = applyResidentRestrictionToItem(noApprove, true);
    expect(restricted).toEqual({ canEdit: false, canDelete: false, isOwner: false });
    expect('canApprove' in restricted).toBe(false);
  });

  it('never grants flags the server denied', () => {
    const denied = { canEdit: false, canDelete: false, canApprove: false, isOwner: true };
    expect(applyResidentRestrictionToItem(denied, true)).toEqual(denied);
  });
});

describe('applyResidentRestriction (array form)', () => {
  it('passes the array through by reference when not restricted', () => {
    const items = [ownerItem, foreignItem];
    expect(applyResidentRestriction(items, false)).toBe(items);
  });

  it('restricts each item independently', () => {
    const [owner, foreign] = applyResidentRestriction([ownerItem, foreignItem], true);
    expect(owner).toMatchObject({ canEdit: true, canDelete: true, canApprove: false });
    expect(foreign).toMatchObject({ canEdit: false, canDelete: false, canApprove: false });
  });

  it('does not mutate the input items', () => {
    const items = [{ ...foreignItem }];
    applyResidentRestriction(items, true);
    expect(items[0]).toEqual(foreignItem);
  });

  it('handles the empty array', () => {
    expect(applyResidentRestriction([], true)).toEqual([]);
  });
});
