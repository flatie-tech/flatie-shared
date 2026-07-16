import { z } from 'zod';
import { BoardCardStatus, BoardVisibility } from '../../enums/board-card.enum';
import { Priority } from '../../enums/status.enum';
import { uuidSchema } from '../base.schema';

/**
 * Validation constants for boards.
 */
export const BOARD_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 60,
  DESCRIPTION_MAX: 500,
} as const;

const boardVisibilitySchema = z.enum([BoardVisibility.BUILDING, BoardVisibility.REPRESENTATIVES]);

/**
 * Create board request schema — matches `POST /buildings/:buildingId/boards`.
 * buildingId comes from the URL, not the body.
 */
export const createBoardSchema = z.object({
  name: z
    .string()
    .min(BOARD_LIMITS.NAME_MIN, 'Name is required')
    .max(BOARD_LIMITS.NAME_MAX, `Name must be at most ${BOARD_LIMITS.NAME_MAX} characters`)
    .describe('Board name, 1–60 chars.'),
  description: z
    .string()
    .max(BOARD_LIMITS.DESCRIPTION_MAX)
    .optional()
    .describe('Optional board description, up to 500 chars.'),
  visibility: boardVisibilitySchema
    .optional()
    .describe(
      '`building` (default) — visible to every member with board read access; ' +
        '`representatives` — a private board only representatives can see.',
    ),
});

/**
 * Update board request schema — all fields optional.
 */
export const updateBoardSchema = z.object({
  name: z
    .string()
    .min(BOARD_LIMITS.NAME_MIN)
    .max(BOARD_LIMITS.NAME_MAX)
    .optional()
    .describe('Revised board name, 1–60 chars.'),
  description: z
    .string()
    .max(BOARD_LIMITS.DESCRIPTION_MAX)
    .nullable()
    .optional()
    .describe('Revised description; null clears it.'),
  visibility: boardVisibilitySchema.optional().describe('Revised visibility.'),
});

/**
 * Validation constants for board (Kanban) cards.
 */
export const BOARD_CARD_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2000,
  CHECKLIST_MAX_ITEMS: 50,
  CHECKLIST_ITEM_MIN: 1,
  CHECKLIST_ITEM_MAX: 200,
} as const;

const boardCardStatusSchema = z.enum([
  BoardCardStatus.TODO,
  BoardCardStatus.IN_PROGRESS,
  BoardCardStatus.DONE,
]);

const prioritySchema = z.enum([Priority.NORMAL, Priority.URGENT]);

/**
 * A single checklist item on a card. `id` is server-assigned when omitted so
 * the client can add items optimistically without minting ids itself.
 */
export const boardCardChecklistItemSchema = z.object({
  id: uuidSchema.optional().describe('Stable item id; the server assigns one when omitted.'),
  text: z
    .string()
    .min(BOARD_CARD_LIMITS.CHECKLIST_ITEM_MIN)
    .max(BOARD_CARD_LIMITS.CHECKLIST_ITEM_MAX)
    .describe('Checklist item label.'),
  done: z.boolean().default(false).describe('Whether the item is checked off.'),
});

/**
 * Create board card request schema — matches
 * `POST /buildings/:buildingId/board/cards` (JSON body).
 * buildingId comes from the URL, not the body.
 */
export const createBoardCardSchema = z.object({
  title: z
    .string()
    .min(BOARD_CARD_LIMITS.TITLE_MIN, 'Title is required')
    .max(
      BOARD_CARD_LIMITS.TITLE_MAX,
      `Title must be at most ${BOARD_CARD_LIMITS.TITLE_MAX} characters`,
    )
    .describe('Short summary of the card, 1–100 chars.'),
  description: z
    .string()
    .max(BOARD_CARD_LIMITS.DESCRIPTION_MAX)
    .optional()
    .describe('Optional details, up to 2000 chars.'),
  status: boardCardStatusSchema
    .optional()
    .describe('Initial column; defaults to `todo` when omitted.'),
  priority: prioritySchema
    .optional()
    .describe('`normal` for standard cards, `urgent` to flag immediate attention.'),
  dueDate: z.coerce
    .date()
    .nullable()
    .optional()
    .describe('Optional due date — accepts an ISO-8601 string or Date.'),
  assignedTo: uuidSchema
    .nullable()
    .optional()
    .describe('UUID of the representative responsible for the card.'),
  checklist: z
    .array(boardCardChecklistItemSchema)
    .max(BOARD_CARD_LIMITS.CHECKLIST_MAX_ITEMS)
    .optional()
    .describe('Optional subtasks (e.g. documents to collect from co-owners).'),
  allowComments: z
    .boolean()
    .optional()
    .describe('Whether members may comment on this card. Defaults to true.'),
});

/**
 * Update board card request schema — all fields optional. Column moves go
 * through the dedicated move endpoint, not here, but `status` is still
 * accepted for non-drag edits (e.g. the card detail modal).
 */
export const updateBoardCardSchema = z.object({
  title: z
    .string()
    .min(BOARD_CARD_LIMITS.TITLE_MIN)
    .max(BOARD_CARD_LIMITS.TITLE_MAX)
    .optional()
    .describe('Revised card title, 1–100 chars.'),
  description: z
    .string()
    .max(BOARD_CARD_LIMITS.DESCRIPTION_MAX)
    .nullable()
    .optional()
    .describe('Revised details, up to 2000 chars; null clears them.'),
  status: boardCardStatusSchema.optional().describe('Revised column.'),
  priority: prioritySchema.optional().describe('Revised priority: `normal` or `urgent`.'),
  dueDate: z.coerce.date().nullable().optional().describe('Revised due date; null clears it.'),
  assignedTo: uuidSchema.nullable().optional().describe('Revised assignee; null unassigns.'),
  checklist: z
    .array(boardCardChecklistItemSchema)
    .max(BOARD_CARD_LIMITS.CHECKLIST_MAX_ITEMS)
    .optional()
    .describe('Full replacement checklist — replaces the existing items.'),
  allowComments: z.boolean().optional().describe('Whether members may comment on this card.'),
});

/**
 * Move board card request schema — matches
 * `PATCH /buildings/:buildingId/board/cards/:id/move`. Drives drag-and-drop:
 * the client computes a fractional `position` (midpoint between neighbours)
 * so a move never has to reindex the rest of the column.
 */
export const moveBoardCardSchema = z.object({
  status: boardCardStatusSchema.describe('Target column.'),
  position: z
    .number()
    .finite()
    .nonnegative()
    .describe('Fractional index within the target column (midpoint between neighbours).'),
});

// Inferred types
export type CreateBoardSchema = z.infer<typeof createBoardSchema>;
export type UpdateBoardSchema = z.infer<typeof updateBoardSchema>;
export type BoardCardChecklistItemSchema = z.infer<typeof boardCardChecklistItemSchema>;
export type CreateBoardCardSchema = z.infer<typeof createBoardCardSchema>;
export type UpdateBoardCardSchema = z.infer<typeof updateBoardCardSchema>;
export type MoveBoardCardSchema = z.infer<typeof moveBoardCardSchema>;
