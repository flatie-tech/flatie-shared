import { describe, expect, it } from 'vitest';
import { BuildingRole } from '../../src/enums';
import { canMessageUser, getMessageableUsers, type MessageableUserShape } from '../../src/utils';

const rep: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.OWNER_REPRESENTATIVE },
};
const deputy: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.DEPUTY_REPRESENTATIVE },
};
const optedInCoOwner: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.CO_OWNER, chatVisibleToCoOwners: true },
};
const hiddenCoOwner: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.CO_OWNER, chatVisibleToCoOwners: false },
};
const undefinedVisibilityCoOwner: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.CO_OWNER },
};
const resident: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.RESIDENT },
};
const roleless: MessageableUserShape = { buildingRole: null };

describe('canMessageUser', () => {
  it('managerial callers can message anyone', () => {
    for (const target of [rep, deputy, optedInCoOwner, hiddenCoOwner, resident, roleless]) {
      expect(canMessageUser(true, target)).toBe(true);
    }
  });

  it('non-managerial callers can message representatives and deputies', () => {
    expect(canMessageUser(false, rep)).toBe(true);
    expect(canMessageUser(false, deputy)).toBe(true);
  });

  it('non-managerial callers can message only opted-in co-owners', () => {
    expect(canMessageUser(false, optedInCoOwner)).toBe(true);
    expect(canMessageUser(false, hiddenCoOwner)).toBe(false);
  });

  it('treats an undefined chatVisibleToCoOwners flag as opted out', () => {
    expect(canMessageUser(false, undefinedVisibilityCoOwner)).toBe(false);
  });

  it('non-managerial callers cannot message residents or roleless users', () => {
    expect(canMessageUser(false, resident)).toBe(false);
    expect(canMessageUser(false, roleless)).toBe(false);
    expect(canMessageUser(false, {})).toBe(false);
  });
});

describe('getMessageableUsers', () => {
  const all = [rep, deputy, optedInCoOwner, hiddenCoOwner, undefinedVisibilityCoOwner, resident];

  it('returns everyone for a managerial caller', () => {
    expect(getMessageableUsers(all, true)).toEqual(all);
  });

  it('filters to reps, deputies, and opted-in co-owners for everyone else', () => {
    expect(getMessageableUsers(all, false)).toEqual([rep, deputy, optedInCoOwner]);
  });
});
