import { z } from 'zod';
import { paginatedResponseSchema } from '../pagination.schema';
import { FailureStatusSchema } from '../status.schema';

/**
 * Entity types that can be the SOURCE of a file attachment link — the
 * possible values of a document's `type` / `linkedRecords[].type` besides
 * the standalone `'document'`. Kept as a constant (not a schema enum) so
 * adding a link source never breaks older clients' response parsing —
 * clients should render unknown types with a generic fallback.
 */
export const DOCUMENT_SOURCE_TYPES = [
  'notice',
  'failure_report',
  'poll',
  'event',
  'board_card',
  'expense_transaction',
] as const;

export const documentLinkedRecordSchema = z
  .looseObject({
    type: z
      .string()
      .describe(
        'Kind of entity this document is linked to. Known values are listed in DOCUMENT_SOURCE_TYPES; accepts future entity types so new link sources never break parsing.',
      ),
    id: z.string().describe('UUID of the linked entity.'),
    title: z.string().optional().nullable().describe('Title of the linked entity.'),
    status: FailureStatusSchema.optional()
      .nullable()
      .describe('Status of the linked failure report; null for other entity types.'),
    createdAt: z.string().optional().nullable().describe('ISO-8601 creation timestamp.'),
    updatedAt: z.string().optional().nullable().describe('ISO-8601 last-edit timestamp.'),
  })
  .describe('Reference to an entity linked to a document.');

export const documentFileSchema = z
  .looseObject({
    id: z.string().describe('UUID of the file record.'),
    fileUrl: z.string().describe('URL to download or preview the file.'),
    fileName: z.string().describe('Original file name as uploaded.'),
    mimeType: z
      .string()
      .optional()
      .nullable()
      .describe('MIME type of the file; null when not detected.'),
    fileSize: z
      .number()
      .optional()
      .nullable()
      .describe('File size in bytes; null when not recorded.'),
    createdAt: z.union([z.string(), z.date()]).describe('Timestamp when the file was uploaded.'),
  })
  .describe('Individual file within a document container.');

export const documentResponseSchema = z
  .looseObject({
    id: z.string().uuid().describe('UUID of the document.'),
    containerId: z
      .string()
      .uuid()
      .optional()
      .describe('UUID of the parent container; absent for standalone documents.'),
    buildingId: z.string().uuid().describe('UUID of the building this document belongs to.'),
    title: z.string().describe('Document title displayed in the UI.'),
    description: z
      .string()
      .optional()
      .nullable()
      .describe('Optional description; null when not provided.'),
    documentUrl: z
      .string()
      .optional()
      .nullable()
      .describe('Legacy single-file URL; null for multi-file documents.'),
    files: z
      .array(documentFileSchema)
      .optional()
      .default([])
      .describe('File attachments; empty array when no files are attached.'),
    uploadedBy: z
      .string()
      .uuid()
      .nullable()
      .describe(
        'UUID of the user who uploaded the document; null once that user is deleted — `files.uploaded_by` is ON DELETE SET NULL.',
      ),
    uploadedByName: z.string().describe('Display name of the uploader.'),
    createdAt: z
      .union([z.string(), z.date()])
      .describe('ISO-8601 timestamp when the document was created.'),
    updatedAt: z
      .union([z.string(), z.date()])
      .nullable()
      .optional()
      .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
    canEdit: z.boolean().describe('True when the calling user may edit this document.'),
    canDelete: z.boolean().describe('True when the calling user may delete this document.'),
    isOwner: z.boolean().describe('True when the calling user is the creator of this document.'),
    isPrivate: z
      .boolean()
      .optional()
      .default(false)
      .describe('True when the document is visible only to managers.'),
    type: z
      .string()
      .optional()
      .describe(
        "Source entity type ('document' for standalone uploads; otherwise an entity type from DOCUMENT_SOURCE_TYPES). Accepts future entity types so new link sources never break parsing.",
      ),
    sourceId: z
      .string()
      .optional()
      .describe('UUID of the source entity when type is set; absent for standalone documents.'),
    sourceTitle: z
      .string()
      .optional()
      .describe('Title of the source entity for quick display; absent for standalone documents.'),
    linkedRecords: z
      .array(documentLinkedRecordSchema)
      .optional()
      .default([])
      .describe('Entities linked to this document; empty when none.'),
    visibility: z
      .enum(['public', 'private'])
      .optional()
      .describe('Document visibility level; absent when the building uses default visibility.'),
  })
  .describe('Document response from list and detail endpoints.');

export const paginatedDocumentsResponseSchema = paginatedResponseSchema(documentResponseSchema);

import type { Strict } from './_strict';

export type DocumentLinkedRecord = Strict<z.infer<typeof documentLinkedRecordSchema>>;
export type DocumentFile = Strict<z.infer<typeof documentFileSchema>>;
export type DocumentResponse = Strict<z.infer<typeof documentResponseSchema>>;
export type PaginatedDocumentsResponse = Strict<z.infer<typeof paginatedDocumentsResponseSchema>>;
