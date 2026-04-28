export const QuotaResourceType = {
  COMMENT: 'COMMENT',
  MAINTENANCE_REQUEST: 'MAINTENANCE_REQUEST',
  INVITE: 'INVITE',
  NOTIFICATION: 'NOTIFICATION',
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
