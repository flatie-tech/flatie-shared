import { describe, expect, it } from 'vitest';
import {
  PLATFORM_FEATURE_META,
  PLATFORM_FEATURES,
  PlatformFeature,
} from '../../src/enums/platform-feature.enum';
import { buildingSettingsResponseSchema } from '../../src/schemas/responses';
import { isFeatureAvailable } from '../../src/utils/feature-availability';

/**
 * Mirrors the backend's `subscription-gated-features.spec.ts` idea: catch a
 * mis-registered flag at test time rather than as a silently-unavailable
 * feature in production.
 */
describe('PLATFORM_FEATURE_META registry', () => {
  it('every PlatformFeature has metadata', () => {
    for (const feature of PLATFORM_FEATURES) {
      expect(PLATFORM_FEATURE_META[feature], `metadata for "${feature}"`).toBeDefined();
    }
    expect(Object.keys(PLATFORM_FEATURE_META).sort()).toEqual([...PLATFORM_FEATURES].sort());
  });

  it('every buildingSettingKey is a real boolean field on the building-settings response', () => {
    // Parse a fully-populated row so we can inspect the resolved shape.
    const shape = buildingSettingsResponseSchema.shape as Record<string, unknown>;
    for (const feature of PLATFORM_FEATURES) {
      const key = PLATFORM_FEATURE_META[feature]?.buildingSettingKey;
      if (!key) continue;
      expect(shape[key], `buildingSettingKey "${key}" for feature "${feature}"`).toBeDefined();
    }
  });

  it('keys are per-feature (coarse), never per-action like FEATURE_TIERS', () => {
    // FEATURE_TIERS uses `domain:action`; platform flags must not, or the two
    // registries become indistinguishable.
    for (const feature of PLATFORM_FEATURES) {
      expect(feature).not.toContain(':');
      expect(feature).toMatch(/^[a-z][a-z0-9_]*$/);
    }
  });
});

describe('isFeatureAvailable — resolution order', () => {
  const EMAIL = PlatformFeature.BUILDING_EMAIL; // has buildingSettingKey: emailEnabled
  const AI = PlatformFeature.AI_ASSISTANT; // global-only

  it('platform flag off wins over an enabled building toggle (ceiling)', () => {
    expect(
      isFeatureAvailable({
        feature: EMAIL,
        platformFlags: { [EMAIL]: false },
        buildingSettings: { emailEnabled: true },
      }),
    ).toBe(false);
  });

  it('platform flag on + building toggle on ⇒ available', () => {
    expect(
      isFeatureAvailable({
        feature: EMAIL,
        platformFlags: { [EMAIL]: true },
        buildingSettings: { emailEnabled: true },
      }),
    ).toBe(true);
  });

  it('platform flag on + building toggle off ⇒ unavailable (building narrows)', () => {
    expect(
      isFeatureAvailable({
        feature: EMAIL,
        platformFlags: { [EMAIL]: true },
        buildingSettings: { emailEnabled: false },
      }),
    ).toBe(false);
  });

  it('a missing per-building value is treated as NOT enabled (fail closed)', () => {
    expect(
      isFeatureAvailable({
        feature: EMAIL,
        platformFlags: { [EMAIL]: true },
        buildingSettings: {},
      }),
    ).toBe(false);
  });

  it('while loading, a parked feature stays hidden (no cold-load flicker)', () => {
    expect(isFeatureAvailable({ feature: AI, loading: true })).toBe(false);
    expect(isFeatureAvailable({ feature: EMAIL, loading: true })).toBe(false);
  });

  it('an unloaded flag map falls back to defaultEnabled, not to visible', () => {
    expect(isFeatureAvailable({ feature: AI, platformFlags: undefined })).toBe(false);
  });

  it('global-only features ignore building settings entirely', () => {
    expect(
      isFeatureAvailable({
        feature: AI,
        platformFlags: { [AI]: true },
        buildingSettings: { emailEnabled: false },
      }),
    ).toBe(true);
  });

  it('no building in context does not hide a building-scoped feature', () => {
    // Global surfaces (e.g. the top-level nav outside a building) can only
    // evaluate the platform layer.
    expect(
      isFeatureAvailable({
        feature: EMAIL,
        platformFlags: { [EMAIL]: true },
        buildingSettings: undefined,
      }),
    ).toBe(true);
  });

  it('an explicitly null building settings row means unavailable', () => {
    expect(
      isFeatureAvailable({
        feature: EMAIL,
        platformFlags: { [EMAIL]: true },
        buildingSettings: null,
      }),
    ).toBe(false);
  });

  it('an unknown feature key fails closed', () => {
    expect(
      isFeatureAvailable({
        feature: 'not_a_feature' as PlatformFeature,
        platformFlags: { not_a_feature: true } as never,
      }),
    ).toBe(false);
  });
});
