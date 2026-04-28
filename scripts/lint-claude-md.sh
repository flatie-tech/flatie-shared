#!/usr/bin/env bash
# CLAUDE.md template + integrity linter.
#
# Checks:
#   1. Required template sections are present (heading match)
#   2. All markdown links to .md files or directories resolve relative to the file
#   3. File is <= 200 lines (lean pointer-index, not a manual)
#
# Usage:
#   bash claude-md-lint.sh [<path-to-CLAUDE.md>]
#
# Defaults to ./CLAUDE.md if no argument is given.
# Exits non-zero on any failure (suitable for lefthook + CI).
#
# This script is intended to be vendored into each Flatie subrepo at
# scripts/lint-claude-md.sh — the canonical copy lives here in flatie-docs.

set -uo pipefail

CLAUDE_MD="${1:-CLAUDE.md}"
if [ ! -f "$CLAUDE_MD" ]; then
  echo "::error::$CLAUDE_MD not found in $(pwd)"
  exit 1
fi

failed=0

# 1) Required template sections (matched as markdown headings, case-sensitive).
required=(
  "What this repo is"
  "Fast facts"
  "When doing X, read Y"
  "Library docs via context7"
  "Doc hygiene"
  "Commands"
)
for section in "${required[@]}"; do
  # Match a heading line (one or more #) ending with this exact text.
  if ! grep -qE "^#+ +.*${section}" "$CLAUDE_MD"; then
    echo "::error file=$CLAUDE_MD::Missing required template section: '$section'"
    failed=$((failed+1))
  fi
done

# 2) Line count cap (lean pointer-index philosophy).
lines=$(wc -l < "$CLAUDE_MD" | tr -d ' ')
if [ "$lines" -gt 200 ]; then
  echo "::error file=$CLAUDE_MD::Length $lines lines exceeds 200-line cap. Move heavy content to per-repo docs/ and link to it."
  failed=$((failed+1))
fi

# 3) Link integrity. Look at every markdown link [text](path) where path
#    ends in .md or / (directory) and verify the target exists relative to
#    the CLAUDE.md's parent directory.
DIR="$(cd "$(dirname "$CLAUDE_MD")" && pwd)"

# .md links
while IFS= read -r raw; do
  # raw looks like ](path/to/foo.md) or ](path.md#anchor)
  path=$(printf '%s' "$raw" | sed -E 's#^]\(##; s#\)$##; s#\#.*$##')
  [ -z "$path" ] && continue
  # Skip absolute URLs (http(s):, mailto:, etc.)
  case "$path" in
    http://*|https://*|mailto:*) continue ;;
  esac
  if [ ! -e "$DIR/$path" ]; then
    echo "::error file=$CLAUDE_MD::Broken .md link: $path (resolves to $DIR/$path)"
    failed=$((failed+1))
  fi
done < <(grep -oE '\]\([^)]+\.md[^)]*\)' "$CLAUDE_MD" | awk '!seen[$0]++')

# directory links
while IFS= read -r raw; do
  path=$(printf '%s' "$raw" | sed -E 's#^]\(##; s#\)$##')
  [ -z "$path" ] && continue
  case "$path" in
    http://*|https://*) continue ;;
  esac
  if [ ! -d "$DIR/$path" ]; then
    echo "::error file=$CLAUDE_MD::Broken dir link: $path (resolves to $DIR/$path)"
    failed=$((failed+1))
  fi
done < <(grep -oE '\]\([^)]+/\)' "$CLAUDE_MD" | awk '!seen[$0]++')

if [ $failed -gt 0 ]; then
  echo "::error::$failed CLAUDE.md lint check(s) failed in $CLAUDE_MD"
  exit 1
fi

# Quiet success — only chatter on failure.
exit 0
