import { z } from 'zod';
import type { Strict } from './_strict';

export const faqResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe('UUID of the building this FAQ entry belongs to.'),
  question: z.string().describe('FAQ question text as displayed to residents.'),
  answer: z.string().describe('FAQ answer text in plain markdown.'),
  category: z
    .enum(['representative', 'manager'])
    .describe(
      'Target audience. `representative` entries are visible to building representatives; `manager` entries are visible to management-firm staff.',
    ),
  orderIndex: z
    .number()
    .describe('Zero-based display order within the building; lower values appear first.'),
  createdBy: z
    .string()
    .uuid()
    .nullable()
    .describe('UUID of the user who created the FAQ; null if the original author was removed.'),
  createdAt: z.string().describe('ISO-8601 timestamp when the FAQ was created.'),
  updatedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
});

export type FaqResponse = Strict<z.infer<typeof faqResponseSchema>>;
