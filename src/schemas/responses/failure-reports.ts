import { z } from 'zod';
import { maintenanceFinancedBySchema } from '../entities/maintenance-log.schema';
import { paginatedResponseSchema } from '../pagination.schema';
import { FailureStatusSchema, PrioritySchema } from '../status.schema';
import { nestedEventSchema, nestedFileSchema, pollReferenceSchema } from './_nested';
import type { Strict } from './_strict';

const maintenanceLogReferenceSchema = z
  .looseObject({
    id: z.string().uuid(),
    title: z.string().describe('Maintenance log title for quick UI display.'),
    contractor: z.string().describe('Contractor or vendor who performed the work.'),
    cost: z
      .number()
      .optional()
      .nullable()
      .describe('Total cost in the building’s currency; null when the cost was not recorded.'),
    financedBy: maintenanceFinancedBySchema
      .optional()
      .nullable()
      .describe(
        'Source of funds that covered the expense (`building_funds`, `insurance`, `co_owner`).',
      ),
    warranty: z
      .boolean()
      .optional()
      .nullable()
      .describe(
        'True when the work is covered by an active warranty. Null when the warranty status was not captured.',
      ),
  })
  .describe(
    'Lightweight maintenance-log reference embedded in failure report responses (link to the follow-up work record).',
  );

export const failureReportResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe('UUID of the building the report was filed against.'),
  title: z.string().describe('Short summary of the reported failure.'),
  description: z
    .string()
    .optional()
    .nullable()
    .describe('Detailed description of the failure; null when the reporter left it blank.'),
  files: z
    .array(nestedFileSchema)
    .default([])
    .describe('Attached photos or documents supporting the report; empty array when none.'),
  submittedBy: z
    .string()
    .uuid()
    .nullable()
    .describe(
      'UUID of the reporting user. Null when the reporting user has been deleted from the platform.',
    ),
  submittedByName: z
    .string()
    .optional()
    .nullable()
    .describe(
      'Reporter display name. Null when `isAnonymous` is true or the user has been deleted.',
    ),
  status: FailureStatusSchema.describe(
    'Lifecycle status: `pending` (newly filed), `in_progress` (assigned work), `resolved` (closed out).',
  ),
  approved: z
    .boolean()
    .describe('True when a representative has approved the report for public visibility.'),
  isAnonymous: z
    .boolean()
    .optional()
    .default(false)
    .describe('True when the reporter opted to hide their identity from other residents.'),
  priority: PrioritySchema.optional()
    .nullable()
    .describe(
      '`normal` for standard reports, `urgent` to flag immediate attention. Null when unset.',
    ),
  createdAt: z.string().describe('ISO-8601 timestamp when the report was filed.'),
  updatedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
  allowComments: z
    .boolean()
    .optional()
    .default(true)
    .describe('True when comments are enabled on this failure report.'),
  canEdit: z.boolean().describe('True when the calling user is allowed to edit this report.'),
  canDelete: z.boolean().describe('True when the calling user is allowed to delete this report.'),
  canApprove: z.boolean().describe('True when the calling user may approve or reject the report.'),
  canStatus: z
    .boolean()
    .describe(
      'True when the calling user may change the lifecycle status (e.g. mark as in progress or resolved).',
    ),
  locationType: z
    .string()
    .optional()
    .nullable()
    .describe('`common_area` or `own_unit`. Null when the location has not been classified.'),
  commonAreaDescription: z
    .string()
    .optional()
    .nullable()
    .describe('Free-text location when `locationType` is `common_area`; null otherwise.'),
  unitType: z
    .string()
    .optional()
    .nullable()
    .describe(
      'Kind of unit when `locationType` is `own_unit` (`apartment`, `garage`, `storage_unit`); null otherwise.',
    ),
  unitId: z
    .string()
    .uuid()
    .optional()
    .nullable()
    .describe('UUID of the specific unit when `locationType` is `own_unit`; null otherwise.'),
  unitName: z
    .string()
    .optional()
    .nullable()
    .describe('Resolved human-readable label of the unit (e.g. "Apartment 4B"); null when unset.'),
  events: z
    .array(nestedEventSchema)
    .default([])
    .describe('Events (scheduled work or meetings) linked to this report; empty when none.'),
  maintenanceLogs: z
    .array(maintenanceLogReferenceSchema)
    .default([])
    .describe('Maintenance logs produced to resolve this report; empty when none.'),
  polls: z
    .array(pollReferenceSchema)
    .default([])
    .describe('Polls created to gather resident input on this report; empty when none.'),
});

export const paginatedFailureReportsResponseSchema = paginatedResponseSchema(
  failureReportResponseSchema,
);

export type FailureReportResponse = Strict<z.infer<typeof failureReportResponseSchema>>;
export type PaginatedFailureReportsResponse = Strict<
  z.infer<typeof paginatedFailureReportsResponseSchema>
>;
