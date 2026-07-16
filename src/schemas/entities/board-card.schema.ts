import { z } from 'zod';
import { BoardVisibility } from '../../enums/board-card.enum';
import { Priority } from '../../enums/status.enum';
import { uuidSchema } from '../base.schema';
import { multipartArray } from '../multipart.schema';

/**
 * Validation constants for boards.
 */
export const BOARD_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 60,
  DESCRIPTION_MAX: 500,
} as const;

/**
 * Validation constants for board columns.
 */
export const BOARD_COLUMN_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 40,
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

// ─── Board columns ──────────────────────────────────────────────────────

/**
 * Create board column request schema — matches
 * `POST /buildings/:buildingId/boards/:boardId/columns`. New columns are
 * appended to the end of the board.
 */
export const createBoardColumnSchema = z.object({
  name: z
    .string()
    .min(BOARD_COLUMN_LIMITS.NAME_MIN, 'Name is required')
    .max(
      BOARD_COLUMN_LIMITS.NAME_MAX,
      `Name must be at most ${BOARD_COLUMN_LIMITS.NAME_MAX} characters`,
    )
    .describe('Column name, 1–40 chars.'),
});

/**
 * Update (rename) board column request schema.
 */
export const updateBoardColumnSchema = z.object({
  name: z
    .string()
    .min(BOARD_COLUMN_LIMITS.NAME_MIN)
    .max(BOARD_COLUMN_LIMITS.NAME_MAX)
    .describe('Revised column name, 1–40 chars.'),
});

/**
 * Reorder board columns request schema — the full ordered id list
 * (same contract as FAQ reorder).
 */
export const reorderBoardColumnsSchema = z.object({
  orderedIds: z
    .array(uuidSchema)
    .min(1)
    .describe('Every column id of the board in the desired display order.'),
});

// ─── Cards ──────────────────────────────────────────────────────────────

/**
 * Validation constants for board (Kanban) cards.
 */
export const BOARD_CARD_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 5000,
  CHECKLIST_MAX_ITEMS: 50,
  CHECKLIST_ITEM_MIN: 1,
  CHECKLIST_ITEM_MAX: 200,
} as const;

const prioritySchema = z.enum([Priority.NORMAL, Priority.URGENT]);

/**
 * A calendar event created inline with a card (schedule link). Same shape as
 * the notice/failure-report inline events.
 */
export const boardCardEventSchema = z.object({
  startDate: z.coerce.date().describe('Event start — accepts an ISO-8601 string or Date.'),
  endDate: z.coerce
    .date()
    .describe('Event end — accepts an ISO-8601 string or Date; must not precede `startDate`.'),
  title: z
    .string()
    .max(100)
    .optional()
    .describe('Event title; defaults to the card title when omitted.'),
});

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
 * `POST /buildings/:buildingId/boards/:boardId/cards` (multipart/form-data —
 * file parts ride alongside; array/boolean fields use the multipart helpers).
 * buildingId/boardId come from the URL, not the body.
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
    .describe('Optional details as markdown, up to 5000 chars.'),
  columnId: uuidSchema
    .optional()
    .describe('Target column; defaults to the board’s first column when omitted.'),
  priority: prioritySchema
    .optional()
    .describe('`normal` for standard cards, `urgent` to flag immediate attention.'),
  assignedTo: uuidSchema
    .nullable()
    .optional()
    .describe('UUID of the representative responsible for the card.'),
  checklist: multipartArray(boardCardChecklistItemSchema)
    .optional()
    .describe('Optional subtasks (e.g. documents to collect from co-owners).'),
  allowComments: z
    .boolean()
    .optional()
    .describe('Whether members may comment on this card. Defaults to true.'),
  fileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of previously-uploaded files to attach to this card.'),
  events: multipartArray(boardCardEventSchema)
    .optional()
    .describe('Calendar events to create alongside the card (deadlines, site visits).'),
});

/**
 * Update board card request schema — all fields optional. Column moves that
 * reorder within a column go through the dedicated move endpoint, but
 * `columnId` is still accepted for non-drag edits (appends to the target
 * column).
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
    .describe('Revised markdown details; null clears them.'),
  columnId: uuidSchema.optional().describe('Revised column (card is appended to it).'),
  priority: prioritySchema.optional().describe('Revised priority: `normal` or `urgent`.'),
  assignedTo: uuidSchema.nullable().optional().describe('Revised assignee; null unassigns.'),
  checklist: multipartArray(boardCardChecklistItemSchema)
    .optional()
    .describe('Full replacement checklist — replaces the existing items.'),
  allowComments: z.boolean().optional().describe('Whether members may comment on this card.'),
  fileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of newly-uploaded files to add to the card.'),
  removeChildFileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of previously-attached files to detach from the card.'),
  events: multipartArray(boardCardEventSchema)
    .optional()
    .describe('Full list of events for the card — replaces the existing event set.'),
});

/**
 * Move board card request schema — matches
 * `PATCH .../boards/:boardId/cards/:id/move`. Drives drag-and-drop:
 * the client computes a fractional `position` (midpoint between neighbours)
 * so a move never has to reindex the rest of the column.
 */
export const moveBoardCardSchema = z.object({
  columnId: uuidSchema.describe('Target column.'),
  position: z
    .number()
    .finite()
    .nonnegative()
    .describe('Fractional index within the target column (midpoint between neighbours).'),
});

// Inferred types
export type CreateBoardSchema = z.infer<typeof createBoardSchema>;
export type UpdateBoardSchema = z.infer<typeof updateBoardSchema>;
export type CreateBoardColumnSchema = z.infer<typeof createBoardColumnSchema>;
export type UpdateBoardColumnSchema = z.infer<typeof updateBoardColumnSchema>;
export type ReorderBoardColumnsSchema = z.infer<typeof reorderBoardColumnsSchema>;
export type BoardCardEventSchema = z.infer<typeof boardCardEventSchema>;
export type BoardCardChecklistItemSchema = z.infer<typeof boardCardChecklistItemSchema>;
export type CreateBoardCardSchema = z.infer<typeof createBoardCardSchema>;
export type UpdateBoardCardSchema = z.infer<typeof updateBoardCardSchema>;
export type MoveBoardCardSchema = z.infer<typeof moveBoardCardSchema>;
