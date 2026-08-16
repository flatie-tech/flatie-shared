/**
 * Locale-bound label maps for machine values that appear inside notification
 * text ({{status}}, {{role}}, waste subtypes, …). One source for backend
 * emit-time rendering and client display-time re-rendering. Unknown keys pass
 * through unchanged so a new enum value degrades to its raw name, never to a
 * crash. House fallback locale is Croatian, never English.
 */

import { BuildingRole, OrgRole } from '../enums/role.enum';

export type NotificationLocale = 'hr' | 'en' | 'de';

export const SUPPORTED_LOCALES: readonly NotificationLocale[] = ['hr', 'en', 'de'];
export const DEFAULT_LOCALE: NotificationLocale = 'hr';

/**
 * Normalize a raw `users.locale` value (varchar(5), free-form) to a supported
 * locale. Region suffixes are stripped ('en-US' → 'en'); anything unknown,
 * empty, or null falls back to Croatian — the product default.
 */
export function resolveLocale(raw: string | null | undefined): NotificationLocale {
  if (!raw) return DEFAULT_LOCALE;
  const base = raw.toLowerCase().split(/[-_]/)[0] ?? '';
  return (SUPPORTED_LOCALES as string[]).includes(base)
    ? (base as NotificationLocale)
    : DEFAULT_LOCALE;
}

type LabelMap = Record<NotificationLocale, Record<string, string>>;

const STATUS_LABELS: LabelMap = {
  hr: {
    pending: 'Na čekanju',
    in_progress: 'U tijeku',
    inProgress: 'U tijeku',
    resolved: 'Riješeno',
    approved: 'Odobreno',
    rejected: 'Odbijeno',
    cancelled: 'Otkazano',
    completed: 'Završeno',
    pendingApproval: 'Čeka odobrenje',
  },
  en: {
    pending: 'Pending',
    in_progress: 'In progress',
    inProgress: 'In progress',
    resolved: 'Resolved',
    approved: 'Approved',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
    completed: 'Completed',
    pendingApproval: 'Pending approval',
  },
  de: {
    pending: 'Ausstehend',
    in_progress: 'In Bearbeitung',
    inProgress: 'In Bearbeitung',
    resolved: 'Behoben',
    approved: 'Genehmigt',
    rejected: 'Abgelehnt',
    cancelled: 'Abgesagt',
    completed: 'Abgeschlossen',
    pendingApproval: 'Genehmigung ausstehend',
  },
};

const EVENT_TYPE_LABELS: LabelMap = {
  hr: {
    service: 'Servis',
    inspection: 'Inspekcija',
    maintenance: 'Održavanje',
    meeting: 'Sastanak',
    discussion: 'Rasprava',
    planned_works: 'Planirani radovi',
    waste_collection: 'Odvoz smeća',
    other: 'Ostalo',
  },
  en: {
    service: 'Service',
    inspection: 'Inspection',
    maintenance: 'Maintenance',
    meeting: 'Meeting',
    discussion: 'Discussion',
    planned_works: 'Planned works',
    waste_collection: 'Waste collection',
    other: 'Other',
  },
  de: {
    service: 'Service',
    inspection: 'Inspektion',
    maintenance: 'Wartung',
    meeting: 'Sitzung',
    discussion: 'Diskussion',
    planned_works: 'Geplante Arbeiten',
    waste_collection: 'Müllabfuhr',
    other: 'Sonstiges',
  },
};

const WASTE_SUBTYPE_LABELS: LabelMap = {
  hr: {
    plastic_metal: 'Plastika i metal',
    bio: 'Biootpad',
    paper_cardboard: 'Papir i karton',
    mixed: 'Miješani otpad',
    bulky: 'Glomazni otpad',
  },
  en: {
    plastic_metal: 'Plastic & metal',
    bio: 'Bio waste',
    paper_cardboard: 'Paper & cardboard',
    mixed: 'Mixed waste',
    bulky: 'Bulky waste',
  },
  de: {
    plastic_metal: 'Plastik & Metall',
    bio: 'Bioabfall',
    paper_cardboard: 'Papier & Karton',
    mixed: 'Restmüll',
    bulky: 'Sperrmüll',
  },
};

const POLL_TYPE_LABELS: LabelMap = {
  hr: { consensus: 'Konsenzus', community: 'Zajednica' },
  en: { consensus: 'Consensus', community: 'Community' },
  de: { consensus: 'Konsens', community: 'Gemeinschaft' },
};

