/**
 * Board (Kanban) card lifecycle columns.
 *
 * A building's board has three fixed columns for v1. Configurable per-building
 * columns are a deliberate follow-up, not part of the initial model.
 */
export const BoardCardStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const;

export type BoardCardStatus = (typeof BoardCardStatus)[keyof typeof BoardCardStatus];

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
