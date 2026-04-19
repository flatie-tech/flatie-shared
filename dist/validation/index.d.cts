import { z } from 'zod';

declare const oibSchema: z.ZodString;
declare const optionalOibSchema: z.ZodOptional<z.ZodString>;
declare const phoneSchema: z.ZodOptional<z.ZodString>;
declare const addressSchema: z.ZodString;

export { addressSchema, oibSchema, optionalOibSchema, phoneSchema };
