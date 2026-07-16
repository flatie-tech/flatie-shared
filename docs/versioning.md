# Versioning policy

`@flatie/shared` follows [semver](https://semver.org) with some opinionated rules
about what counts as a breaking change for this specific package. The goal is to
make consumer bumps predictable: a patch bump should never require consumer code
changes; a minor bump may unlock new features but never break existing ones; a
major bump signals that some consumers must update.

This doc is the tiebreaker when you're cutting a release (`pnpm release`,
scripts/release.mjs) and wondering which scope to pick.

---

## Patch

Use **patch** when the change is purely additive or purely corrective and no
reasonable consumer can break:

- Adding a new export (schema, constant, enum value, utility, URL builder).
  Callers that don't import it are unaffected; callers that do gain a new tool.
- Widening a response schema (making a required field optional, or adding an
  optional field). Consumers that already accept the old shape still accept the
  new shape.
- Adding a new entry to an enum's const object **if**:
    - No consumer does an exhaustive switch / mapping on that enum today, AND
    - The test suite here doesn't hard-pin a specific enum size.
  When in doubt, pick minor.
- Fixing a bug in a utility where the old behavior was objectively wrong (e.g.
  `formatCroatianCurrency('invalid')` now returns a sentinel instead of crashing).
- Internal refactors, doc updates, dependency bumps that don't affect the public
  surface, CI changes, test additions.
- Deleting something that has been `@deprecated` for at least one minor cycle
  **and** has zero consumers across `flatie-backend`, `flatie-frontend`, and
  `flatie-mobile` at HEAD. Verify with grep before deletion; if the type was on
  an npm-published branch or any external consumer exists, promote to major.

Edge case: **tightening a response schema from `z.looseObject({...})` to
`z.object({...})` is not a patch** — it's a potential break for any consumer
that does strict parsing. Treat as minor or major depending on whether the
tightening narrows away fields real consumers use.

---

## Minor

Use **minor** when:

- Adding a new subpath export (`./foo`) — requires edits to `package.json`,
  `tsup.config.ts`, and the root barrel. Consumers don't need to update, but
  they gain a new import surface and the package's public API has grown.
- Adding a new Zod schema, enum, or type that consumers are expected to adopt.
- Tightening a response schema when the tightening rejects inputs that were
  never actually produced by the backend, but were technically accepted by the
  old schema. Document the tightening in the CHANGELOG entry so consumers can audit.
- Adding required fields to a schema the backend has always been sending but
  that were previously typed as optional in shared.
- Deprecating an export (JSDoc `@deprecated`) while leaving it in place.
- Adding a new notification-data variant, error code, or permission string.
- Adding a new route builder to `API_ROUTES`.

---

## Major

Use **major** when any of:

- Removing a non-deprecated export (or removing something deprecated less than
  one minor cycle ago).
- Narrowing an enum (removing a value or relabelling it).
- Renaming a public export.
- Changing a schema in a way that causes previously-valid payloads to fail
  validation.
- Changing the signature of a utility or URL builder.
- Changing the target runtime (Node engine bump, Zod major bump).
- Removing a subpath export.

Major bumps are expensive in this monorepo — every consumer needs a coordinated
update PR. Before picking major, check whether the change can be shipped in two
steps:

1. A minor release that adds the new thing alongside the old one (old marked
   `@deprecated`).
2. A major release, one or two minors later, that removes the old thing.

This is almost always the right choice over a one-shot major.

---

## Coordinated releases

When a major lands, or when multiple consumers need to upgrade at the same
time:

1. Cut the release from `main` with `pnpm release --minor` (builds, tests, bumps, writes the CHANGELOG, tags, pushes). Then run `node scripts/bump-shared.mjs v<X.Y.Z>` to update all three consumer pins + lockfiles.
2. Open the bump PRs in parallel: `flatie-backend`, `flatie-frontend`,
   `flatie-mobile` — branch off each repo's staging/dev at the same time.
3. Merge in this order: **backend first, then frontend, then mobile.** The
   backend change is the source of truth; frontend and mobile validate against
   the already-deployed contract.
4. If any consumer's bump reveals a contract issue, **do not** merge the other
   consumers' bumps until a fix lands in shared. The alternative — shipping a
   divergent contract — is worse than temporarily holding everyone on the old
   version.

---

## Yanking / rollback

Changesets does not support npm-style `yank`, and since we distribute via git
tags, deleting a tag breaks consumers. So **rollback is forward-only**:

1. Identify the offending version (e.g. `v0.21.0`).
2. Open a new PR that reverts the bad commits on `main`.
3. Note the revert in the CHANGELOG entry.
4. Ship `v0.21.1` — the fixed version.
5. Notify consumers to bump to `v0.21.1` (or skip back to `v0.20.x` if the
   minor needs more baking). Never retag `v0.21.0` to point at different SHAs.

If the bad version is actively causing production pain in a consumer and a
forward fix isn't ready, the immediate mitigation is for each consumer to pin
to the previous known-good tag in their own `package.json`. Shared itself does
not need an emergency response unless the release pipeline is broken.

---

## When you're not sure

Pick the more conservative bump. A "patch that broke consumers" generates more
work (surprise coordination, hotfix release, retro) than a "minor that looked
like a patch" (everyone shrugs).
