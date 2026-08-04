import {
  type PlatformFeature,
  PLATFORM_FEATURE_META,
} from '../enums/platform-feature.enum';

export interface FeatureAvailabilityInput {
  feature: PlatformFeature;
  /**
   * Platform flag map from `GET /feature-flags`. `undefined` means "not loaded
   * yet" — pass `loading` too so the resolver can be explicit about it.
   */
  platformFlags?: Partial<Record<PlatformFeature, boolean>>;
  /**
   * The building's settings row, when the caller has a building in context.
   * Only consulted for features whose metadata names a `buildingSettingKey`.
   */
  buildingSettings?: Partial<Record<string, unknown>> | null;
  /** True while `platformFlags` (or the building settings) are still in flight. */
  loading?: boolean;
}

/**
 * THE single resolver for "should this feature be visible / callable?".
 *
 * Every nav filter, tab filter, widget mount and page guard calls this instead
 * of hand-rolling a predicate. Before it existed the same
 * `settings.chatEnabled`-style check was duplicated in ~5 places on web, all
 * with the `if (!settings) return true` idiom that makes a parked feature flash
 * into view on every cold load.
 *
 * Resolution order, most restrictive first:
 *   1. Platform flag off  → false. A ceiling; nothing can override it upward.
 *   2. Still loading      → the feature's `defaultEnabled`, so parked features
 *                           stay hidden instead of flickering.
 *   3. Per-building column (only when metadata names one; a missing/absent value
 *      is treated as NOT enabled, matching the fail-closed DB default).
 *   4. Otherwise          → true.
 *
 * Deliberately does NOT consider subscription tier or RBAC — those are separate
 * layers applied by `useSubscription()` / `usePermissions()` respectively. This
 * answers availability, not entitlement or authorization.
 */
export function isFeatureAvailable({
  feature,
  platformFlags,
  buildingSettings,
  loading = false,
}: FeatureAvailabilityInput): boolean {
  const meta = PLATFORM_FEATURE_META[feature];
  if (!meta) return false; // unknown key ⇒ fail closed

  const platformState = platformFlags?.[feature];

  // Not loaded (or explicitly loading): fall back to the declared default rather
  // than optimistically showing the feature.
  if (loading || platformState === undefined) {
    if (!meta.defaultEnabled) return false;
  } else if (!platformState) {
    return false;
  }

  if (!meta.buildingSettingKey) return true;

  // No building in context (e.g. a global nav surface): the platform layer is
  // all we can evaluate, so don't hide on account of a building we don't have.
  if (buildingSettings === undefined) return true;
  if (buildingSettings === null) return false;

  return buildingSettings[meta.buildingSettingKey] === true;
}
