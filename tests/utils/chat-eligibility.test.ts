import { describe, expect, it } from 'vitest';
import { BuildingRole } from '../../src/enums';
import { canMessageUser, getMessageableUsers, type MessageableUserShape } from '../../src/utils';

const rep: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.OWNER_REPRESENTATIVE },
};
const deputy: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.DEPUTY_REPRESENTATIVE },
};
const optedInResident: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.RESIDENT, chatVisibleToCoOwners: true },
};
const hiddenResident: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.RESIDENT, chatVisibleToCoOwners: false },
};
const undefinedVisibilityResident: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.RESIDENT },
};
// Legacy value on un-migrated environments — must behave exactly like resident.
const optedInLegacyCoOwner: MessageableUserShape = {
  buildingRole: { roleType: BuildingRole.CO_OWNER, chatVisibleToCoOwners: true },
};
const roleless: MessageableUserShape = { buildingRole: null };

describe('canMessageUser', () => {
  it('managerial callers can message anyone', () => {
    for (const target of [rep, deputy, optedInResident, hiddenResident, roleless]) {
      expect(canMessageUser(true, target)).toBe(true);
    }
  });

  it('non-managerial callers can message representatives and deputies', () => {
    expect(canMessageUser(false, rep)).toBe(true);
    expect(canMessageUser(false, deputy)).toBe(true);
  });

  it('non-managerial callers can message opted-in members regardless of role', () => {
    expect(canMessageUser(false, optedInResident)).toBe(true);
    expect(canMessageUser(false, optedInLegacyCoOwner)).toBe(true);
    expect(canMessageUser(false, hiddenResident)).toBe(false);
  });

  it('treats an undefined chatVisibleToCoOwners flag as opted out', () => {
    expect(canMessageUser(false, undefinedVisibilityResident)).toBe(false);
  });

  it('non-managerial callers cannot message roleless users', () => {
    expect(canMessageUser(false, roleless)).toBe(false);
    expect(canMessageUser(false, {})).toBe(false);
  });
});

describe('getMessageableUsers', () => {
  const all = [rep, deputy, optedInResident, hiddenResident, undefinedVisibilityResident];

  it('returns everyone for a managerial caller', () => {
    expect(getMessageableUsers(all, true)).toEqual(all);
  });

  it('filters to reps, deputies, and opted-in members for everyone else', () => {
    expect(getMessageableUsers(all, false)).toEqual([rep, deputy, optedInResident]);
  });
});
