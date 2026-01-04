import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Maintenance financed by options
 */
export const MAINTENANCE_FINANCED_BY = ['building_funds', 'insurance', 'co_owner'] as const;
export type MaintenanceFinancedByOption = (typeof MAINTENANCE_FINANCED_BY)[number];

/**
 * Maintenance financed by schema
 */
export const maintenanceFinancedBySchema = z.enum(MAINTENANCE_FINANCED_BY);

/**
 * Create maintenance log request schema
 */
export const createMaintenanceLogSchema = z.object({
  buildingId: uuidSchema,
  title: z.string().min(1, 'Title is required').max(100, 'Title must be at most 100 characters'),
  description: z.string().max(2000, 'Description must be at most 2000 characters').optional(),
  cost: z.coerce.number().min(0, 'Cost must be a positive number').optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  hasWarranty: z.boolean().optional().default(false),
  warrantyExpiresAt: z.coerce.date().optional(),
  fileIds: z.array(uuidSchema).optional().default([]),
  failureReportIds: z.array(uuidSchema).optional().default([]),
  pollIds: z.array(uuidSchema).optional().default([]),
});

/**
 * Update maintenance log request schema
 */
export const updateMaintenanceLogSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(2000).optional(),
  cost: z.coerce.number().min(0).optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  hasWarranty: z.boolean().optional(),
  warrantyExpiresAt: z.coerce.date().optional().nullable(),
  fileIds: z.array(uuidSchema).optional(),
  failureReportIds: z.array(uuidSchema).optional(),
  pollIds: z.array(uuidSchema).optional(),
});

// Inferred types
export type CreateMaintenanceLogSchema = z.infer<typeof createMaintenanceLogSchema>;
export type UpdateMaintenanceLogSchema = z.infer<typeof updateMaintenanceLogSchema>;
