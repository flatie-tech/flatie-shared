export const BuildingStatus = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  REJECTED: 'REJECTED',
} as const;

export type BuildingStatus = (typeof BuildingStatus)[keyof typeof BuildingStatus];

export const OrgStatus = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  REJECTED: 'REJECTED',
} as const;

export type OrgStatus = (typeof OrgStatus)[keyof typeof OrgStatus];
