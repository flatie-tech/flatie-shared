/**
 * Who can see a board. `building` = every member with `board_card:read`
 * (co-owners and up); `representatives` = a private board only members with
 * `board_card:manage` can see — co-owners never learn it exists.
 */
export const BoardVisibility = {
  BUILDING: 'building',
  REPRESENTATIVES: 'representatives',
} as const;

export type BoardVisibility = (typeof BoardVisibility)[keyof typeof BoardVisibility];
