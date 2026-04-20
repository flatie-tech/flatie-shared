import { z } from 'zod';

export const notificationResponseSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  body: z.string(),
  type: z.string(),
  buildingId: z.string().uuid().nullable().optional(),
  buildingName: z.string().nullable().optional(),
  data: z.record(z.string(), z.unknown()).nullable().optional(),
  read: z.boolean(),
  readAt: z.string().nullable().optional(),
  createdAt: z.string(),
});

export const notificationPreferenceItemSchema = z.looseObject({
  type: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  channels: z.array(z.string()),
});

export const notificationPreferenceCategorySchema = z.looseObject({
  category: z.string(),
  notifications: z.array(notificationPreferenceItemSchema),
});

export type NotificationResponse = z.infer<typeof notificationResponseSchema>;
export type NotificationPreferenceItem = z.infer<typeof notificationPreferenceItemSchema>;
export type NotificationPreferenceCategory = z.infer<typeof notificationPreferenceCategorySchema>;
