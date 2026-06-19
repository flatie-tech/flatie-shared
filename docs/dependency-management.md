---
last_verified: 2026-04-24
---

# Depending on `@flatie/shared`

How backend, frontend, and mobile consume `@flatie/shared`. Consolidated from the three CLAUDE.mds so there's one source of truth for the workflow.

## context7 — pull current docs before coding

- `pnpm` — `file:` protocol semantics and workspace config
- `tsup` — build outputs the `dist/` that consumers hard-link to

## Two modes

| Mode | `package.json` entry | Use when |
|------|----------------------|----------|
| **Production / CI** | `"@flatie/shared": "github:flatie-tech/flatie-shared#vX.Y.Z"` | Deploys, CI pipelines, any commit |
| **Local development** | `"@flatie/shared": "file:../flatie-shared"` | Iterating on a shared change alongside a consumer |

For the production tag, read the latest release on GitHub or `flatie-shared/package.json`. Do **not** copy a version from a doc — it will be stale.

## Local development workflow

```bash
# Terminal 1 — watch & rebuild shared on every change
cd ../flatie-shared && pnpm dev       # tsup --watch

# Terminal 2 — the consumer (backend / frontend / mobile)
# After each shared rebuild, reinstall to pick up the new dist/:
pnpm install
```

Why `pnpm install` after a rebuild: `file:` hard-links the built `dist/` directory. pnpm caches the link by content hash — rebuilding `dist/` changes the hash, but only `pnpm install` updates the cache. Without it, consumers run against the previous build.

## NEVER use `pnpm link`

`pnpm link` creates **symlinks** that break in several ways:

1. **Next.js Turbopack** cannot resolve modules outside the project root — the frontend crashes on boot.
2. **Peer dependency resolution** picks up the shared package's peer (Zod) from the symlinked location instead of the consumer's — Zod 3 (mobile) ends up being loaded inside Zod 4 (backend / frontend) tests.
3. **`pnpm link` writes a persistent `pnpm-workspace.yaml` override** (`overrides: { '@flatie/shared': link:../flatie-shared }`) that **`pnpm unlink` does not clean up**.

### If you accidentally ran `pnpm link`

```bash
# In the consumer repo
rm pnpm-workspace.yaml                  # if it has an @flatie/shared override
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

Verify the fix: `cat package.json | grep flatie/shared` should show `"file:../flatie-shared"` or a git ref, never `"link:…"`.

## Switching between local and remote

```bash
# Switch to local
pnpm remove @flatie/shared && pnpm add file:../flatie-shared

# Switch back (before commit / deploy)
pnpm remove @flatie/shared && pnpm add github:flatie-tech/flatie-shared#<tag>
```

Do this before pushing a branch — a committed `file:` entry will fail CI (the `../flatie-shared` path doesn't exist in the Railway build image).

## Breaking changes — consumer coordination

When a change in `@flatie/shared` is breaking (enum value renamed, schema shape changed, type removed):

1. Land the change + bump the version in `flatie-shared`.
2. **In the same session**, bump every consumer (`flatie-backend`, `flatie-frontend`, `flatie-mobile`) — adjust code as needed, run tests, commit.

This is codified as feedback memory: "After a breaking `@flatie/shared` release, bump consumers in the same session." Drift between consumers is the number-one source of silent prod bugs.

Release workflow + semver policy: `flatie-shared/docs/versioning.md`.

## Mobile note

`flatie-mobile` consumes `@flatie/shared` via pinned GitHub tags (`github:flatie-tech/flatie-shared#vX.Y.Z`) — never `file:`. EAS cloud builds can't resolve local `file:` paths, so mobile always uses the tagged remote. Frontend and backend use `file:` during local development and switch to a tag before pushing.

## Doc hygiene

If the consumption pattern changes (new consumer, new protocol, new workspace layout):
- Update this file
- Update every consumer CLAUDE.md's pointer to this doc
- Update `flatie-shared/docs/versioning.md` if the release flow also changes

---

_Last verified against: `flatie-shared@1b36cc3` on 2026-06-19. Re-run `flatie-docs/scripts/verify/run-all.sh` and update this line whenever you do a deeper review._
