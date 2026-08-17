import { z } from 'zod';
import type { Strict } from './_strict';

/**
 * Every archivable entity kind, mirroring the backend's ARCHIVE_REGISTRY.
 *
 * This is parsed, not just typed: `archivedItemSchema.type` is a strict enum,
 * so a value the backend can emit but this list omits makes the whole archive
 * response fail validation and the page render as an error. That happened —
 * the list carried four kinds the registry has never had (`apartments`,
 * `garages`, `storage_units`, `recurring_templates`, all pre-rename or
 * never-shipped) while missing four it does emit (`business_partners`,
 * `bug_reports`, `expense_transactions`, `owners`), so the platform archive
 * threw as soon as one of those rows appeared.
 *
 * Keep sorted and identical to the registry. The backend asserts its own two
 * lists agree in `archive-registry.spec.ts`; this is the third copy.
 */
export const ARCHIVE_TYPES = [
  'blog_posts',
  'board_cards',
  'boards',
  'bug_reports',
  'building_join_requests',
  'buildings',
  'business_partners',
  'comments',
  'events',
  'expense_transactions',
  'failure_reports',
  'faqs',
  'files',
  'income_transactions',
  'notices',
  'organizations',
  'owners',
  'polls',
  'transaction_categories',
  'units',
] as const;

export type ArchiveType = (typeof ARCHIVE_TYPES)[number];

export const archiveTypeSchema = z
  .enum(ARCHIVE_TYPES)
  .describe('Name of the archived entity kind; must match a key in the backend archive registry.');

/**
 * The subset of archive types reachable through `GET/POST
 * /buildings/:id/archive/…` — strictly the building-scoped tables. Mirrors the
 * backend's BUILDING_ARCHIVE_TYPE_FILTERS.
 *
 * A manager (`building:settings:manage`) sees all of these; a plain member
 * sees only rows they authored, and only for the scoped domains — notices,
 * events, polls, failure reports and documents (`files`). The rest are
 * manage-only, so a member's list simply comes back empty for them.
 */
export const BUILDING_ARCHIVE_TYPES = [
  'board_cards',
  'boards',
  'building_join_requests',
  'comments',
  'events',
  'expense_transactions',
  'failure_reports',
  'faqs',
  'files',
  'income_transactions',
  'notices',
  'owners',
  'polls',
  'transaction_categories',
  'units',
] as const;

export type BuildingArchiveType = (typeof BUILDING_ARCHIVE_TYPES)[number];

export const buildingArchiveTypeSchema = z
  .enum(BUILDING_ARCHIVE_TYPES)
  .describe('Building-scoped archive type; the subset restorable by building managers.');

export const archivedItemSchema = z.looseObject({
  id: z.string().uuid().describe('UUID of the archived row within its source table.'),
  type: archiveTypeSchema,
  label: z
    .string()
    .describe('Human-readable label for the archived row (e.g. apartment number, notice title).'),
  buildingId: z
    .string()
    .uuid()
    .nullable()
    .describe(
      'UUID of the building the row belongs to; null for global entities like organizations.',
    ),
  archivedAt: z.string().describe('ISO-8601 timestamp when the row was archived.'),
  archivedBy: z
    .string()
    .uuid()
    .nullable()
    .describe(
      'UUID of the user who archived the row; null when the original actor has been deleted.',
    ),
  archivedByName: z
    .string()
    .nullable()
    .describe('Display name of the archiving user; null when unavailable.'),
  daysUntilPurge: z
    .number()
    .int()
    .describe(
      'Remaining days before the automated 30-day purge removes the row; 0 means the TTL has elapsed.',
    ),
});

export const listArchivedResponseSchema = z.object({
  items: z
    .array(archivedItemSchema)
    .describe('Archived rows across all registered archive types, sorted by archivedAt desc.'),
});

export type ArchivedItem = Strict<z.infer<typeof archivedItemSchema>>;
export type ListArchivedResponse = Strict<z.infer<typeof listArchivedResponseSchema>>;
