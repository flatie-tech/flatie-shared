#!/usr/bin/env bash
# Pre-commit / CI doc-hygiene reminders for flatie-shared.
# This is the source of truth package — almost every change here cascades.
#
# Triggers:
#   - src/enums/**                (cascades to all consumers + team-knowledge)
#   - src/schemas/**              (cascades to consumers)
#   - src/urls/**                 (API_ROUTES contract — affects 05-api-reference.md)
#   - src/tokens/**               (design tokens — affects frontend design-system.md)
#   - src/errors/**               (error codes — affects backend behavior)

set -uo pipefail

if [ -n "${GITHUB_ACTIONS:-}" ]; then
  base="${GITHUB_BASE_REF:-staging}"
  git fetch origin "$base" --depth=1 2>/dev/null || true
  changed=$(git diff --name-only "origin/$base...HEAD" 2>/dev/null)
else
  changed=$(git diff --cached --name-only 2>/dev/null)
fi

[ -z "$changed" ] && exit 0
reminders=()

if echo "$changed" | grep -qE "^src/enums/"; then
  reminders+=("Shared enum changed. (1) write a changeset, bump the version, (2) update flatie-docs/team-knowledge/02-data-model.md and 10-glossary.md, (3) bump flatie-backend + flatie-frontend (and flatie-mobile if applicable) consumer pins in this session — per the 'breaking shared bump' rule.")
fi
if echo "$changed" | grep -qE "^src/schemas/"; then
  reminders+=("Shared schema changed. Bump version + changeset. Verify response shapes haven't drifted from backend. Bump consumers in this session.")
fi
if echo "$changed" | grep -qE "^src/urls/"; then
  reminders+=("API_ROUTES contract changed. Update flatie-docs/team-knowledge/05-api-reference.md. Backend contract test (openapi-generation.spec.ts) must still pass. Bump consumers in this session.")
fi
if echo "$changed" | grep -qE "^src/tokens/"; then
  reminders+=("Design tokens changed. Bump version. flatie-frontend/docs/design-system.md may need updating. Re-build (pnpm build) to regenerate tokens.css + tailwind-preset.")
fi
if echo "$changed" | grep -qE "^src/errors/"; then
  reminders+=("Error codes changed. Update flatie-docs/team-knowledge/05-api-reference.md if these surface on the wire. Bump consumers.")
fi

if [ ${#reminders[@]} -eq 0 ]; then
  exit 0
fi

{
  echo ""
  echo "── Doc hygiene reminders ────────────────────────────────────────"
  for r in "${reminders[@]}"; do
    printf "  • %s\n\n" "$r"
  done
  echo "(reminders only — commit not blocked.)"
  echo "─────────────────────────────────────────────────────────────────"
} >&2

exit 0
