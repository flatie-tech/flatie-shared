/**
 * Platform feature flags — the operational "does this product ship this right
 * now, for anyone?" switch, controlled by a platform admin from
 * `/platform/features` and stored in `platform_feature_flags`.
 *
 * ## Not the same thing as `FEATURE_TIERS`
 *
 * The backend already has a feature registry in
 * `subscription-evaluator.service.ts` (`FEATURE_TIERS`). The two answer
 * different questions and are deliberately kept at different granularities so
 * they can't be confused:
 *
 * | | question | granularity | example key |
 * |---|---|---|---|
 * | `FEATURE_TIERS` | does this customer's PLAN include it? | per-action | `chat:access`, `ai:chat` |
 * | `PlatformFeature` | does the product ship it at all right now? | per-feature | `ai_assistant` |
 *
 * You *park* a feature; you *sell* an action. Keep this list coarse — one entry
 * per user-visible feature, never per endpoint.
 *
 * ## Composition
 *
 * The platform flag is a CEILING, never a default: when it is off the feature is
 * gone for everyone (platform admins included — a kill switch that admins bypass
 * isn't one). A per-building toggle can only narrow an enabled flag further, and
 * subscription tier + RBAC apply on top. See `isFeatureAvailable()` in
 * `utils/feature-availability.ts` — the single resolver both clients and the
 * backend use.
 *
 * Adding a flag = one entry here + one row in `platform_feature_flags`. No
 * migration, no per-flag column.
 */
export const PlatformFeature = {
  /** Building mailbox ("Korisnički pretinac") — per-building mail threads. */
  BUILDING_EMAIL: 'building_email',
  /** AI assistant chat widget + its usage endpoints. */
  AI_ASSISTANT: 'ai_assistant',
  /** Per-building FAQ ("Česta pitanja"). */
  FAQ: 'faq',
  /** Building chat — conversations between members of one building. */
  CHAT: 'chat',
} as const;

export type PlatformFeature = (typeof PlatformFeature)[keyof typeof PlatformFeature];

/**
 * Boolean `building_settings` columns that may narrow a platform feature for a
 * single building. Kept as a string union (rather than derived from the settings
 * schema) so this enum module stays dependency-free; the static spec asserts
 * every value here is a real boolean key on `buildingSettingsResponseSchema`.
 */
export type BuildingFeatureSettingKey = 'emailEnabled' | 'chatEnabled' | 'faqEnabled';

export interface PlatformFeatureMeta {
  /**
   * Effective state when `platform_feature_flags` has no row for this key — also
   * what the resolver returns while flag data is still loading, so a parked
   * feature never flickers into view on a cold load.
   *
   * For a feature with a `buildingSettingKey` this doubles as the expected
   * DEFAULT of that `building_settings` column, and is what the resolver and the
   * backend guard fall back to when a building has no settings row (rows are
   * lazy-created, so "no row" is a real state). A backend int-spec pins the two
   * together, because that is the one way this dual use could silently rot.
   */
  defaultEnabled: boolean;
  /**
   * Per-building toggle that further narrows this feature, when one exists.
   * Omitted ⇒ the feature is global-only.
   */
  buildingSettingKey?: BuildingFeatureSettingKey;
  /**
   * True when the feature is deliberately parked (not merely off by
   * configuration) — the platform UI labels these differently, and it documents
   * intent for whoever reads this next.
   */
  parked?: boolean;
}

export const PLATFORM_FEATURE_META: Record<PlatformFeature, PlatformFeatureMeta> = {
  // Parked 2026-08-04 pending the inbound-architecture decision (unguessable
  // addresses, default-deny senders, SES for spam/virus verdicts) — see
  // flatie-docs/team-knowledge/20.
  [PlatformFeature.BUILDING_EMAIL]: {
    defaultEnabled: false,
    buildingSettingKey: 'emailEnabled',
    parked: true,
  },
  // Parked 2026-08-04: works, but has no entitlement gate of its own and only a
  // $1/mo budget cap standing between any member and the model.
  [PlatformFeature.AI_ASSISTANT]: {
    defaultEnabled: false,
    parked: true,
  },
  // Live. Listed here for the app-wide kill switch and, more immediately, so the
  // per-building toggle finally enforces: before 2026-08-05 `faqEnabled` and
  // `chatEnabled` hid nav items while every endpoint stayed reachable by URL.
  [PlatformFeature.FAQ]: {
    defaultEnabled: true,
    buildingSettingKey: 'faqEnabled',
  },
  [PlatformFeature.CHAT]: {
    defaultEnabled: true,
    buildingSettingKey: 'chatEnabled',
  },
};

export const PLATFORM_FEATURES = Object.values(PlatformFeature) as PlatformFeature[];

/**
 * Default for a per-building toggle, taken from the feature that owns it.
 *
 * The backend guard and the override count both need "what does this column mean
 * when absent / unchanged", and neither should hardcode it: `emailEnabled`
 * defaults false while `faqEnabled` and `chatEnabled` default true, and getting
 * that backwards either hides a live feature or exposes a parked one.
 */
export function getBuildingFeatureDefault(key: BuildingFeatureSettingKey): boolean {
  for (const feature of PLATFORM_FEATURES) {
    const meta = PLATFORM_FEATURE_META[feature];
    if (meta.buildingSettingKey === key) return meta.defaultEnabled;
  }
  // Unreachable while the registry covers every toggle (a static test asserts
  // it does); fail closed rather than invent an answer.
  return false;
}
