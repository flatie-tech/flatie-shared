import { z } from 'zod';

/**
 * Business partner (Croatian "poslovni partner") scoped to an
 * organization. Address-book with bookkeeping fields — later linkable
 * to expense transactions via `expense_transactions.partner_id`.
 *
 * `oib` and `taxNumber` are separate on purpose: `oib` is the 11-digit
 * Croatian tax ID, while `taxNumber` ("broj poreznog obveznika") is a
 * free-form field used for foreign partners with non-HR tax IDs.
 */
export const businessPartnerResponseSchema = z
  .object({
    id: z.string().uuid(),
    organizationId: z.string().uuid(),
    name: z.string(),
    code: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    mobile: z.string().nullable().optional(),
    contactPerson: z.string().nullable().optional(),
    iban: z.string().nullable().optional(),
    bankAccount: z.string().nullable().optional(),
    taxNumber: z.string().nullable().optional(),
    oib: z.string().nullable().optional(),
    isVatPayer: z.boolean(),
    isActive: z.boolean(),
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
  })
  .meta({ id: 'BusinessPartnerResponse' });

export type BusinessPartnerResponse = z.infer<typeof businessPartnerResponseSchema>;

export const createBusinessPartnerSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    code: z.string().trim().max(50).optional().nullable(),
    city: z.string().trim().max(100).optional().nullable(),
    email: z.string().trim().email().optional().nullable(),
    address: z.string().trim().max(500).optional().nullable(),
    postalCode: z.string().trim().max(20).optional().nullable(),
    phone: z.string().trim().max(50).optional().nullable(),
    mobile: z.string().trim().max(50).optional().nullable(),
    contactPerson: z.string().trim().max(200).optional().nullable(),
    iban: z.string().trim().max(50).optional().nullable(),
    bankAccount: z.string().trim().max(50).optional().nullable(),
    taxNumber: z.string().trim().max(50).optional().nullable(),
    oib: z
      .string()
      .regex(/^\d{11}$/, 'OIB must be exactly 11 digits')
      .optional()
      .nullable(),
    isVatPayer: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
  .meta({ id: 'CreateBusinessPartner' });

export type CreateBusinessPartnerInput = z.infer<typeof createBusinessPartnerSchema>;

export const updateBusinessPartnerSchema = createBusinessPartnerSchema
  .partial()
  .meta({ id: 'UpdateBusinessPartner' });
export type UpdateBusinessPartnerInput = z.infer<typeof updateBusinessPartnerSchema>;
