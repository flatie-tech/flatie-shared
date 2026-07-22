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
    /** FK into the DGU-backed `addresses` table; null for legacy free-text rows. */
    addressId: z.string().uuid().nullable().optional(),
    paymentRefCode: z.string().nullable().optional(),
    /** When a representative last sent this owner a building invite; null when never invited. */
    lastInvitedAt: z.union([z.string(), z.date()]).nullable().optional(),
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
    // Structured address (DGU reference model). Either send `addressId`
    // directly, or `streetId` + `houseNumber` for the backend to resolve
    // (mirrors the building create/update contract). Free-text `address`
    // alone remains valid as the unstructured fallback.
    addressId: z.string().uuid().optional().nullable(),
    streetId: z.string().uuid().optional().nullable(),
    houseNumber: z.string().trim().min(1).max(20).optional().nullable(),
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

/**
 * Invite an owner to register. Valid only for owner rows that have an
 * email and no linked user; the backend sends the standard building
 * OTP invite to `owner.email` and stamps `lastInvitedAt`.
 */
export const inviteOwnerSchema = z
  .object({
    message: z
      .string()
      .trim()
      .max(500)
      .optional()
      .describe('Optional personal message included in the invite email.'),
  })
  .meta({ id: 'InviteOwner' });

export type InviteOwnerInput = z.infer<typeof inviteOwnerSchema>;
