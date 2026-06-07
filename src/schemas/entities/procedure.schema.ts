import { z } from 'zod';
import { uuidSchema } from '../base.schema';

export const PROCEDURE_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 150,
  DESCRIPTION_MAX: 2000,
  PHASE_TITLE_MAX: 150,
  PHASE_DESCRIPTION_MAX: 500,
  ENTRY_TITLE_MAX: 200,
  ENTRY_CONTENT_MAX: 5000,
  FIRM_NAME_MAX: 200,
  SCOPE_DESCRIPTION_MAX: 2000,
} as const;

export const PROCEDURE_STATUSES = ['active', 'completed', 'archived'] as const;
export const PHASE_STATUSES = ['not_started', 'in_progress', 'completed'] as const;
export const PROCEDURE_ENTRY_TYPES = [
  'note',
  'procurement',
  'vote',
  'document',
  'milestone',
] as const;

export const createProcedureSchema = z.object({
  title: z
    .string()
    .min(PROCEDURE_LIMITS.TITLE_MIN, 'Title is required')
    .max(
      PROCEDURE_LIMITS.TITLE_MAX,
      `Title must be at most ${PROCEDURE_LIMITS.TITLE_MAX} characters`,
    ),
  description: z.string().max(PROCEDURE_LIMITS.DESCRIPTION_MAX).optional(),
  templateSlug: z.string().optional(),
});

export const updateProcedureSchema = z.object({
  title: z.string().min(PROCEDURE_LIMITS.TITLE_MIN).max(PROCEDURE_LIMITS.TITLE_MAX).optional(),
  description: z.string().max(PROCEDURE_LIMITS.DESCRIPTION_MAX).nullable().optional(),
  status: z.enum(PROCEDURE_STATUSES).optional(),
});

export const createPhaseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(PROCEDURE_LIMITS.PHASE_TITLE_MAX),
  description: z.string().max(PROCEDURE_LIMITS.PHASE_DESCRIPTION_MAX).optional(),
});

export const updatePhaseSchema = z.object({
  title: z.string().min(1).max(PROCEDURE_LIMITS.PHASE_TITLE_MAX).optional(),
  description: z.string().max(PROCEDURE_LIMITS.PHASE_DESCRIPTION_MAX).nullable().optional(),
  status: z.enum(PHASE_STATUSES).optional(),
});

export const reorderPhasesSchema = z.object({
  phaseIds: z.array(uuidSchema).min(1),
});

export const createEntrySchema = z.object({
  phaseId: uuidSchema,
  type: z.enum(PROCEDURE_ENTRY_TYPES),
  title: z.string().max(PROCEDURE_LIMITS.ENTRY_TITLE_MAX).optional(),
  content: z.string().max(PROCEDURE_LIMITS.ENTRY_CONTENT_MAX).optional(),
  documentUrl: z.string().url().optional(),
});

export const updateEntrySchema = z.object({
  title: z.string().max(PROCEDURE_LIMITS.ENTRY_TITLE_MAX).nullable().optional(),
  content: z.string().max(PROCEDURE_LIMITS.ENTRY_CONTENT_MAX).nullable().optional(),
  documentUrl: z.string().url().nullable().optional(),
});

export const createQuoteSchema = z.object({
  firmName: z.string().min(1, 'Firm name is required').max(PROCEDURE_LIMITS.FIRM_NAME_MAX),
  price: z.number().positive().optional(),
  currency: z.string().max(3).default('EUR'),
  scopeDescription: z.string().max(PROCEDURE_LIMITS.SCOPE_DESCRIPTION_MAX).optional(),
  documentUrl: z.string().url().optional(),
});

export const updateQuoteSchema = z.object({
  firmName: z.string().min(1).max(PROCEDURE_LIMITS.FIRM_NAME_MAX).optional(),
  price: z.number().positive().nullable().optional(),
  currency: z.string().max(3).optional(),
  scopeDescription: z.string().max(PROCEDURE_LIMITS.SCOPE_DESCRIPTION_MAX).nullable().optional(),
  documentUrl: z.string().url().nullable().optional(),
});

export const createVoteFromProcurementSchema = z.object({
  question: z.string().min(5).max(250),
  pollType: z.enum(['consensus', 'community']).default('community'),
  deadline: z.coerce.date().optional(),
});

// Inferred types
export type CreateProcedureSchema = z.infer<typeof createProcedureSchema>;
export type UpdateProcedureSchema = z.infer<typeof updateProcedureSchema>;
export type CreatePhaseSchema = z.infer<typeof createPhaseSchema>;
export type UpdatePhaseSchema = z.infer<typeof updatePhaseSchema>;
export type ReorderPhasesSchema = z.infer<typeof reorderPhasesSchema>;
export type CreateEntrySchema = z.infer<typeof createEntrySchema>;
export type UpdateEntrySchema = z.infer<typeof updateEntrySchema>;
export type CreateQuoteSchema = z.infer<typeof createQuoteSchema>;
export type UpdateQuoteSchema = z.infer<typeof updateQuoteSchema>;
export type CreateVoteFromProcurementSchema = z.infer<typeof createVoteFromProcurementSchema>;
