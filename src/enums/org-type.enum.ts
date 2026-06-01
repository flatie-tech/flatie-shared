export const OrgType = {
  MANAGEMENT_FIRM: 'management_firm',
  PLATFORM: 'platform',
} as const;

export type OrgType = (typeof OrgType)[keyof typeof OrgType];
