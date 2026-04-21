# Schema conventions

How Zod schemas in `@flatie/shared` surface in the backend's OpenAPI spec and
how to write them so consumers (Stoplight Elements viewer, code generators,
human readers) get useful field-level documentation.

This extends `conventions.md` — that covers naming, `object` vs `looseObject`,
subpath exports, and when to add to shared. This doc covers **field-level
`.describe()` calls and `.meta()` tagging for OpenAPI**.

## How it surfaces

The backend wires shared Zod schemas into its OpenAPI spec via
`@asteasolutions/zod-to-openapi`. When a schema is registered with
`.meta({ id: 'Name' })`, it appears in `components.schemas.Name`. Every
`.describe('…')` call on a field becomes the field's `description` in the
generated JSON Schema — which Stoplight (and every other OpenAPI viewer)
displays under the field's type.

Net: a one-line `.describe()` in shared is visible everywhere that schema is
referenced, across every endpoint that consumes it. Highest-leverage edit in
the repo.

## When `.describe()` is required

| Layer | Rule |
|-------|------|
| **Response schemas** (`src/schemas/responses/`) | **Required** on every non-trivial field. Enforced by `tests/schemas/describe-coverage.test.ts`. |
| **Request schemas** (`src/schemas/requests/`, `createXSchema`, `updateXSchema`) | **Required** on every non-trivial field. Consumers need to know what each body field means before submitting. |
| **Entity schemas** (`src/schemas/entities/…`) | **Required** on fields that surface in any response. Optional on join-only columns never serialized to the wire. |
| **Nested shared schemas** (`src/schemas/base.schema.ts`, `pagination.schema.ts`, `multipart.schema.ts`) | Required on every exported field. These propagate to many consumers. |
| **Primitives without semantic load** (`id: uuidSchema`, self-evident enums like `approved: z.boolean()`) | Optional. Don't force prose when the field name already tells the story. |

"Non-trivial" = the field's meaning isn't fully conveyed by its name + type.
When in doubt, describe it.

## What a good description looks like

**One sentence. States semantics. Calls out edge cases. Doesn't restate the type.**

```ts
// ✅ good
deadline: z.coerce.date().optional().describe(
  'ISO-8601 datetime after which no more votes are accepted. ' +
  'Null for consensus polls that run until consensus is reached.',
),

// ❌ too thin — restates the type
deadline: z.coerce.date().optional().describe('Optional deadline'),

// ❌ too verbose — multi-paragraph belongs in the endpoint doc, not the field
deadline: z.coerce.date().optional().describe(
  'The deadline represents the cutoff moment. Before it, voting is allowed, ' +
  'after it votes are silently dropped. The backend checks on write. ...',
),
```

Useful framings:
- **What the field represents** (not just its shape).
- **When it's null / default / empty**, if that's a real possibility.
- **What other fields constrain or are constrained by it** — but keep it short.
- **Units** — timestamps are ISO-8601, currency is minor units or decimal, etc.

## Applying `.describe()`

Chain it onto the field. Works on primitives, objects, arrays, unions,
`z.enum()`, `z.coerce.date()`.

```ts
import { z } from 'zod';

export const pollResponseSchema = z.looseObject({
  id: uuidSchema,
  buildingId: uuidSchema.describe('Building this poll belongs to.'),
  question: z
    .string()
    .describe('The question presented to voters. 1–500 chars, plain text.'),
  options: z
    .array(z.string())
    .describe(
      'Answer options in display order. Community polls: 2–6 options. ' +
      'Consensus polls: always `["Yes", "No"]`.',
    ),
  deadline: z
    .coerce.date()
    .optional()
    .describe(
      'ISO-8601 datetime after which votes are rejected. ' +
      'Null for consensus polls that run until consensus is reached.',
    ),
  pollType: pollTypeSchema.describe('`community` for open polls, `consensus` for building-wide agreements.'),
  // …
});
```

For enum values that need prose beyond the variant names, describe the
schema as a whole:

```ts
export const pollTypeSchema = z
  .enum(['community', 'consensus'])
  .describe(
    'Community polls require majority of votes cast. ' +
    'Consensus polls require 100% of eligible voters to agree.',
  );
```

## `.meta({ id: 'Name' })` — top-level schema registration

Every schema that the backend wants to reference as `$ref:
'#/components/schemas/Name'` must be tagged with `.meta({ id: 'Name' })`.
PascalCase, one distinct ID per distinct shape. Reuse an ID across schemas
only when the underlying shape is identical.

```ts
export const createPollSchema = z
  .object({ /* … */ })
  .meta({ id: 'CreatePoll' });

export const pollResponseSchema = z
  .looseObject({ /* … */ })
  .meta({ id: 'PollResponse' });
```

`.describe()` and `.meta()` compose freely — you can (and should) use both on
the same schema.

## Coverage test

`tests/schemas/describe-coverage.test.ts` enumerates exported response
schemas and asserts every field has a non-empty `.description`. CI fails the
build if a new field lands without a description.

To intentionally skip a trivial field, annotate at declaration:

```ts
// Will not be flagged by the coverage test:
id: uuidSchema, // trivial UUID, no description needed per convention
```

The coverage test's skip list is defined inline in the test file itself.
Prefer adding a description over expanding the skip list.

## Gotchas

- **`.describe()` after `.optional()` applies to the optional wrapper**, not
  the inner type. This is fine in practice — the description still renders
  in JSON Schema.
- **`z.looseObject()` carries descriptions through**. Extra fields parse
  through without affecting documented ones.
- **Discriminated unions** (e.g., `notificationDataSchemaByType`): describe
  the variant-specific fields in each branch, not on the union. Variants
  inherit base-schema descriptions automatically via `.extend()`.
- **Date schemas**: always describe the format. `z.coerce.date()` parses
  "ISO-8601 string or Date"; say so.
- **Nullable vs optional** — if the schema uses `.nullable().optional()`,
  describe under what conditions it's `null` vs absent.

## Checklist before shipping a schema PR

- [ ] Every public-API field has `.describe()` (or is in the skip list).
- [ ] Description is one sentence, states semantics, doesn't restate the type.
- [ ] Top-level exported schemas have `.meta({ id: 'PascalName' })`.
- [ ] `pnpm test` — includes `describe-coverage.test.ts`.
- [ ] `pnpm build` — rebuilds `dist/` cleanly.
- [ ] Changeset — minor bump if adding new exports, patch if pure additions
      to existing ones. See `versioning.md`.
