import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * In-app bug reports: any signed-in user files one from the floating
 * button; the page URL, user agent and viewport ride along so support
 * can reproduce without a follow-up email. Platform staff triage them
 * on /platform/bug-reports.
 */

export const BUG_REPORT_STATUSES = ['new', 'in_review', 'resolved', 'dismissed'] as const;
export type BugReportStatus = (typeof BUG_REPORT_STATUSES)[number];
export const bugReportStatusSchema = z
  .enum(BUG_REPORT_STATUSES)
  .describe('Triage state of the report.');

export const BUG_REPORT_LIMITS = {
  TITLE_MAX: 120,
  DESCRIPTION_MAX: 4000,
  URL_MAX: 1000,
  NOTE_MAX: 1000,
} as const;

export const createBugReportSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(BUG_REPORT_LIMITS.TITLE_MAX)
      .describe('One-line summary of the problem.'),
    description: z
      .string()
      .trim()
      .min(1)
      .max(BUG_REPORT_LIMITS.DESCRIPTION_MAX)
      .describe('What happened, what was expected — free text.'),
    url: z
      .string()
      .trim()
      .max(BUG_REPORT_LIMITS.URL_MAX)
      .describe('The in-app URL the report was filed from, captured automatically.'),
    viewport: z
      .string()
      .trim()
      .max(40)
      .optional()
      .describe('Client viewport at report time, e.g. "1440x900", captured automatically.'),
  })
  // The id is what registers this as an OpenAPI component; without it the
  // backend's `$ref: '#/components/schemas/CreateBugReport'` dangles and
  // Swagger renders an empty request body.
  .meta({ id: 'CreateBugReport' });

export type CreateBugReportSchema = z.infer<typeof createBugReportSchema>;

export const updateBugReportSchema = z
  .object({
    status: bugReportStatusSchema.optional().describe('New triage state; omit to keep.'),
    adminNote: z
      .string()
      .trim()
      .max(BUG_REPORT_LIMITS.NOTE_MAX)
      .optional()
      .nullable()
      .describe('Internal triage note; null clears it, omit keeps it.'),
  })
  .meta({ id: 'UpdateBugReport' });

export type UpdateBugReportSchema = z.infer<typeof updateBugReportSchema>;

export const bugReportResponseSchema = z
  .looseObject({
    id: uuidSchema.describe('Report UUID.'),
    title: z.string().describe('One-line summary.'),
    description: z.string().describe('Free-text detail.'),
    url: z.string().describe('In-app URL the report was filed from.'),
    status: bugReportStatusSchema,
    screenshotUrl: z
      .string()
      .nullable()
      .describe('Presigned URL of the attached screenshot; null when none was attached.'),
    reporterName: z.string().nullable().describe('Display name of the reporter; null if deleted.'),
    reporterEmail: z.string().nullable().describe('Email of the reporter; null if deleted.'),
    userAgent: z.string().nullable().describe('Browser user agent captured at submit.'),
    viewport: z.string().nullable().describe('Viewport at submit, e.g. "1440x900".'),
    adminNote: z.string().nullable().describe('Internal triage note.'),
    createdAt: z.string().describe('ISO timestamp the report was filed.'),
  })
  .meta({ id: 'BugReportResponse' });

export const listBugReportsResponseSchema = z
  .object({
    reports: z.array(bugReportResponseSchema).describe('Reports, newest first.'),
  })
  .meta({ id: 'ListBugReportsResponse' });

export type BugReportResponse = z.infer<typeof bugReportResponseSchema>;
export type ListBugReportsResponse = z.infer<typeof listBugReportsResponseSchema>;
