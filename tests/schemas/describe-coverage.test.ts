import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import * as responsesBarrel from '../../src/schemas/responses';

/**
 * Regression guard: every public-API response schema field has a
 * `.description` set.
 *
 * Runs against the `src/schemas/responses/` barrel (not entities or
 * requests — enforcement there would be noisier and the convention
 * document treats entities/requests as "optional where obvious").
 *
 * A field is allowed to be undescribed when its name + type convey the
 * full meaning by convention. The skip list is the single source of
 * truth for which names count as trivial; expand it sparingly, because
 * doing so is how coverage erodes over the long run. Every addition
 * should be reviewed on its own merits, not accumulated silently.
 */

/** Field names whose semantics are unambiguous from name + type alone. */
const TRIVIAL_FIELD_NAMES = new Set([
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'archivedAt',
  // Primary ownership pointers — context makes them self-evident.
  'buildingId',
  'userId',
  'createdBy',
  'updatedBy',
  'archivedBy',
  'deletedBy',
]);

/** Descend into a Zod schema and yield `[path, description]` for every field. */
function* fields(schema: z.ZodTypeAny, path: string[] = []): Generator<{
  path: string[];
  name: string;
  description?: string;
}> {
  const def = (schema as unknown as { _zod?: { def?: { type?: string; shape?: Record<string, z.ZodTypeAny>; innerType?: z.ZodTypeAny; element?: z.ZodTypeAny } } })._zod?.def;
  if (!def) return;

  if (def.type === 'object' && def.shape) {
    for (const [name, child] of Object.entries(def.shape)) {
      yield {
        path: [...path, name],
        name,
        description: (child as unknown as { description?: string }).description,
      };
      // Recurse into nested objects/arrays.
      const childDef = (child as unknown as { _zod?: { def?: { type?: string } } })._zod?.def;
      if (childDef?.type === 'object' || childDef?.type === 'array' || childDef?.type === 'optional' || childDef?.type === 'nullable') {
        yield* fields(child, [...path, name]);
      }
    }
  } else if (def.type === 'array' && def.element) {
    yield* fields(def.element, path);
  } else if ((def.type === 'optional' || def.type === 'nullable') && def.innerType) {
    yield* fields(def.innerType, path);
  }
}

describe('response schemas — .describe() coverage', () => {
  const exports = responsesBarrel as Record<string, unknown>;
  const schemaExports = Object.entries(exports).filter(
    ([name, value]) =>
      name.endsWith('Schema') && typeof value === 'object' && value !== null,
  );

  // Sanity check: we actually found schemas to inspect. If the barrel is
  // ever renamed or the scan logic breaks, this fires before the
  // coverage loop does its thing.
  it('discovers at least 10 response schemas from the barrel', () => {
    expect(schemaExports.length).toBeGreaterThanOrEqual(10);
  });

  for (const [schemaName, schema] of schemaExports) {
    it(`${schemaName}: every non-trivial field has .describe()`, () => {
      const offenders: string[] = [];
      for (const field of fields(schema as z.ZodTypeAny)) {
        if (TRIVIAL_FIELD_NAMES.has(field.name)) continue;
        if (field.description && field.description.trim().length > 0) continue;
        offenders.push(field.path.join('.'));
      }

      expect(
        offenders,
        [
          `${schemaName} has ${offenders.length} fields without .describe():`,
          ...offenders.map((o) => `  • ${o}`),
          '',
          'Add a one-sentence .describe() to each, per docs/schema-conventions.md.',
          'If a field is genuinely trivial, add its name to TRIVIAL_FIELD_NAMES',
          'in this test file (and justify the addition in the PR description).',
        ].join('\n'),
      ).toEqual([]);
    });
  }
});
