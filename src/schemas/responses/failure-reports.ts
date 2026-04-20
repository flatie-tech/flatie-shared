import { z } from 'zod';
import { maintenanceFinancedBySchema } from '../entities/maintenance-log.schema';
import { paginatedResponseSchema } from '../pagination.schema';
import { FailureStatusSchema, PrioritySchema } from '../status.schema';
import { nestedEventSchema, nestedFileSchema, pollReferenceSchema } from './_nested';

const maintenanceLogReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  contractor: z.string(),
  cost: z.number().optional().nullable(),
  financedBy: maintenanceFinancedBySchema.optional().nullable(),
  warranty: z.boolean().optional().nullable(),
});

export const failureReportResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  title: z.string(),
  description: z.string().optional().nullable(),
  files: z.array(nestedFileSchema).default([]),
  submittedBy: z.string().uuid().nullable(),
  submittedByName: z.string().optional().nullable(),
  status: FailureStatusSchema,
  approved: z.boolean(),
  isAnonymous: z.boolean().optional().default(false),
  priority: PrioritySchema.optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canApprove: z.boolean(),
  canStatus: z.boolean(),
  locationType: z.string().optional().nullable(),
  commonAreaDescription: z.string().optional().nullable(),
  unitType: z.string().optional().nullable(),
  unitId: z.string().uuid().optional().nullable(),
  unitName: z.string().optional().nullable(),
  events: z.array(nestedEventSchema).default([]),
  maintenanceLogs: z.array(maintenanceLogReferenceSchema).default([]),
  polls: z.array(pollReferenceSchema).default([]),
});

export const paginatedFailureReportsResponseSchema = paginatedResponseSchema(
  failureReportResponseSchema,
);

export type FailureReportResponse = z.infer<typeof failureReportResponseSchema>;
export type PaginatedFailureReportsResponse = z.infer<typeof paginatedFailureReportsResponseSchema>;
