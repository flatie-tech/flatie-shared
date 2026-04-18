export const OrgType = {
  MANAGEMENT_FIRM: 'MANAGEMENT_FIRM',
  PLATFORM: 'PLATFORM',
} as const;

export type OrgType = (typeof OrgType)[keyof typeof OrgType];
