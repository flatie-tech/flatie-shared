import { z } from 'zod';

export const garageRoleSchema = z
  .enum(['OWNER', 'TENANT'])
  .describe(
    '`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.',
  );
export type GarageRole = z.infer<typeof garageRoleSchema>;

export const garageUserSchema = z.looseObject({
  id: z.string(),
  name: z.string().describe('Display name of the garage member.'),
  email: z.string().describe('Contact email of the garage member.'),
  image: z
    .string()
    .nullable()
    .optional()
    .describe('Absolute URL to the member’s profile image; null when none is set.'),
  roleType: garageRoleSchema.describe(
    'Relationship of this user to the garage (`OWNER` or `TENANT`).',
  ),
  joinedAt: z
    .string()
    .describe('ISO-8601 timestamp when the user was attached to the garage.'),
  ownershipPercentage: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Share of the garage held by this user, 0–100. Null for tenants and owners whose share was not recorded.',
    ),
});
export type GarageUser = z.infer<typeof garageUserSchema>;

export const garageSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z
    .string()
    .describe('Garage identifier or name as shown to residents (e.g. "G-12").'),
  floor: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Floor label where the garage is located (e.g. "Basement", "-1"); null when not recorded.',
    ),
  area: z
    .number()
    .nullable()
    .optional()
    .describe('Floor area in square metres; null when not recorded.'),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z
    .array(garageUserSchema)
    .describe('Owners and tenants currently attached to the garage.'),
});
export type Garage = z.infer<typeof garageSchema>;
