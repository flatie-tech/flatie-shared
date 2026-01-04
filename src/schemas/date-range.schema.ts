import { z } from 'zod';

/**
 * Date range filter parameters schema
 */
export const dateRangeParamsSchema = z.object({
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

/**
 * Date range with datetime validation
 */
export const dateRangeWithValidationSchema = z
  .object({
    fromDate: z.string().datetime().optional(),
    toDate: z.string().datetime().optional(),
  })
  .refine(
    (data) => {
      if (data.fromDate && data.toDate) {
        return new Date(data.fromDate) <= new Date(data.toDate);
      }
      return true;
    },
    {
      message: 'fromDate must be before or equal to toDate',
      path: ['fromDate'],
    },
  );

// Inferred types
export type DateRangeParamsSchema = z.infer<typeof dateRangeParamsSchema>;
export type DateRangeWithValidationSchema = z.infer<typeof dateRangeWithValidationSchema>;
