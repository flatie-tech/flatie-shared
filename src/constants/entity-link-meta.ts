import type { LinkableEntityType } from '../enums/entity-link.enum';

/**
 * Platform-neutral display metadata for a linkable entity type.
 *
 * - `section` — the in-building section (feature) the entity lives in. Both
 *   clients name their routes/screens after these sections; each client maps
 *   the section to a concrete path in its own route tree (web:
 *   `lib/routes/linked-records.ts`; mobile:
 *   `features/entity-links/link-routes.ts`).
 * - `icon` — canonical lucide icon name (kebab-case string). Clients resolve
 *   it through their own icon barrel (`@/components/icons` on both).
 * - `tint` — semantic badge-color token name (web's `BADGE_COLORS` keys),
 *   never a raw hex value. Each client maps the token to its own palette.
 */
export interface EntityLinkTypeMeta {
  readonly section: string;
  readonly icon: string;
  readonly tint: string;
}

/**
 * Entity-type → section/icon/tint map for the linked-records UI (badges,
 * connection rows, link pickers) — the single source both clients derive
 * their local maps from, replacing the previously duplicated-and-drifting
 * copies (mobile's copy was missing `board_card`).
 */
export const ENTITY_LINK_TYPE_META: Record<LinkableEntityType, EntityLinkTypeMeta> = {
  notice: { section: 'notices', icon: 'bell', tint: 'orange' },
  event: { section: 'calendar', icon: 'calendar', tint: 'success' },
  poll: { section: 'polls', icon: 'chart-pie', tint: 'info' },
  maintenance_log: { section: 'maintenance-logs', icon: 'wrench', tint: 'purple' },
  failure_report: { section: 'failure-reports', icon: 'triangle-alert', tint: 'danger' },
  file: { section: 'documents', icon: 'file-text', tint: 'neutral' },
  expense_transaction: { section: 'funds', icon: 'receipt', tint: 'amber' },
  board_card: { section: 'board', icon: 'square-kanban', tint: 'info' },
} as const;
