/**
 * Google Calendar "add event" template-URL builder.
 *
 * Produces a `calendar.google.com/calendar/render?action=TEMPLATE` link that
 * opens Google Calendar (web or app) with the event prefilled — no OAuth, no
 * API. Used by the web and mobile event detail views.
 */

export interface GoogleCalendarEventInput {
  title: string;
  /** UTC instant — ISO-8601 string (as sent on the wire) or Date. */
  startDate: string | Date;
  endDate: string | Date;
  description?: string | null;
  /** Appended to the details block on its own line when present. */
  onlineMeetingUrl?: string | null;
  /** Optional free-text location; the param is omitted when absent. */
  location?: string | null;
  /** `none` | `weekly` | `biweekly` | `monthly` | `yearly` (or null). */
  recurrenceType?: string | null;
  recurrenceEndDate?: string | Date | null;
  /**
   * True for an expanded occurrence of a recurring event — the link then
   * adds that single occurrence and never emits a recurrence rule.
   */
  isRecurrenceInstance?: boolean;
}

/** Google's "basic" UTC format: YYYYMMDDTHHMMSSZ. */
function toGoogleUtc(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.toISOString().slice(0, 19).replace(/[-:]/g, '')}Z`;
}

const RRULE_FREQ: Record<string, string> = {
  weekly: 'FREQ=WEEKLY',
  biweekly: 'FREQ=WEEKLY;INTERVAL=2',
  monthly: 'FREQ=MONTHLY',
  yearly: 'FREQ=YEARLY',
};

export function buildGoogleCalendarUrl(event: GoogleCalendarEventInput): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toGoogleUtc(event.startDate)}/${toGoogleUtc(event.endDate)}`,
  });

  const detailParts: string[] = [];
  if (event.description) detailParts.push(event.description);
  if (event.onlineMeetingUrl) detailParts.push(event.onlineMeetingUrl);
  if (detailParts.length > 0) {
    params.set('details', detailParts.join('\n\n'));
  }

  if (event.location) {
    params.set('location', event.location);
  }

  const freq = event.recurrenceType ? RRULE_FREQ[event.recurrenceType] : undefined;
  if (freq && !event.isRecurrenceInstance) {
    const until = event.recurrenceEndDate ? `;UNTIL=${toGoogleUtc(event.recurrenceEndDate)}` : '';
    params.set('recur', `RRULE:${freq}${until}`);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
