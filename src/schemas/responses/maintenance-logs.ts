import { z } from 'zod';
import { maintenanceFinancedBySchema } from '../entities/maintenance-log.schema';
import { paginatedResponseSchema } from '../pagination.schema';

const nestedFileSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  documentUrl: z.string().optional().nullable(),
});

const nestedEventSchema = z.looseObject({
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

const pollReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  question: z.string(),
  pollType: z.string(),
  deadline: z.string().optional().nullable(),
});

const failureReportReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

export const maintenanceLogResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  title: z.string(),
  files: z.array(nestedFileSchema).default([]),
  createdBy: z.string().uuid(),
  createdByName: z.string().nullable().optional(),
  contractor: z.string(),
  cost: z.number(),
  financedBy: maintenanceFinancedBySchema.optional().nullable(),
  warranty: z.boolean().optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  categoryName: z.string().optional().nullable(),
  events: z.array(nestedEventSchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  polls: z.array(pollReferenceSchema).default([]),
  failureReports: z.array(failureReportReferenceSchema).optional(),
});

export const paginatedMaintenanceLogsResponseSchema = paginatedResponseSchema(
  maintenanceLogResponseSchema,
);

export type MaintenanceLogResponse = z.infer<typeof maintenanceLogResponseSchema>;
export type PaginatedMaintenanceLogsResponse = z.infer<
  typeof paginatedMaintenanceLogsResponseSchema
>;
