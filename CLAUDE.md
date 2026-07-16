# Flatie Shared — CLAUDE.md

## What this repo is

`@flatie/shared` — the cross-consumer source of truth for Flatie's types, enums, Zod schemas, API route constants, design tokens, and error codes. Consumed by `flatie-backend`, `flatie-frontend`, and `flatie-mobile`. Built with tsup (dual ESM + CJS output) and published as a git-tagged dependency or `file:` local link.

Full product orientation: [`../flatie-docs/team-knowledge/15-what-is-flatie.md`](../flatie-docs/team-knowledge/15-what-is-flatie.md).

## Fast facts

- **Stack:** Node 20+, pnpm, TypeScript, tsup, Vitest, Biome
- **Validation:** Zod 4 (peer dependency — consumers bring their own)
- **Current version:** see `package.json`
- **Consumers:** backend + frontend via `file:../flatie-shared` (local) or `github:flatie-tech/flatie-shared#<tag>` (CI/prod); mobile via `github:` tags only (EAS cloud builds can't resolve `file:` paths)
- **Never `pnpm link`** consumers — it breaks Next.js Turbopack and leaves persistent `pnpm-workspace.yaml` overrides

## When doing X, read Y

| Task | Read first |
|------|------------|
| Add a new enum / schema / constant | [`docs/conventions.md`](docs/conventions.md) |
| Add field-level `.describe()` or `.meta({ id })` | [`docs/schema-conventions.md`](docs/schema-conventions.md) |
| Release a new version | [`docs/versioning.md`](docs/versioning.md) |
| Set up local dev against consumers | [`docs/dependency-management.md`](docs/dependency-management.md) |
| Consume from React Native / mobile | [`docs/mobile-migration-guide.md`](docs/mobile-migration-guide.md) |

## Library docs via context7

When working with **Zod v4, tsup, Vitest** — pull current docs via `context7` before trusting training data. Zod 4 in particular has subtle differences from v3 (no more `.passthrough()` → `.looseObject()`).

## Doc hygiene (read before committing)

When you change X, check whether doc Y needs updating:

- **Break a schema / enum / route constant** → bump the minor (or major) version via `pnpm release`, then `node scripts/bump-shared.mjs` to bump consumers in the same session
- **Add a new subpath export** → update `package.json` `exports` map + `docs/conventions.md` if the export category changes
- **Add a new design token** → rebuild + update `flatie-frontend/docs/design-system.md` + bump consumers
- **Change the release flow** → `docs/versioning.md`
- **Drift from backend / frontend expectations** → document in `docs/error-code-audit.md` (for error codes) or add a contract test

Mobile consumes shared via pinned GitHub tags — breaking changes must be bumped in all three consumers in the same session.

## Directory structure

```
src/
├── index.ts              # Main barrel export
├── enums/                # Role, permission, building type, quota enums (as const objects)
├── schemas/              # Zod validation schemas (requests + responses)
├── errors/               # Error codes + DomainException helper
├── test-ids/             # E2E test-id constants per feature
├── tokens/               # Design tokens → emitted as TS, CSS, Tailwind preset
├── types/                # Standalone TypeScript types
├── constants/            # Shared constants (query keys, etc.)
├── urls/                 # API_ROUTES contract
├── utils/                # Pure utility functions
└── validation/           # UuidString, parseData, etc.
scripts/
└── emit-tokens-assets.mjs  # tsup onSuccess — emits tokens.css + tailwind-preset
tests/
```

## Design tokens

Three consumer shapes, all built from `src/tokens/*.ts`:

1. **Programmatic TS/JS** — `@flatie/shared/tokens` → `{ colors, themes, radii }` for runtime access
2. **CSS** — `@flatie/shared/tokens.css` → ready-to-import stylesheet; frontend imports in `globals.css` and Tailwind v4 `@theme inline` maps to utility classes
3. **Tailwind preset** — `@flatie/shared/tailwind-preset` → v3-compatible preset (default light colors + raw `tokens` export with dark + per-theme data) for NativeWind on mobile

Outputs #2 and #3 are generated post-build by `scripts/emit-tokens-assets.mjs` (wired into `tsup.config.ts` `onSuccess`).

Token-change workflow: edit `src/tokens/*.ts` → `pnpm build && pnpm test` → bump version → tag → push → bump consumers.

## Commands

```bash
pnpm build            # tsup (ESM + CJS + DTS)
pnpm dev              # tsup --watch
pnpm test             # vitest (CI-style, one run)
pnpm test:watch       # vitest watch
pnpm lint             # biome check
pnpm type-check       # tsc --noEmit
pnpm release -- --minor   # cut a release: build+test+bump+CHANGELOG+tag+push (scripts/release.mjs)
node scripts/bump-shared.mjs  # update all three consumer pins to the latest tag
```

## Key design decisions

- **Const objects over TypeScript enums** — permissions, roles, etc. are `as const` objects. TypeScript enums create nominal types that break across package boundaries.
- **Zod 4 as peer dependency** — all three consumers (backend, frontend, mobile) use Zod 4; schemas import directly.
- **Permission mappings live in this package** — `Permission` enum, `canAssign*()` helpers, AND the role → permission mappings (`src/constants/role-permissions.ts`: `BUILDING_ROLE_PERMISSIONS`, `ORG_ROLE_PERMISSIONS`, `PLATFORM_ROLE_PERMISSIONS`). They moved here from the backend in v0.7.0 so clients can evaluate permissions without an API round-trip. `flatie-backend/src/shared/constants/permission-mappings.ts` is now just a re-export.
- **Unified permission checker** — `createPermissionChecker(subject)` (`src/utils/permission-checker.ts`) is the single isomorphic `can()` surface (Flatie's analogue of Clerk's `has()`); it backs both the backend guards and the client hooks over `PermissionSubject` (`{ userId, permissions }`). The raw `string[]` helpers in `src/utils/permissions.ts` are deprecated in its favour.
