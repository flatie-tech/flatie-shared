import { z } from 'zod';
import { uuidSchema } from '../base.schema';

export const ENTITY_LINK_TYPES = [
  'image',
  'document',
  'invoice',
  'warranty',
  'agenda',
  'schedule',
  'deadline',
  'meeting',
  'resolved_by',
  'based_on',
  'discussed_in',
  'expense_for',
  'related_to',
] as const;

export const LINKABLE_ENTITY_TYPES = [
  'failure_report',
  'maintenance_log',
  'notice',
  'event',
  'poll',
  'file',
  'expense_transaction',
  'board_card',
] as const;

export const entityLinkTypeSchema = z
  .enum(ENTITY_LINK_TYPES)
  .describe('Semantic type of the link, e.g. `related_to`, `resolved_by`, `schedule`.');

export const linkableEntityTypeSchema = z
  .enum(LINKABLE_ENTITY_TYPES)
  .describe('Kind of entity on one end of a link.');

/** One end of an entity link. */
export const entityLinkEndpointSchema = z.object({
  id: uuidSchema.describe('UUID of the entity.'),
  type: linkableEntityTypeSchema,
});

/**
 * Create-link request. The (source.type, target.type, linkType) triple must
 * appear in `ALLOWED_ENTITY_LINKS`; both entities must belong to the URL's
 * building. Idempotent — re-creating an existing link is a no-op.
 */
export const createEntityLinkRequestSchema = z.object({
  source: entityLinkEndpointSchema.describe('Owning end of the link.'),
  target: entityLinkEndpointSchema.describe('Referenced end of the link.'),
  linkType: entityLinkTypeSchema,
});

/** Delete-link request — the exact triple to remove. */
export const deleteEntityLinkRequestSchema = createEntityLinkRequestSchema;

/**
 * Flat variant of the delete request, carried in query params (DELETE
 * requests with bodies are dropped by some proxies).
 */
export const deleteEntityLinkQuerySchema = z.object({
  sourceId: uuidSchema.describe('UUID of the source entity.'),
  sourceType: linkableEntityTypeSchema,
  targetId: uuidSchema.describe('UUID of the target entity.'),
  targetType: linkableEntityTypeSchema,
  linkType: entityLinkTypeSchema,
});

/** Query params for listing an entity's links (both directions). */
export const getEntityLinksQuerySchema = z.object({
  entityId: uuidSchema.describe('UUID of the anchor entity.'),
  entityType: linkableEntityTypeSchema,
});

/**
 * Query params for the batch link-count lookup. `ids` is a comma-separated
 * list of UUIDs (query-string friendly, unambiguous across serializers); it is
 * split, trimmed, and validated as UUIDs. Capped to keep the count query bounded.
 */
export const getEntityLinkCountsQuerySchema = z.object({
  entityType: linkableEntityTypeSchema,
  ids: z
    .string()
    .describe('Comma-separated list of entity UUIDs to count links for.')
    .transform((value) =>
      value
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean),
    )
    .pipe(z.array(uuidSchema).min(1).max(200)),
});

export type EntityLinkEndpoint = z.infer<typeof entityLinkEndpointSchema>;
export type CreateEntityLinkRequest = z.infer<typeof createEntityLinkRequestSchema>;
export type DeleteEntityLinkRequest = z.infer<typeof deleteEntityLinkRequestSchema>;
export type DeleteEntityLinkQuery = z.infer<typeof deleteEntityLinkQuerySchema>;
export type GetEntityLinksQuery = z.infer<typeof getEntityLinksQuerySchema>;
export type GetEntityLinkCountsQuery = z.infer<typeof getEntityLinkCountsQuerySchema>;
