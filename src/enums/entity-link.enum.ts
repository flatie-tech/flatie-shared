/**
 * Link types stored in the backend `entity_links.link_type` Postgres enum.
 * Values must stay in sync with the `entity_link_type` pgEnum in
 * flatie-backend/src/db/schema/entity-links.schema.ts.
 */
export const EntityLinkType = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  INVOICE: 'invoice',
  WARRANTY: 'warranty',
  AGENDA: 'agenda',
  SCHEDULE: 'schedule',
  DEADLINE: 'deadline',
  MEETING: 'meeting',
  RESOLVED_BY: 'resolved_by',
  BASED_ON: 'based_on',
  DISCUSSED_IN: 'discussed_in',
  EXPENSE_FOR: 'expense_for',
  RELATED_TO: 'related_to',
} as const;

export type EntityLinkType = (typeof EntityLinkType)[keyof typeof EntityLinkType];

/**
 * Entity types that can appear on either end of an entity link
 * (`entity_links.source_type` / `target_type`).
 */
export const LinkableEntityType = {
  FAILURE_REPORT: 'failure_report',
  MAINTENANCE_LOG: 'maintenance_log',
  NOTICE: 'notice',
  EVENT: 'event',
  POLL: 'poll',
  FILE: 'file',
  EXPENSE_TRANSACTION: 'expense_transaction',
  BOARD_CARD: 'board_card',
} as const;

export type LinkableEntityType = (typeof LinkableEntityType)[keyof typeof LinkableEntityType];
