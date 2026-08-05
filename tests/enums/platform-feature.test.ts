import { describe, expect, it } from 'vitest';
import {
  getBuildingFeatureDefault,
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
  const EMAIL = PlatformFeature.BUILDING_EMAIL; // buildingSettingKey, defaults OFF (parked)
  const AI = PlatformFeature.AI_ASSISTANT; // global-only
  const FAQ = PlatformFeature.FAQ; // buildingSettingKey, defaults ON (live)

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

  it('a missing per-building value falls back to the column default', () => {
    // Parked feature ⇒ the default is false, so this still fails closed.
    expect(
      isFeatureAvailable({
        feature: EMAIL,
        platformFlags: { [EMAIL]: true },
        buildingSettings: {},
      }),
    ).toBe(false);
    // Live feature ⇒ the default is true. A flat `false` here is what made FAQ
    // and chat blink out of the nav on every cold load.
    expect(
      isFeatureAvailable({
        feature: FAQ,
        platformFlags: { [FAQ]: true },
        buildingSettings: {},
      }),
    ).toBe(true);
  });

  it('a live feature survives a settings row that is still in flight', () => {
    // `null` is what the web hook passes while the settings query resolves.
    expect(
      isFeatureAvailable({
        feature: FAQ,
        platformFlags: { [FAQ]: true },
        buildingSettings: null,
      }),
    ).toBe(true);
    expect(
      isFeatureAvailable({ feature: FAQ, platformFlags: { [FAQ]: true }, loading: true }),
    ).toBe(true);
  });

  it('a live feature is still switchable off, per building and platform-wide', () => {
    expect(
      isFeatureAvailable({
        feature: FAQ,
        platformFlags: { [FAQ]: true },
        buildingSettings: { faqEnabled: false },
      }),
    ).toBe(false);
    expect(
      isFeatureAvailable({
        feature: FAQ,
        platformFlags: { [FAQ]: false },
        buildingSettings: { faqEnabled: true },
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

  it('a null settings row keeps a PARKED feature unavailable', () => {
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

describe('getBuildingFeatureDefault', () => {
  // The backend guard and the override count both read defaults through this, so
  // a wrong answer either hides a live feature or exposes a parked one.
  it('reports each toggle default from the feature that owns it', () => {
    expect(getBuildingFeatureDefault('emailEnabled')).toBe(false);
    expect(getBuildingFeatureDefault('faqEnabled')).toBe(true);
    expect(getBuildingFeatureDefault('chatEnabled')).toBe(true);
  });

  it('agrees with the metadata for every registered toggle', () => {
    for (const feature of PLATFORM_FEATURES) {
      const key = PLATFORM_FEATURE_META[feature].buildingSettingKey;
      if (!key) continue;
      expect(getBuildingFeatureDefault(key)).toBe(PLATFORM_FEATURE_META[feature].defaultEnabled);
    }
  });
});
