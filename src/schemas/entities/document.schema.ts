import { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { multipartArray, multipartBoolean } from '../multipart.schema';

/**
 * Validation constants for the building document library.
 * A "document" is a container holding one or more child files (there is no
 * folder entity — the flat list groups by container).
 */
export const DOCUMENT_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 500,
  FILE_NAME_MAX: 255,
} as const;

/**
 * Create document request — `POST /buildings/:buildingId/files` (multipart).
 * Files are extracted by MultipartFilesInterceptor on the backend and merged
 * into the service payload, so they are not part of this schema.
 */
export const createDocumentSchema = z
  .object({
    title: z
      .string()
      .min(DOCUMENT_LIMITS.TITLE_MIN, 'title must not be empty')
      .max(DOCUMENT_LIMITS.TITLE_MAX)
      .describe('Document title, 1–100 chars.'),
    description: z
      .string()
      .max(DOCUMENT_LIMITS.DESCRIPTION_MAX)
      .optional()
      .describe('Optional markdown description, up to 500 chars.'),
    isPrivate: multipartBoolean()
      .optional()
      .describe('When true, visible only to the uploader and holders of DOCUMENT_READ_PRIVATE.'),
  })
  .meta({ id: 'CreateDocument' });

/**
 * Update document request — `PUT /buildings/:buildingId/files/:documentId`
 * (multipart). All fields optional. New files ride along as multipart parts.
 */
export const updateDocumentSchema = z
  .object({
    title: z.string().max(DOCUMENT_LIMITS.TITLE_MAX).optional().describe('Revised title.'),
    description: z
      .string()
      .max(DOCUMENT_LIMITS.DESCRIPTION_MAX)
      .optional()
      .describe('Revised description.'),
    isPrivate: multipartBoolean().optional().describe('Toggle private visibility.'),
    removeFileIds: multipartArray(uuidSchema)
      .optional()
      .describe('UUIDs of child files to detach from the document.'),
    renameFiles: multipartArray(
      z.object({
        id: uuidSchema,
        fileName: z.string().min(1).max(DOCUMENT_LIMITS.FILE_NAME_MAX),
      }),
    )
      .optional()
      .describe(
        'Rename individual child files by id (metadata only; R2 key + extension preserved).',
      ),
  })
  .meta({ id: 'UpdateDocument' });

export type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>;
