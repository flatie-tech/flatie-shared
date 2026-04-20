import { z } from 'zod';

export const nestedFileSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  documentUrl: z.string().optional().nullable(),
});

export const nestedEventSchema = z.looseObject({
  id: z.string(),
  title: z.string(),
  type: z.string().optional(),
  description: z.string().nullable().optional(),
  startDate: z.string(),
  endDate: z.string(),
  color: z.string().optional(),
  userId: z.string().nullable().optional(),
  buildingId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
});

export const pollReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  question: z.string(),
  pollType: z.string(),
  deadline: z.string().optional().nullable(),
});
