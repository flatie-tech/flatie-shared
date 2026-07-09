import { describe, expect, it } from 'vitest';
import { buildGoogleCalendarUrl } from '../../src/utils/google-calendar';

const BASE = {
  title: 'Sastanak suvlasnika',
  startDate: '2026-09-01T18:00:00.000Z',
  endDate: '2026-09-01T19:30:00.000Z',
};

function paramsOf(url: string): URLSearchParams {
  return new URL(url).searchParams;
}

describe('buildGoogleCalendarUrl', () => {
  it('builds a template URL with title and UTC dates', () => {
    const url = buildGoogleCalendarUrl(BASE);
    const params = paramsOf(url);

    expect(url.startsWith('https://calendar.google.com/calendar/render?')).toBe(true);
    expect(params.get('action')).toBe('TEMPLATE');
    expect(params.get('text')).toBe('Sastanak suvlasnika');
    expect(params.get('dates')).toBe('20260901T180000Z/20260901T193000Z');
    expect(params.get('recur')).toBeNull();
    expect(params.get('details')).toBeNull();
    expect(params.get('location')).toBeNull();
  });

  it('accepts Date instances for dates', () => {
    const url = buildGoogleCalendarUrl({
      ...BASE,
      startDate: new Date('2026-09-01T18:00:00Z'),
      endDate: new Date('2026-09-01T19:30:00Z'),
    });
    expect(paramsOf(url).get('dates')).toBe('20260901T180000Z/20260901T193000Z');
  });

  it('joins description and meeting URL in details', () => {
    const url = buildGoogleCalendarUrl({
      ...BASE,
      description: 'Dnevni red: pričuva & krov',
      onlineMeetingUrl: 'https://meet.google.com/abc-defg-hij',
    });
    expect(paramsOf(url).get('details')).toBe(
      'Dnevni red: pričuva & krov\n\nhttps://meet.google.com/abc-defg-hij',
    );
  });

  it('uses the meeting URL alone when there is no description', () => {
    const url = buildGoogleCalendarUrl({
      ...BASE,
      description: null,
      onlineMeetingUrl: 'https://meet.google.com/abc-defg-hij',
    });
    expect(paramsOf(url).get('details')).toBe('https://meet.google.com/abc-defg-hij');
  });

  it('URL-encodes Croatian diacritics, ampersands, and newlines safely', () => {
    const url = buildGoogleCalendarUrl({
      ...BASE,
      title: 'Čišćenje & džamija — šđž',
      description: 'prvi red\ndrugi red',
    });
    const params = paramsOf(url);
    expect(params.get('text')).toBe('Čišćenje & džamija — šđž');
    expect(params.get('details')).toBe('prvi red\ndrugi red');
    // The raw URL itself must not contain unencoded newlines or spaces
    expect(url).not.toMatch(/[\n ]/);
  });

  it('includes location only when provided', () => {
    const url = buildGoogleCalendarUrl({ ...BASE, location: 'Ilica 1, Zagreb' });
    expect(paramsOf(url).get('location')).toBe('Ilica 1, Zagreb');
  });

  it.each([
    ['weekly', 'RRULE:FREQ=WEEKLY'],
    ['biweekly', 'RRULE:FREQ=WEEKLY;INTERVAL=2'],
    ['monthly', 'RRULE:FREQ=MONTHLY'],
    ['yearly', 'RRULE:FREQ=YEARLY'],
  ])('maps %s recurrence to %s', (recurrenceType, expected) => {
    const url = buildGoogleCalendarUrl({ ...BASE, recurrenceType });
    expect(paramsOf(url).get('recur')).toBe(expected);
  });

  it('appends UNTIL from recurrenceEndDate', () => {
    const url = buildGoogleCalendarUrl({
      ...BASE,
      recurrenceType: 'weekly',
      recurrenceEndDate: '2026-12-31T23:00:00.000Z',
    });
    expect(paramsOf(url).get('recur')).toBe('RRULE:FREQ=WEEKLY;UNTIL=20261231T230000Z');
  });

  it('omits recur for none/null recurrence', () => {
    expect(
      paramsOf(buildGoogleCalendarUrl({ ...BASE, recurrenceType: 'none' })).get('recur'),
    ).toBeNull();
    expect(
      paramsOf(buildGoogleCalendarUrl({ ...BASE, recurrenceType: null })).get('recur'),
    ).toBeNull();
  });

  it('never emits recur for a recurrence instance', () => {
    const url = buildGoogleCalendarUrl({
      ...BASE,
      recurrenceType: 'weekly',
      recurrenceEndDate: '2026-12-31T00:00:00.000Z',
      isRecurrenceInstance: true,
    });
    expect(paramsOf(url).get('recur')).toBeNull();
    // The single occurrence keeps its own dates
    expect(paramsOf(url).get('dates')).toBe('20260901T180000Z/20260901T193000Z');
  });
});
