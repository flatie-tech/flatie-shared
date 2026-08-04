import { z } from 'zod';
import { PLATFORM_FEATURES } from '../../enums/platform-feature.enum';
import type { Strict } from './_strict';

const platformFeatureKeySchema = z
  .enum(PLATFORM_FEATURES as [string, ...string[]])
  .describe('Platform feature key (see PlatformFeature in @flatie/shared/enums).');

export const platformFeatureFlagSchema = z
  .looseObject({
    key: platformFeatureKeySchema,
    enabled: z
      .boolean()
      .describe('Effective platform-wide state. False = parked/off for everyone.'),
    note: z
      .string()
      .nullable()
      .optional()
      .describe('Free-text reason recorded by the admin who last flipped it.'),
    updatedAt: z
      .string()
      .nullable()
      .optional()
      .describe('ISO-8601 timestamp of the last change; null when never changed.'),
    updatedByName: z
      .string()
      .nullable()
      .optional()
      .describe('Display name of the platform admin who last changed it.'),
    /** How many buildings have narrowed this feature via its per-building toggle. */
    buildingOverrideCount: z.coerce
      .number()
      .nullable()
      .optional()
      .describe(
        'Buildings whose per-building toggle disables this feature; null when the feature has no per-building column.',
      ),
  })
  .describe('One platform feature flag, as shown on /platform/features.');

export const platformFeatureFlagsResponseSchema = z
  .looseObject({
    flags: z
      .array(platformFeatureFlagSchema)
      .describe('Every known platform feature, whether or not it has a stored row yet.'),
  })
  .describe('Admin view of every platform feature flag.');

export const featureFlagsResponseSchema = z
  .looseObject({
    flags: z
      .record(z.string(), z.boolean())
      .describe('Feature key → effective platform-wide enabled state.'),
  })
  .describe(
    'Lightweight flag map for clients (`GET /feature-flags`) — drives nav/widget visibility. Poll-friendly; no admin metadata.',
  );

export type PlatformFeatureFlag = Strict<z.infer<typeof platformFeatureFlagSchema>>;
export type PlatformFeatureFlagsResponse = Strict<
  z.infer<typeof platformFeatureFlagsResponseSchema>
>;
export type FeatureFlagsResponse = Strict<z.infer<typeof featureFlagsResponseSchema>>;
