export const PollType = {
  CONSENSUS: 'CONSENSUS',
  COMMUNITY: 'COMMUNITY',
} as const;

export type PollType = (typeof PollType)[keyof typeof PollType];
