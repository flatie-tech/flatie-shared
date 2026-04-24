import { z } from 'zod';

/**
 * Owner entity. Decoupled from `user` — `userId` is nullable and set
 * only when the physical person has registered on Flatie (auto-linked
 * by email match across buildings, or manually via the admin UI).
 */
export const ownerResponseSchema = z
  .object({
    id: z.string().uuid(),
    buildingId: z.string().uuid(),
    userId: z.string().uuid().nullable().optional(),
    fullName: z.string(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    oib: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    paymentRefCode: z.string().nullable().optional(),
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
  })
  .meta({ id: 'OwnerResponse' });

export type OwnerResponse = z.infer<typeof ownerResponseSchema>;

/**
 * Create-owner request. `fullName` is the only hard requirement; the
 * rest are optional because the org may record just what they have.
 * If an email is given and it matches an existing user, the backend
 * auto-links the new owner to that user.
 */
export const createOwnerSchema = z
  .object({
    fullName: z.string().trim().min(1).max(200),
    email: z.string().trim().email().optional().nullable(),
    phone: z.string().trim().max(50).optional().nullable(),
    oib: z
      .string()
      .regex(/^\d{11}$/, 'OIB must be exactly 11 digits')
      .optional()
      .nullable(),
    address: z.string().trim().max(500).optional().nullable(),
    paymentRefCode: z.string().trim().max(22).optional().nullable(),
    userId: z.string().uuid().optional().nullable(),
  })
  .meta({ id: 'CreateOwner' });

export type CreateOwnerInput = z.infer<typeof createOwnerSchema>;

export const updateOwnerSchema = createOwnerSchema.partial().meta({ id: 'UpdateOwner' });
export type UpdateOwnerInput = z.infer<typeof updateOwnerSchema>;

/**
 * Assign an owner to a unit (apartment/garage/storage). Closes any
 * existing open assignment on that unit by owner-id via the service
 * (not modeled in this schema — purely a request shape).
 */
export const assignOwnerSchema = z
  .object({
    ownerId: z.string().uuid(),
    ownershipPercentage: z.number().min(0).max(100).nullable().optional(),
  })
  .meta({ id: 'AssignOwner' });

export type AssignOwnerInput = z.infer<typeof assignOwnerSchema>;
