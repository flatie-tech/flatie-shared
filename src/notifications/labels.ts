/**
 * Locale-bound label maps for machine values that appear inside notification
 * text ({{status}}, {{role}}, waste subtypes, …). One source for backend
 * emit-time rendering and client display-time re-rendering. Unknown keys pass
 * through unchanged so a new enum value degrades to its raw name, never to a
 * crash. House fallback locale is Croatian, never English.
 */

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

const ROLE_LABELS: LabelMap = {
  hr: {
    BUILDING_MANAGER: 'Upravitelj zgrade',
    OWNER_REPRESENTATIVE: 'Predstavnik suvlasnika',
    DEPUTY_REPRESENTATIVE: 'Zamjenik predstavnika',
    CO_OWNER: 'Suvlasnik',
    TENANT: 'Stanar',
  },
  en: {
    BUILDING_MANAGER: 'Building manager',
    OWNER_REPRESENTATIVE: 'Owner representative',
    DEPUTY_REPRESENTATIVE: 'Deputy representative',
    CO_OWNER: 'Co-owner',
    TENANT: 'Tenant',
  },
  de: {
    BUILDING_MANAGER: 'Gebäudeverwalter',
    OWNER_REPRESENTATIVE: 'Eigentümervertreter',
    DEPUTY_REPRESENTATIVE: 'Stellvertreter',
    CO_OWNER: 'Miteigentümer',
    TENANT: 'Mieter',
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
  return ROLE_LABELS[locale][role] ?? role;
}

/** BCP-47 tag for Intl date/number formatting in this locale. */
export function getDateLocale(locale: NotificationLocale): string {
  return locale === 'hr' ? 'hr-HR' : locale === 'de' ? 'de-DE' : 'en-US';
}
