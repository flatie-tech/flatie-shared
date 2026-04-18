export const PollStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];
