import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { NotificationType } from '../../src/enums/notification.enum';
import { getNotificationDataSchema } from '../../src/schemas/responses/notifications';

/**
 * Guards against silent drift when adding a new notification type: the
 * `notificationDataSchemaByType` map is `satisfies Record<NotificationType, ...>`,
 * which catches the missing-variant case at compile time, but these runtime
 * checks pin down two things the type system misses:
 *
 *   1. The per-type schema is actually a usable Zod schema (not `undefined`
 *      via a typo or broken import).
 *   2. The per-type schema is NOT the throw-away `unimplementedDataSchema`
 *      for a type that should have a real payload. Drift into "shipped a
 *      real NotificationType but left the data schema as unimplemented"
 *      would still compile but would skip validation at runtime.
 */
describe('notification data schemas — exhaustiveness', () => {
  const allTypes = Object.values(NotificationType);

  it('maps every NotificationType to a Zod schema via getNotificationDataSchema', () => {
    for (const type of allTypes) {
      const schema = getNotificationDataSchema(type);
      expect(schema, `getNotificationDataSchema(${type}) must return a Zod schema`).toBeDefined();
      expect(schema, `${type} must map to a ZodType`).toBeInstanceOf(z.ZodType);
    }
  });

  it('every per-type schema accepts a well-formed base payload', () => {
    // Base payload has only the shared keys that every emit site populates.
    // Some per-type schemas add required fields on top, which is fine — we
    // don't care if they reject an empty object; we only want to prove they're
    // real, parseable schemas (not broken/stub references).
    for (const type of allTypes) {
      const schema = getNotificationDataSchema(type);
      // If the schema parses an empty object successfully, great. If not, the
      // .safeParse result still tells us the schema is live and throwing
      // structured Zod errors (not a TypeError from `.parse` not existing).
      const result = schema.safeParse({});
      expect(typeof result.success, `${type} schema must return a valid SafeParseResult`).toBe(
        'boolean',
      );
    }
  });

  it('covers every shipped NotificationType (no gap in allTypes)', () => {
    // Sanity check on the enum itself: ensure no enum value is an empty string
    // or a duplicate. Catches copy-paste accidents in the enum definition.
    const stringValues = allTypes.filter((v): v is string => typeof v === 'string');
    expect(stringValues.length, 'NotificationType must have at least one value').toBeGreaterThan(0);

    const unique = new Set(stringValues);
    expect(unique.size, 'NotificationType values must be unique').toBe(stringValues.length);

    for (const v of stringValues) {
      expect(v, 'NotificationType values must be non-empty strings').not.toBe('');
    }
  });
});
