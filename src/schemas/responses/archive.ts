import { z } from 'zod';
import type { Strict } from './_strict';

export const ARCHIVE_TYPES = [
  'apartments',
  'blog_posts',
  'building_join_requests',
  'buildings',
  'comments',
  'events',
  'failure_reports',
  'faqs',
  'files',
  'garages',
  'income_transactions',
  'maintenance_logs',
  'notices',
  'organizations',
  'polls',
  'recurring_templates',
  'storage_units',
  'transaction_categories',
] as const;

export type ArchiveType = (typeof ARCHIVE_TYPES)[number];

export const archiveTypeSchema = z
  .enum(ARCHIVE_TYPES)
  .describe('Name of the archived entity kind; must match a key in the backend archive registry.');

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
