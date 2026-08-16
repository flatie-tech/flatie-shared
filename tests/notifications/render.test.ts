import { describe, expect, it } from 'vitest';
import { BuildingRole, NotificationType, OrgRole } from '../../src/enums';

import {
  ACTOR_FALLBACK,
  buildLocalizedVars,
  getLocalizedTypeDescription,
  getOrgRoleLabel,
  getRoleLabel,
  type NotificationLocale as Locale,
  NOTIFICATION_TEMPLATES,
  renderNotificationText,
  renderTemplate,
  resolveLocale,
} from '../../src/notifications';

const LOCALES: Locale[] = ['hr', 'en', 'de'];
const ALL_TYPES = Object.values(NotificationType);

const extractTokens = (s: string): string[] =>
  [...s.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1] ?? '').sort();

describe('NOTIFICATION_TEMPLATES dictionary', () => {
  it('covers every NotificationType in every locale with non-empty strings', () => {
    for (const type of ALL_TYPES) {
      const entry = NOTIFICATION_TEMPLATES[type];
      expect(entry, `missing dictionary entry for ${type}`).toBeDefined();
      for (const locale of LOCALES) {
        expect(entry.title[locale], `${type} title ${locale}`).toBeTruthy();
        expect(entry.body[locale], `${type} body ${locale}`).toBeTruthy();
        expect(entry.description[locale], `${type} description ${locale}`).toBeTruthy();
      }
    }
  });

  it('uses identical {{token}} sets across locales for each type', () => {
    for (const type of ALL_TYPES) {
      const entry = NOTIFICATION_TEMPLATES[type];
      const reference = [
        ...extractTokens(entry.title.hr),
        '|',
        ...extractTokens(entry.body.hr),
      ].join(',');
      for (const locale of ['en', 'de'] as Locale[]) {
        const tokens = [
          ...extractTokens(entry.title[locale]),
          '|',
          ...extractTokens(entry.body[locale]),
        ].join(',');
        expect(tokens, `token drift in ${type} (${locale} vs hr)`).toBe(reference);
      }
    }
  });
});

describe('resolveLocale', () => {
  it.each([
    ['hr', 'hr'],
    ['en', 'en'],
    ['de', 'de'],
    ['HR', 'hr'],
    ['en-US', 'en'],
    ['en_GB', 'en'],
    ['de-AT', 'de'],
  ])('normalizes %s → %s', (input, expected) => {
    expect(resolveLocale(input)).toBe(expected);
  });

  it.each([
    [null],
    [undefined],
    [''],
    ['fr'],
    ['xx-YY'],
    ['sr'],
  ])('falls back to hr (product default) for %s', (input) => {
    expect(resolveLocale(input as string | null | undefined)).toBe('hr');
  });
});

describe('buildLocalizedVars', () => {
  it('derives the localized waste label from the raw subtype', () => {
    expect(buildLocalizedVars('hr', { subtype: 'mixed' }).wasteTypeLabel).toBe('Miješani otpad');
    expect(buildLocalizedVars('en', { subtype: 'mixed' }).wasteTypeLabel).toBe('Mixed waste');
    expect(buildLocalizedVars('de', { subtype: 'mixed' }).wasteTypeLabel).toBe('Restmüll');
    expect(buildLocalizedVars('hr', { subtype: 'plastic_metal' }).wasteTypeLabel).toBe(
      'Plastika i metal',
    );
  });

  it('localizes status and role enum values', () => {
    expect(buildLocalizedVars('hr', { status: 'in_progress' }).status).toBe('U tijeku');
    expect(buildLocalizedVars('de', { status: 'resolved' }).status).toBe('Behoben');
    // The DB enum value, not the TypeScript key — the backend puts
    // `owner_representative` / `co_owner` in the var, never `CO_OWNER`.
    expect(buildLocalizedVars('hr', { role: BuildingRole.CO_OWNER }).role).toBe('Suvlasnik');
    expect(buildLocalizedVars('de', { role: BuildingRole.RESIDENT }).role).toBe('Bewohner');
    expect(buildLocalizedVars('hr', { orgRole: OrgRole.ORG_ADMIN }).orgRole).toBe(
      'Administrator organizacije',
    );
    expect(buildLocalizedVars('en', { orgRole: OrgRole.REFERENT }).orgRole).toBe('Clerk');
  });

  it('formats date vars per locale in Europe/Zagreb wall-clock time', () => {
    // 12:00 UTC on 2026-07-16 = 14:00 in Zagreb (CEST).
    const instant = new Date('2026-07-16T12:00:00.000Z');
    const hr = buildLocalizedVars('hr', { startDate: instant }).startDate as string;
    const en = buildLocalizedVars('en', { startDate: instant.toISOString() }).startDate as string;
    const de = buildLocalizedVars('de', { startDate: instant }).startDate as string;

    expect(hr).toContain('srpnja');
    expect(hr).toContain('14:00');
    expect(en).toContain('July');
    expect(de).toContain('Juli');
    // Never the raw Date toString / ISO form.
    expect(hr).not.toMatch(/GMT|T12:00/);
  });

  it('passes unparseable date values through unchanged', () => {
    expect(buildLocalizedVars('hr', { startDate: 'not-a-date' }).startDate).toBe('not-a-date');
  });

  it('fills a locale-appropriate actor fallback when actorName is missing', () => {
    expect(buildLocalizedVars('hr', {}).actorName).toBe('Netko');
    expect(buildLocalizedVars('en', { actorName: '' }).actorName).toBe('Someone');
    expect(buildLocalizedVars('de', { actorName: null }).actorName).toBe('Jemand');
    expect(buildLocalizedVars('hr', { actorName: 'Ana Anić' }).actorName).toBe('Ana Anić');
    expect(ACTOR_FALLBACK.hr).toBe('Netko');
  });
});

