export const JoinRequestStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type JoinRequestStatus = (typeof JoinRequestStatus)[keyof typeof JoinRequestStatus];
