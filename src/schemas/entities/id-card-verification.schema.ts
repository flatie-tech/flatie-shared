import { z } from 'zod';

export const submitIdCardVerificationSchema = z
  .object({
    idCardNumber: z
      .string()
      .min(9, 'ID card number must be 9 characters')
      .max(9, 'ID card number must be 9 characters')
      .regex(/^\d{9}$/, 'ID card number must be exactly 9 digits'),
  })
  .meta({ id: 'SubmitIdCardVerification' });

export type SubmitIdCardVerificationSchema = z.infer<typeof submitIdCardVerificationSchema>;

export const rejectIdCardVerificationSchema = z
  .object({
    reason: z.string().min(1).max(500),
  })
  .meta({ id: 'RejectIdCardVerification' });

export type RejectIdCardVerificationSchema = z.infer<typeof rejectIdCardVerificationSchema>;

export const idCardVerificationStatusSchema = z.enum(['pending', 'approved', 'rejected']);

export type IdCardVerificationStatus = z.infer<typeof idCardVerificationStatusSchema>;