/**
 * Keyed by the ENUM VALUE (`owner_representative`), not the TypeScript key
 * (`OWNER_REPRESENTATIVE`) — that is what the pgEnum stores and what the
 * backend puts in the notification's `role` var. Keyed the other way every
 * lookup missed and `getRoleLabel` fell through to the raw token, rendering
 * "Vaša uloga … je promijenjena u: owner_representative". The `Record<
 * BuildingRole, …>` typing makes a new role a compile error rather than a
 * silent fallback.
 */
const ROLE_LABELS: Record<NotificationLocale, Record<BuildingRole, string>> = {
  hr: {
    [BuildingRole.OWNER_REPRESENTATIVE]: 'Predstavnik suvlasnika',
    [BuildingRole.DEPUTY_REPRESENTATIVE]: 'Zamjenik predstavnika',
    [BuildingRole.CO_OWNER]: 'Suvlasnik',
    [BuildingRole.RESIDENT]: 'Stanar',
  },
  en: {
    [BuildingRole.OWNER_REPRESENTATIVE]: 'Owner representative',
    [BuildingRole.DEPUTY_REPRESENTATIVE]: 'Deputy representative',
    [BuildingRole.CO_OWNER]: 'Co-owner',
    [BuildingRole.RESIDENT]: 'Resident',
  },
  de: {
    [BuildingRole.OWNER_REPRESENTATIVE]: 'Eigentümervertreter',
    [BuildingRole.DEPUTY_REPRESENTATIVE]: 'Stellvertreter',
    [BuildingRole.CO_OWNER]: 'Miteigentümer',
    [BuildingRole.RESIDENT]: 'Bewohner',
  },
};

/**
 * Org-role twin of `ROLE_LABELS`, for the `{{orgRole}}` var in
 * ORG_MEMBER_ADDED / ORG_MEMBER_ROLE_CHANGED. Wording mirrors the web
 * `orgRole_*` translation keys and the org-invite email, so the two channels
 * for one action no longer disagree.
 */
const ORG_ROLE_LABELS: Record<NotificationLocale, Record<OrgRole, string>> = {
  hr: {
    [OrgRole.ORG_ADMIN]: 'Administrator organizacije',
    [OrgRole.SUPERVISOR]: 'Supervizor',
    [OrgRole.REFERENT]: 'Referent',
    [OrgRole.OPERATIVE]: 'Operativa',
  },
  en: {
    [OrgRole.ORG_ADMIN]: 'Organization admin',
    [OrgRole.SUPERVISOR]: 'Supervisor',
    [OrgRole.REFERENT]: 'Clerk',
    [OrgRole.OPERATIVE]: 'Field worker',
  },
  de: {
    [OrgRole.ORG_ADMIN]: 'Organisationsadministrator',
    [OrgRole.SUPERVISOR]: 'Supervisor',
    [OrgRole.REFERENT]: 'Sachbearbeiter',
    [OrgRole.OPERATIVE]: 'Außendienst',
  },
};

export function getStatusLabel(locale: NotificationLocale, status: string): string {
  return STATUS_LABELS[locale][status] ?? status;
}

export function getEventTypeLabel(locale: NotificationLocale, eventType: string): string {
  return EVENT_TYPE_LABELS[locale][eventType] ?? eventType;
}

export function getWasteSubtypeLabel(locale: NotificationLocale, subtype: string): string {
  return WASTE_SUBTYPE_LABELS[locale][subtype] ?? subtype;
}

export function getPollTypeLabel(locale: NotificationLocale, pollType: string): string {
  return POLL_TYPE_LABELS[locale][pollType] ?? pollType;
}

export function getRoleLabel(locale: NotificationLocale, role: string): string {
  return (ROLE_LABELS[locale] as Record<string, string>)[role] ?? role;
}

export function getOrgRoleLabel(locale: NotificationLocale, orgRole: string): string {
  return (ORG_ROLE_LABELS[locale] as Record<string, string>)[orgRole] ?? orgRole;
}

/** BCP-47 tag for Intl date/number formatting in this locale. */
export function getDateLocale(locale: NotificationLocale): string {
  return locale === 'hr' ? 'hr-HR' : locale === 'de' ? 'de-DE' : 'en-US';
}
