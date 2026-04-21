import { z } from 'zod';

export const nestedFileSchema = z
  .looseObject({
    id: z.string().uuid(),
    title: z.string().describe('Human-readable file name displayed in the UI.'),
    documentUrl: z
      .string()
      .optional()
      .nullable()
      .describe(
        'Absolute URL to download or preview the file. Null/absent when the underlying object has been removed from storage.',
      ),
  })
  .describe('Lightweight reference to a file attached to a parent entity (notice, report, etc.).');

export const nestedEventSchema = z
  .looseObject({
    id: z.string(),
    title: z.string().describe('Event title as it appears in the calendar.'),
    type: z
      .string()
      .optional()
      .describe(
        'Event type (`service`, `inspection`, `maintenance`, `meeting`, `discussion`, `planned_works`, `waste_collection`, `other`).',
      ),
    description: z
      .string()
      .nullable()
      .optional()
      .describe('Free-form event description; null when no description was provided.'),
    startDate: z.string().describe('ISO-8601 timestamp when the event starts.'),
    endDate: z.string().describe('ISO-8601 timestamp when the event ends.'),
    color: z
      .string()
      .optional()
      .describe(
        'Calendar display color — one of `blue`, `green`, `red`, `yellow`, `purple`, `orange`, `gray`.',
      ),
    userId: z
      .string()
      .nullable()
      .optional()
      .describe('UUID of the user who created the event; null for system-scheduled events.'),
    buildingId: z.string().optional().describe('UUID of the building the event belongs to.'),
    createdAt: z.string().optional().describe('ISO-8601 timestamp when the event was created.'),
    updatedAt: z
      .string()
      .nullable()
      .optional()
      .describe('ISO-8601 timestamp of the last edit; null when never edited.'),
  })
  .describe(
    'Nested event reference embedded inside notices, failure reports and maintenance logs.',
  );

export const pollReferenceSchema = z
  .looseObject({
    id: z.string().uuid(),
    question: z.string().describe('Poll question text shown to voters.'),
    pollType: z
      .string()
      .describe('`COMMUNITY` for majority polls, `CONSENSUS` for ownership-weighted polls.'),
    deadline: z
      .string()
      .optional()
      .nullable()
      .describe(
        'ISO-8601 datetime after which votes are rejected. Null for open-ended consensus polls.',
      ),
  })
  .describe('Lightweight poll reference embedded in other entities (failure reports, logs).');
