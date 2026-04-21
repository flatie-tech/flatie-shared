import { z } from 'zod';

export const storageUnitRoleSchema = z
  .enum(['OWNER', 'TENANT'])
  .describe('`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.');
export type StorageUnitRole = z.infer<typeof storageUnitRoleSchema>;

export const storageUnitUserSchema = z.looseObject({
  id: z.string(),
  name: z.string().describe('Display name of the storage-unit member.'),
  email: z.string().describe('Contact email of the storage-unit member.'),
  image: z
    .string()
    .nullable()
    .optional()
    .describe('Absolute URL to the member’s profile image; null when none is set.'),
  roleType: storageUnitRoleSchema.describe(
    'Relationship of this user to the storage unit (`OWNER` or `TENANT`).',
  ),
  joinedAt: z
    .string()
    .describe('ISO-8601 timestamp when the user was attached to the storage unit.'),
  ownershipPercentage: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Share of the storage unit held by this user, 0–100. Null for tenants and owners whose share was not recorded.',
    ),
});
export type StorageUnitUser = z.infer<typeof storageUnitUserSchema>;

export const storageUnitSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z
    .string()
    .describe('Storage-unit identifier or name as shown to residents (e.g. "S-04").'),
  floor: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Floor label where the storage unit is located (e.g. "Basement", "-1"); null when not recorded.',
    ),
  area: z
    .number()
    .nullable()
    .optional()
    .describe('Floor area in square metres; null when not recorded.'),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z
    .array(storageUnitUserSchema)
    .describe('Owners and tenants currently attached to the storage unit.'),
});
export type StorageUnit = z.infer<typeof storageUnitSchema>;
