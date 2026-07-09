import { z } from 'zod';
import { entityLinkTypeSchema, linkableEntityTypeSchema } from '../entities/entity-link.schema';
import type { Strict } from './_strict';

/**
 * Compact, per-type display metadata for a linked entity. Values are **raw**
 * (unformatted): dates are ISO strings and amounts are numbers, so each client
 * can format them in its own locale/currency. `status` is a raw enum value the
 * client localizes; `secondary` is already-human text (contractor, period).
 * Every field is optional — a given entity type fills only what it has.
 */
export const entityLinkMetadataSchema = z
  .looseObject({
    status: z
      .string()
      .nullable()
      .optional()
      .describe('Raw status enum value (e.g. failure-report status); the client localizes it.'),
    date: z
      .string()
      .nullable()
      .optional()
      .describe('Primary ISO date for the entity (created/start); the client formats per locale.'),
    amount: z
      .number()
      .nullable()
      .optional()
      .describe('Monetary amount (e.g. expense/maintenance cost); the client formats as currency.'),
    secondary: z
      .string()
      .nullable()
      .optional()
      .describe('Already-human supplementary text such as a contractor name or accounting period.'),
  })
  .describe('Per-type display metadata for a linked entity; all fields optional and raw.');

/**
 * One link as seen from an anchor entity, enriched with the far endpoint's
 * display data.
 */
export const entityLinkReferenceSchema = z
  .looseObject({
    id: z.string().uuid().describe('UUID of the entity on the far end of the link.'),
    type: linkableEntityTypeSchema.describe('Kind of entity on the far end.'),
    linkType: entityLinkTypeSchema,
    direction: z
      .enum(['outgoing', 'incoming'])
      .describe(
        'Whether the anchor entity is the source (`outgoing`) or the target (`incoming`) of the stored link row.',
      ),
    title: z
      .string()
      .nullable()
      .optional()
      .describe('Display title of the far entity; null when it has none.'),
    metadata: entityLinkMetadataSchema
      .nullable()
      .optional()
      .describe('Optional per-type display metadata (status, date, amount, secondary text).'),
  })
  .describe('A link from the anchor entity to another entity, with display enrichment.');

export const entityLinksResponseSchema = z
  .looseObject({
    links: z
      .array(entityLinkReferenceSchema)
      .describe('Every link touching the anchor entity, outgoing and incoming.'),
  })
  .describe('All links touching the anchor entity, in both directions.');

/**
 * Batch link-count lookup: how many entity↔entity links touch each requested
 * entity id (both directions, excluding file-attachment link types). Missing
 * ids and zero counts are simply absent from the map.
 */
export const entityLinkCountsResponseSchema = z
  .looseObject({
    counts: z
      .record(z.string(), z.number())
      .describe('Map of entity id → number of entity links touching it.'),
  })
  .describe('Batch link counts keyed by entity id.');

export type EntityLinkMetadata = Strict<z.infer<typeof entityLinkMetadataSchema>>;
export type EntityLinkCountsResponse = Strict<z.infer<typeof entityLinkCountsResponseSchema>>;
export type EntityLinkReference = Strict<z.infer<typeof entityLinkReferenceSchema>>;
export type EntityLinksResponse = Strict<z.infer<typeof entityLinksResponseSchema>>;
