import { z } from 'zod';
import { maintenanceFinancedBySchema } from '../entities/maintenance-log.schema';
import { paginatedResponseSchema } from '../pagination.schema';
import { nestedEventSchema, nestedFileSchema, pollReferenceSchema } from './_nested';

const failureReportReferenceSchema = z
  .looseObject({
    id: z.string().uuid(),
    title: z.string().describe('Failure report title for quick UI display.'),
    status: z.string().describe('Report lifecycle status (`pending`, `in_progress`, `resolved`).'),
    createdAt: z.string().describe('ISO-8601 timestamp when the failure report was filed.'),
  })
  .describe(
    'Lightweight failure-report reference embedded in maintenance-log responses (the report this work resolved).',
  );

const expenseReferenceSchema = z
  .looseObject({
    id: z.string().uuid(),
    amount: z.number().describe('Transaction amount in EUR.'),
    description: z
      .string()
      .nullable()
      .optional()
      .describe('Free-form description; null when not set.'),
    period: z
      .string()
      .nullable()
      .optional()
      .describe('Reporting period as `YYYY-MM`; null when unset.'),
    source: z.string().describe('Provenance tag: `manual` or `camt`.'),
    createdAt: z.string().describe('ISO-8601 timestamp when the expense row was created.'),
  })
  .describe('Expense transaction linked via `expense_for`.');

export const maintenanceLogResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe('UUID of the building the work was performed in.'),
  title: z.string().describe('Short summary of the maintenance work.'),
  files: z
    .array(nestedFileSchema)
    .default([])
    .describe('Attached invoices, photos, or other documents; empty when none are uploaded.'),
  createdBy: z.string().uuid().describe('UUID of the user who logged the entry.'),
  createdByName: z
    .string()
    .nullable()
    .optional()
    .describe('Author display name; null when the creating user has been deleted.'),
  contractor: z.string().describe('Contractor or vendor who performed the work.'),
  cost: z.number().describe('Total cost in the building’s currency (two-decimal precision).'),
  financedBy: maintenanceFinancedBySchema
    .optional()
    .nullable()
    .describe(
      'Source of funds that covered the expense (`building_funds`, `insurance`, `co_owner`); null when unset.',
    ),
  warranty: z
    .boolean()
    .optional()
    .nullable()
    .describe('True when the work is covered by an active warranty. Null when not captured.'),
  categoryId: z
    .string()
    .uuid()
    .optional()
    .nullable()
    .describe('UUID of the transaction category this log rolls up into; null when uncategorised.'),
  categoryName: z
    .string()
    .optional()
    .nullable()
    .describe('Human-readable category label resolved from `categoryId`; null when uncategorised.'),
  events: z
    .array(nestedEventSchema)
    .default([])
    .describe(
      'Calendar events representing the work window. Every maintenance log must have at least one event.',
    ),
  createdAt: z.string().describe('ISO-8601 timestamp when the log was created.'),
  updatedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
  canEdit: z.boolean().describe('True when the calling user may edit this log.'),
  canDelete: z.boolean().describe('True when the calling user may delete this log.'),
  polls: z
    .array(pollReferenceSchema)
    .default([])
    .describe('Polls linked to this log (e.g. consensus to authorise the expense); empty if none.'),
  failureReports: z
    .array(failureReportReferenceSchema)
    .optional()
    .describe(
      'Failure reports this log was produced to resolve; absent when the log is standalone.',
    ),
  expenses: z
    .array(expenseReferenceSchema)
    .optional()
    .describe(
      'Expense transactions linked to this log via `entity_links` (linkType `expense_for`). Populated on detail views.',
    ),
});

export const paginatedMaintenanceLogsResponseSchema = paginatedResponseSchema(
  maintenanceLogResponseSchema,
);

export type MaintenanceLogResponse = z.infer<typeof maintenanceLogResponseSchema>;
export type PaginatedMaintenanceLogsResponse = z.infer<
  typeof paginatedMaintenanceLogsResponseSchema
>;
