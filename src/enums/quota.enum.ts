// ─── Building-scoped quota resources ───────────────────────────────

export const QuotaResourceType = {
  COMMENT: 'comment',
  MAINTENANCE_REQUEST: 'maintenance_request',
  INVITE: 'invite',
  NOTIFICATION: 'notification',
} as const;

export type QuotaResourceType = (typeof QuotaResourceType)[keyof typeof QuotaResourceType];

export const QUOTA_RESOURCE_TYPES = Object.values(
  QuotaResourceType,
) as readonly QuotaResourceType[];

export const QUOTA_DEFAULT_DAILY_LIMITS: Record<QuotaResourceType, number | null> = {
  [QuotaResourceType.COMMENT]: 50,
  [QuotaResourceType.MAINTENANCE_REQUEST]: 10,
  [QuotaResourceType.INVITE]: 20,
  [QuotaResourceType.NOTIFICATION]: null,
};

// ─── Organization-scoped quota resources ───────────────────────────
//
// Separate from building quotas: an org admin inviting ten co-workers is
// not the same action as a resident posting ten comments. The org scope
// guards members/buildings bulk-actions and platform-ish blast radius.

export const OrgQuotaResourceType = {
  MEMBER_INVITE: 'member_invite',
  BUILDING_CREATE: 'building_create',
  NOTIFICATION: 'notification',
} as const;

export type OrgQuotaResourceType = (typeof OrgQuotaResourceType)[keyof typeof OrgQuotaResourceType];

export const ORG_QUOTA_RESOURCE_TYPES = Object.values(
  OrgQuotaResourceType,
) as readonly OrgQuotaResourceType[];

export const ORG_QUOTA_DEFAULT_DAILY_LIMITS: Record<OrgQuotaResourceType, number | null> = {
  [OrgQuotaResourceType.MEMBER_INVITE]: 30,
  [OrgQuotaResourceType.BUILDING_CREATE]: 10,
  [OrgQuotaResourceType.NOTIFICATION]: null,
};
