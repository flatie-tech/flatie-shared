import type { NotificationType } from '../enums';
import {
  getDateLocale,
  getOrgRoleLabel,
  getRoleLabel,
  getStatusLabel,
  getWasteSubtypeLabel,
  type NotificationLocale,
} from './labels';
import { ACTOR_FALLBACK, NOTIFICATION_TEMPLATES } from './templates';

/**
 * Format a date-ish template var for human display: "16. srpnja 2026. 14:00"
 * style per locale, always in Croatian wall-clock time (Croatia-only product).
 * Non-parseable values pass through unchanged.
 */
export function formatNotificationDate(value: unknown, locale: NotificationLocale): string {
  const date = value instanceof Date ? value : typeof value === 'string' ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(getDateLocale(locale), {
    timeZone: 'Europe/Zagreb',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** Template vars that hold machine values and need per-locale labels/formatting. */
const DATE_VARS = ['startDate', 'endDate', 'deadline'] as const;

/**
 * Produce the localized variable set for template rendering. A notification's
 * `data` blob keeps the raw machine values (ISO dates, enum strings) for deep
 * links; only the vars fed to the renderer are localized here.
 */
export function buildLocalizedVars(
  locale: NotificationLocale,
  rawVars: Record<string, unknown>,
): Record<string, unknown> {
  const vars: Record<string, unknown> = { ...rawVars };

  if (typeof vars.subtype === 'string' && vars.subtype) {
    vars.wasteTypeLabel = getWasteSubtypeLabel(locale, vars.subtype);
  }
  if (typeof vars.status === 'string' && vars.status) {
    vars.status = getStatusLabel(locale, vars.status);
  }
  if (typeof vars.role === 'string' && vars.role) {
    vars.role = getRoleLabel(locale, vars.role);
  }
  if (typeof vars.orgRole === 'string' && vars.orgRole) {
    vars.orgRole = getOrgRoleLabel(locale, vars.orgRole);
  }
  for (const key of DATE_VARS) {
    if (vars[key] !== undefined && vars[key] !== null) {
      vars[key] = formatNotificationDate(vars[key], locale);
    }
  }
  if (typeof vars.actorName !== 'string' || vars.actorName.trim() === '') {
    vars.actorName = ACTOR_FALLBACK[locale];
  }

  return vars;
}

const TEMPLATE_VAR_RE = /\{\{(\w+)\}\}/g;

/** Single-pass `{{var}}` renderer. Unknown vars stay literal. */
export function renderTemplate(template: string, variables: Record<string, unknown>): string {
  return template.replace(TEMPLATE_VAR_RE, (match, key) =>
    variables[key] !== undefined ? String(variables[key]) : match,
  );
}

export interface RenderNotificationTextOptions {
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
export function renderNotificationText(
  type: NotificationType,
  locale: NotificationLocale,
  rawVars: Record<string, unknown>,
  options?: RenderNotificationTextOptions,
): { title: string; body: string; unresolvedVars: string[] } {
  const template = NOTIFICATION_TEMPLATES[type];
  const vars = buildLocalizedVars(locale, rawVars);
  const title = renderTemplate(template.title[locale], vars);
  const body = renderTemplate(template.body[locale], vars);

  const leftover = `${title} ${body}`.match(TEMPLATE_VAR_RE) ?? [];
  const unresolvedVars = [...new Set(leftover)];
  if (unresolvedVars.length > 0) {
    options?.onUnresolvedVars?.(unresolvedVars);
  }

  return { title, body, unresolvedVars };
}

/** Localized per-type description for the notification preferences UI. */
export function getLocalizedTypeDescription(
  type: NotificationType,
  locale: NotificationLocale,
): string {
  return NOTIFICATION_TEMPLATES[type].description[locale];
}
