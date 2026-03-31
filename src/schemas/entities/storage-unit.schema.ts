import { z } from 'zod';

export const storageUnitRoleSchema = z.enum(['OWNER', 'TENANT']);
export type StorageUnitRole = z.infer<typeof storageUnitRoleSchema>;

export const storageUnitUserSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable().optional(),
  roleType: storageUnitRoleSchema,
  joinedAt: z.string(),
  ownershipPercentage: z.number().nullable().optional(),
});
export type StorageUnitUser = z.infer<typeof storageUnitUserSchema>;

export const storageUnitSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z.string(),
  floor: z.string().nullable().optional(),
  area: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(storageUnitUserSchema),
});
export type StorageUnit = z.infer<typeof storageUnitSchema>;
