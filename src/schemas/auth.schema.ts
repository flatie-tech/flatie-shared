import { z } from 'zod';

/**
 * Common field schemas for authentication
 */
export const emailSchema = z.string().email();

export const passwordSchema = z.string().min(8).max(128);

/**
 * NIST SP 800-63B-4 style policy: length is the only client-checkable rule
 * (8-128, long passphrases welcome). Composition classes (forced upper/
 * lower/digit) were dropped 2026-07 — they push users toward predictable
 * patterns. Breached-password screening happens server-side (HIBP k-anonymity
 * in flatie-backend's auth hooks) and surfaces as a WEAK_PASSWORD error.
 */
export const strongPasswordSchema = passwordSchema;

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional().default(false),
});

/**
 * Registration form schema
 */
export const registerSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: emailSchema,
    password: strongPasswordSchema,
    passwordConfirmation: z.string(),
    agreedToTermsAndConditions: z.boolean().refine((data) => data, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

/**
 * Forgot password form schema (request password reset)
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * Reset password form schema
 */
export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    token: z.string().min(1),
    password: strongPasswordSchema,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

/**
 * OTP verification schema
 */
export const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().min(4).max(4),
});

/**
 * Update password schema (when already logged in)
 */
export const updatePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Inferred types
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
