export const PollType = {
  CONSENSUS: 'consensus',
  COMMUNITY: 'community',
} as const;

export type PollType = (typeof PollType)[keyof typeof PollType];