describe('renderTemplate / renderNotificationText', () => {
  it('leaves unknown tokens literal (single pass, no recursion)', () => {
    expect(renderTemplate('Hello {{name}} {{missing}}', { name: 'X' })).toBe('Hello X {{missing}}');
  });

  it('renders a waste reminder without any surviving {{tokens}} from raw subtype only', () => {
    for (const locale of LOCALES) {
      const { title, body } = renderNotificationText(
        NotificationType.WASTE_REMINDER_PLASTIC_METAL,
        locale,
        { subtype: 'plastic_metal', title: 'Odvoz', startDate: new Date() },
      );
      expect(`${title} ${body}`).not.toContain('{{');
    }
  });

  it('renders event_created with a human date, not a raw Date string', () => {
    const { body } = renderNotificationText(NotificationType.EVENT_CREATED, 'hr', {
      title: 'Sastanak',
      actorName: 'Ana',
      startDate: new Date('2026-07-16T12:00:00.000Z'),
      buildingName: 'Zgrada A',
    });
    expect(body).toContain('Ana');
    expect(body).toContain('srpnja');
    expect(body).not.toMatch(/GMT/);
  });

  it('renders per-locale text for the same input', () => {
    const vars = { question: 'Novo pročelje?', actorName: 'Ivo', buildingName: 'Zgrada A' };
    expect(renderNotificationText(NotificationType.POLL_CREATED, 'hr', vars).body).toContain(
      'anketu',
    );
    expect(renderNotificationText(NotificationType.POLL_CREATED, 'en', vars).body).toContain(
      'poll',
    );
    expect(renderNotificationText(NotificationType.POLL_CREATED, 'de', vars).body).toContain(
      'Umfrage',
    );
  });
});

describe('getLocalizedTypeDescription', () => {
  it('returns the per-locale preferences description', () => {
    expect(getLocalizedTypeDescription(NotificationType.CHAT_MESSAGE, 'hr')).toContain('poruku');
    expect(getLocalizedTypeDescription(NotificationType.CHAT_MESSAGE, 'de')).toContain('Nachricht');
  });
});

/**
 * Both label maps fall back to the raw token on a miss, so a mis-keyed map is
 * invisible: the `{{role}}` substitution still succeeds, `unresolvedVars`
 * stays empty, and the notification simply reads "…promijenjena u:
 * owner_representative". ROLE_LABELS was keyed SCREAMING_SNAKE against the
 * lowercase pgEnum for its whole life for exactly that reason. So assert the
 * label differs from the value it was looked up by, per enum value per locale.
 */
describe('role label exhaustiveness', () => {
  const roleCases = LOCALES.flatMap((locale) =>
    Object.values(BuildingRole).map((role) => [locale, role] as const),
  );
  const orgRoleCases = LOCALES.flatMap((locale) =>
    Object.values(OrgRole).map((orgRole) => [locale, orgRole] as const),
  );

  it.each(roleCases)('%s / %s resolves to a real building-role label', (locale, role) => {
    const label = getRoleLabel(locale, role);
    expect(label, `getRoleLabel fell through to the raw enum value for ${role}`).not.toBe(role);
    expect(label.trim()).not.toBe('');
  });

  it.each(orgRoleCases)('%s / %s resolves to a real org-role label', (locale, orgRole) => {
    const label = getOrgRoleLabel(locale, orgRole);
    expect(label, `getOrgRoleLabel fell through to the raw enum value for ${orgRole}`).not.toBe(
      orgRole,
    );
    expect(label.trim()).not.toBe('');
  });

  it('passes an unknown role through unchanged rather than throwing', () => {
    expect(getRoleLabel('hr', 'not_a_role')).toBe('not_a_role');
    expect(getOrgRoleLabel('hr', 'not_a_role')).toBe('not_a_role');
  });
});
