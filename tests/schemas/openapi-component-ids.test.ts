import { describe, expect, it } from 'vitest';
import * as rootBarrel from '../../src/index';

/**
 * Guards the OpenAPI component ids this package publishes.
 *
 * The backend generates Swagger components ONLY for schemas tagged with
 * `.meta({ id: 'Name' })` — `zod-pipe.decorator.ts` registers a schema when a
 * controller passes it to `@ZodBody` / `@ZodQuery` and it carries an id.
 * Everything else is invisible to the generator. So a hand-written
 * `$ref: '#/components/schemas/Name'` in a `*.docs.ts` file resolves only if
 * *some* schema declares that exact id, and a dangling `$ref` fails silently:
 * Swagger renders an empty request body, nothing throws, no test notices.
 *
 * That has happened twice. `CreateBugReport` + three siblings dangled from the
 * moment the module shipped and had to be fixed by hand in a56204d; the same
 * sweep then found `UpsertPricuvaOpeningBalances`, `OrgAiImportCommit`,
 * `MapPricuvaRef`, `SubmitIdCardVerification`, `RejectIdCardVerification` and
 * five ids that drifted apart from the docs' spelling (`CreateOwner` vs
 * `CreateOwnerInput`).
 *
 * Why this shape and not "every exported request/response schema must have an
 * id": most contracts here are re-wrapped backend-side in a `*.dto.ts` that
 * attaches the id itself (`createNoticeSchema.meta({ id: 'CreateNotice' })`),
 * so a blanket rule would demand ~70 ids that nothing references and would
 * risk colliding with the backend's own. The ids that MUST live here are
 * exactly the ones whose schema the backend passes through unwrapped — which
 * this package cannot introspect, so they are pinned below. The pin is the
 * review surface: adding or renaming a shared contract the backend `$ref`s
 * fails here until both sides agree.
 */

/** Raw source of every module, for a static scan of `.meta({ id })` sites. */
const sources = import.meta.glob<string>('../../src/**/*.ts', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const META_ID_RE = /\.meta\(\{\s*id:\s*'([A-Za-z0-9_]+)'/g;

/** `id -> source files declaring it`. */
const declaredIds = new Map<string, string[]>();
for (const [path, source] of Object.entries(sources)) {
  for (const match of source.matchAll(META_ID_RE)) {
    const id = match[1] as string;
    declaredIds.set(id, [...(declaredIds.get(id) ?? []), path]);
  }
}

/** Ids actually attached to a schema reachable from the root barrel. */
const reachableIds = new Set<string>();
for (const value of Object.values(rootBarrel as Record<string, unknown>)) {
  const meta = (value as { meta?: () => { id?: string } | undefined })?.meta;
  if (typeof meta !== 'function') continue;
  const id = value === null ? undefined : meta.call(value)?.id;
  if (id) reachableIds.add(id);
}

/**
 * Component ids the backend's `*.docs.ts` files `$ref` against a schema THIS
 * package owns — i.e. the controller hands the shared schema to `@ZodBody` /
 * `@ZodQuery` unwrapped, so the `.meta({ id })` has to be declared here.
 *
 * Regenerate with, from the backend repo root:
 *
 *   grep -rho "#/components/schemas/[A-Za-z0-9_]*" src | sort -u
 *
 * and keep the entries whose schema comes from `@flatie/shared`. Ids the
 * backend registers on its own local DTOs do NOT belong here.
 */
const BACKEND_REFERENCED_COMPONENT_IDS = [
  'AssignOwnerInput',
  'CreateBugReport',
  'CreateBusinessPartnerInput',
  'CreateDocument',
  'CreateDsarEvent',
  'CreateDsarRequest',
  'CreateOwnerInput',
  'CreatePlatformSubscription',
  'DsarErasure',
  'InviteOwner',
  'ListBugReportsResponse',
  'MapPricuvaRef',
  'OrgAiImportCommit',
  'OrgAiImportCommitResponse',
  'OrgAiImportExtractResponse',
  'PostPricuvaChargesResponse',
  'PricuvaOpeningBalancesResponse',
  'RecordDsarRectification',
  'RejectIdCardVerification',
  'SetDsarRestriction',
  'SubmitIdCardVerification',
  'UpdateBugReport',
  'UpdateBusinessPartnerInput',
  'UpdateDocument',
  'UpdateDsarRequest',
  'UpdateEnterpriseRequest',
  'UpdateOwnerInput',
  'UpdatePlatformSubscription',
  'UpsertPricuvaOpeningBalances',
] as const;

describe('OpenAPI component ids', () => {
  it('finds the .meta({ id }) sites (the source glob still matches)', () => {
    // Guards against the glob silently matching nothing after a move — the
    // suite would otherwise "pass" while scanning zero files.
    expect(Object.keys(sources).length).toBeGreaterThan(50);
    expect(declaredIds.size).toBeGreaterThan(20);
  });

  it('declares each component id exactly once', () => {
    // Two schemas sharing an id collapse into one component: whichever the
    // generator visits last wins, and the other route documents a body it
    // does not accept.
    const duplicated = [...declaredIds.entries()]
      .filter(([, paths]) => paths.length > 1)
      .map(([id, paths]) => `${id} — ${paths.join(', ')}`);

    expect(duplicated, `Duplicate .meta({ id }) values:\n  ${duplicated.join('\n  ')}`).toEqual([]);
  });

  it('exports every schema it registers an id for', () => {
    // An id on a schema the root barrel does not export can never reach a
    // consumer's document — the registration is dead weight.
    const unreachable = [...declaredIds.keys()].filter((id) => !reachableIds.has(id));

    expect(
      unreachable,
      [
        'These ids are declared but their schema is not reachable from the root barrel:',
        ...unreachable.map((id) => `  • ${id} (${declaredIds.get(id)?.join(', ')})`),
        '',
        'Either export the schema from every barrel level, or drop the .meta({ id }).',
      ].join('\n'),
    ).toEqual([]);
  });

  it.each(
    BACKEND_REFERENCED_COMPONENT_IDS,
  )('%s — the backend $refs it, so this package must declare it', (id) => {
    expect(
      declaredIds.has(id),
      `No schema in src/ carries .meta({ id: '${id}' }), so the backend's ` +
        `$ref: '#/components/schemas/${id}' dangles and Swagger renders an ` +
        'empty body for that route.',
    ).toBe(true);
    expect(reachableIds.has(id), `'${id}' is declared but not exported from the root barrel.`).toBe(
      true,
    );
  });
});
