import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Create failure report request schema
 */
export const createFailureReportSchema = z.object({
  buildingId: uuidSchema,
  title: z.string().min(1, 'Title is required').max(100, 'Title must be at most 100 characters'),
  description: z.string().max(2000, 'Description must be at most 2000 characters').optional(),
  fileIds: z.array(uuidSchema).optional().default([]),
  maintenanceLogIds: z.array(uuidSchema).optional().default([]),
});

/**
 * Update failure report request schema
 */
export const updateFailureReportSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(2000).optional(),
  fileIds: z.array(uuidSchema).optional(),
  maintenanceLogIds: z.array(uuidSchema).optional(),
});

/**
 * Approve failure report request schema
 */
export const approveFailureReportSchema = z.object({
  approved: z.boolean(),
});

// Inferred types
export type CreateFailureReportSchema = z.infer<typeof createFailureReportSchema>;
export type UpdateFailureReportSchema = z.infer<typeof updateFailureReportSchema>;
export type ApproveFailureReportSchema = z.infer<typeof approveFailureReportSchema>;
