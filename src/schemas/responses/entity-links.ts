import { z } from 'zod';
import { entityLinkTypeSchema, linkableEntityTypeSchema } from '../entities/entity-link.schema';
import type { Strict } from './_strict';

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
  })
  .describe('A link from the anchor entity to another entity, with display enrichment.');

export const entityLinksResponseSchema = z
  .looseObject({
    links: z
      .array(entityLinkReferenceSchema)
      .describe('Every link touching the anchor entity, outgoing and incoming.'),
  })
  .describe('All links touching the anchor entity, in both directions.');

export type EntityLinkReference = Strict<z.infer<typeof entityLinkReferenceSchema>>;
export type EntityLinksResponse = Strict<z.infer<typeof entityLinksResponseSchema>>;
