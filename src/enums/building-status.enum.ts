export const BuildingStatus = {
  PENDING_APPROVAL: 'pending_approval',
  ACTIVE: 'active',
  REJECTED: 'rejected',
} as const;

export type BuildingStatus = (typeof BuildingStatus)[keyof typeof BuildingStatus];

export const OrgStatus = {
  PENDING_APPROVAL: 'pending_approval',
  ACTIVE: 'active',
  REJECTED: 'rejected',
} as const;

export type OrgStatus = (typeof OrgStatus)[keyof typeof OrgStatus];
