import { z } from 'zod';

export const garageRoleSchema = z.enum(['OWNER', 'TENANT']);
export type GarageRole = z.infer<typeof garageRoleSchema>;

export const garageUserSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable().optional(),
  roleType: garageRoleSchema,
  joinedAt: z.string(),
  ownershipPercentage: z.number().nullable().optional(),
});
export type GarageUser = z.infer<typeof garageUserSchema>;

export const garageSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z.string(),
  floor: z.string().nullable().optional(),
  area: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(garageUserSchema),
});
export type Garage = z.infer<typeof garageSchema>;
