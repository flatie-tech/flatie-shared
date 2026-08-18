import { N as NotificationType } from '../notification.enum-PAMm0M-t.cjs';

/**
 * Locale-bound label maps for machine values that appear inside notification
 * text ({{status}}, {{role}}, waste subtypes, …). One source for backend
 * emit-time rendering and client display-time re-rendering. Unknown keys pass
 * through unchanged so a new enum value degrades to its raw name, never to a
 * crash. House fallback locale is Croatian, never English.
 */
type NotificationLocale = 'hr' | 'en' | 'de';
declare const SUPPORTED_LOCALES: readonly NotificationLocale[];
declare const DEFAULT_LOCALE: NotificationLocale;
/**
 * Normalize a raw `users.locale` value (varchar(5), free-form) to a supported
 * locale. Region suffixes are stripped ('en-US' → 'en'); anything unknown,
 * empty, or null falls back to Croatian — the product default.
 */
declare function resolveLocale(raw: string | null | undefined): NotificationLocale;
declare function getStatusLabel(locale: NotificationLocale, status: string): string;
declare function getEventTypeLabel(locale: NotificationLocale, eventType: string): string;
declare function getWasteSubtypeLabel(locale: NotificationLocale, subtype: string): string;
declare function getPollTypeLabel(locale: NotificationLocale, pollType: string): string;
declare function getRoleLabel(locale: NotificationLocale, role: string): string;
declare function getOrgRoleLabel(locale: NotificationLocale, orgRole: string): string;
/** BCP-47 tag for Intl date/number formatting in this locale. */
declare function getDateLocale(locale: NotificationLocale): string;

/**
 * Format a date-ish template var for human display: "16. srpnja 2026. 14:00"
 * style per locale, always in Croatian wall-clock time (Croatia-only product).
 * Non-parseable values pass through unchanged.
 */
declare function formatNotificationDate(value: unknown, locale: NotificationLocale): string;
/**
 * Produce the localized variable set for template rendering. A notification's
 * `data` blob keeps the raw machine values (ISO dates, enum strings) for deep
 * links; only the vars fed to the renderer are localized here.
 */
declare function buildLocalizedVars(locale: NotificationLocale, rawVars: Record<string, unknown>): Record<string, unknown>;
/** Single-pass `{{var}}` renderer. Unknown vars stay literal. */
declare function renderTemplate(template: string, variables: Record<string, unknown>): string;
interface RenderNotificationTextOptions {
    /**
     * Param-drift canary: called with the surviving `{{token}}`s when the
     * rendered text still contains unresolved vars (an emit site stopped
     * sending a var the template expects). Backend wires this to its logger;
     * clients typically fall back to the stored row text instead.
     */
    onUnresolvedVars?: (tokens: string[]) => void;
}
/**
 * Render a notification's title and body for one locale. `rawVars` should be
 * the un-localized payload (notification `data` + buildingName);
 * localization of labels/dates/fallbacks happens here so callers stay
 * locale-agnostic.
 */
declare function renderNotificationText(type: NotificationType, locale: NotificationLocale, rawVars: Record<string, unknown>, options?: RenderNotificationTextOptions): {
    title: string;
    body: string;
    unresolvedVars: string[];
};
/** Localized per-type description for the notification preferences UI. */
declare function getLocalizedTypeDescription(type: NotificationType, locale: NotificationLocale): string;

/**
 * Render templates for every notification type in all supported locales.
 * Lifted verbatim from flatie-backend's notification-i18n.ts so backend
 * (emit-time render), web and mobile (display-time re-render) share ONE
 * dictionary. `{{var}}` placeholders must be identical across the three
 * locales of a type — tests/notifications enforces parity.
 */
interface LocalizedNotificationTemplate {
    title: Record<NotificationLocale, string>;
    body: Record<NotificationLocale, string>;
    description: Record<NotificationLocale, string>;
}
declare const NOTIFICATION_TEMPLATES: Record<NotificationType, LocalizedNotificationTemplate>;
declare const ACTOR_FALLBACK: Record<NotificationLocale, string>;

export { ACTOR_FALLBACK, DEFAULT_LOCALE, NOTIFICATION_TEMPLATES, type NotificationLocale, type RenderNotificationTextOptions, SUPPORTED_LOCALES, buildLocalizedVars, formatNotificationDate, getDateLocale, getEventTypeLabel, getLocalizedTypeDescription, getOrgRoleLabel, getPollTypeLabel, getRoleLabel, getStatusLabel, getWasteSubtypeLabel, renderNotificationText, renderTemplate, resolveLocale };
