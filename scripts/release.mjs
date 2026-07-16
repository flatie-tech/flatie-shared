#!/usr/bin/env node
/**
 * Release @flatie/shared: verify → bump → changelog → tag → push.
 *
 * Usage:
 *   node scripts/release.mjs --minor            # or --patch / --major
 *   node scripts/release.mjs --version 0.61.0   # explicit version
 *   node scripts/release.mjs --minor --notes "One-line summary for the CHANGELOG"
 *   node scripts/release.mjs --minor --dry-run  # everything except commit/tag/push
 *
 * Replaces the never-adopted changesets flow. Releases happen from `main`
 * with a clean tree; the tag carries a freshly built dist/ (git-tracked —
 * GitHub-tag consumers install without running builds; see .gitignore note).
 * Rollback is forward-only: never retag (docs/versioning.md).
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

function run(cmd, opts = {}) {
  console.log(`$ ${cmd}`);
  return execSync(cmd, { stdio: opts.capture ? 'pipe' : 'inherit', encoding: 'utf8', ...opts });
}

function capture(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

function fail(msg) {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
}

// ── Preconditions ───────────────────────────────────────────────────────
const branch = capture('git branch --show-current');
if (branch !== 'main' && !dryRun) {
  fail(`Releases are cut from main (current: ${branch}). Merge your branch first.`);
}
if (capture('git status --porcelain') !== '' && !dryRun) {
  fail('Working tree is not clean. Commit or stash first.');
}
run('git fetch --tags origin');
if (!dryRun && capture('git rev-list HEAD..origin/main --count') !== '0') {
  fail('main is behind origin/main. Pull first.');
}

// ── Version math ────────────────────────────────────────────────────────
const pkgPath = new URL('../package.json', import.meta.url).pathname;
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const [maj, min, pat] = pkg.version.split('.').map(Number);

let next;
const explicit = args.indexOf('--version');
if (explicit !== -1) next = args[explicit + 1];
else if (args.includes('--major')) next = `${maj + 1}.0.0`;
else if (args.includes('--minor')) next = `${maj}.${min + 1}.0`;
else if (args.includes('--patch')) next = `${maj}.${min}.${pat + 1}`;
else fail('Pass --patch, --minor, --major, or --version X.Y.Z');

if (!/^\d+\.\d+\.\d+$/.test(next)) fail(`Invalid version: ${next}`);
if (capture(`git tag -l v${next}`) !== '') fail(`Tag v${next} already exists — never retag.`);

const lastTag = capture('git describe --tags --abbrev=0');
console.log(`\nReleasing ${pkg.version} → ${next} (last tag: ${lastTag})\n`);

// ── Verify ──────────────────────────────────────────────────────────────
run('pnpm build');
run('pnpm test');
run('pnpm type-check');
run('pnpm lint');

// ── CHANGELOG ───────────────────────────────────────────────────────────
const notesIdx = args.indexOf('--notes');
const commitSubjects = capture(`git log ${lastTag}..HEAD --format="- %s" --no-merges`);
const body =
  notesIdx !== -1
    ? `- ${args[notesIdx + 1]}`
    : commitSubjects || '- (no commits since last tag — version-only release)';

const changelogPath = new URL('../CHANGELOG.md', import.meta.url).pathname;
const changelog = readFileSync(changelogPath, 'utf8');
const entry = `## ${next}\n\n### Changes\n\n${body}\n\n`;
const updated = changelog.replace(/^# @flatie\/shared\n\n/, `# @flatie/shared\n\n${entry}`);
if (updated === changelog)
  fail('CHANGELOG.md header not found — expected "# @flatie/shared" first line.');

if (dryRun) {
  console.log('\n── dry run ── would write CHANGELOG entry:\n');
  console.log(entry);
  console.log(`── dry run ── would bump package.json to ${next}, commit, tag v${next}, push.`);
  process.exit(0);
}

writeFileSync(changelogPath, updated);
pkg.version = next;
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

// dist/ was rebuilt by pnpm build above; it is git-tracked and must ride the tag.
run('git add package.json CHANGELOG.md dist');
run(`git commit -m "release: v${next}"`);
run(`git tag -a v${next} -m "v${next}"`);
run('git push origin main --follow-tags');

console.log(`\n✔ Released v${next}. Now bump consumers:\n  node scripts/bump-shared.mjs v${next}`);
