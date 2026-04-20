import { z } from 'zod';

export const faqResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  question: z.string(),
  answer: z.string(),
  category: z.enum(['representative', 'manager']),
  orderIndex: z.number(),
  createdBy: z.string().uuid().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
});

export type FaqResponse = z.infer<typeof faqResponseSchema>;
