#!/usr/bin/env node
/**
 * Bump the @flatie/shared pin in all three consumers to a released tag.
 *
 * Usage:
 *   node scripts/bump-shared.mjs           # latest tag
 *   node scripts/bump-shared.mjs v0.59.0   # explicit tag
 *
 * For each sibling consumer repo: rewrites the pin to
 * `github:flatie-tech/flatie-shared#<tag>`, refreshes the lockfile, and
 * type-checks. Commit/push per repo is left to you (merge order:
 * backend → frontend → mobile, per docs/versioning.md).
 *
 * Mobile must ALWAYS use a GitHub tag (EAS cloud builds cannot resolve
 * file: paths); backend/frontend may use file:../flatie-shared locally
 * but never committed — consumer CI rejects committed file: pins.
 */

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const sharedRoot = resolve(new URL('..', import.meta.url).pathname);
const consumers = ['flatie-backend', 'flatie-frontend', 'flatie-mobile'];

function capture(cmd, cwd) {
  return execSync(cmd, { encoding: 'utf8', cwd }).trim();
}

let tag = process.argv[2];
if (!tag) {
  tag = capture('git describe --tags --abbrev=0', sharedRoot);
  console.log(`No tag given — using latest: ${tag}`);
}
if (!/^v\d+\.\d+\.\d+$/.test(tag)) {
  console.error(`✖ Invalid tag: ${tag}`);
  process.exit(1);
}
if (capture(`git tag -l ${tag}`, sharedRoot) === '') {
  console.error(`✖ Tag ${tag} does not exist locally. Release first (scripts/release.mjs).`);
  process.exit(1);
}

const pin = `github:flatie-tech/flatie-shared#${tag}`;
const failures = [];

for (const name of consumers) {
  const repo = resolve(sharedRoot, '..', name);
  const pkgPath = resolve(repo, 'package.json');
  if (!existsSync(pkgPath)) {
    console.warn(`⚠ ${name}: not found at ${repo}, skipping`);
    continue;
  }

  console.log(`\n── ${name} ──`);
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const current = pkg.dependencies?.['@flatie/shared'];
  if (!current) {
    console.warn(`⚠ ${name}: no @flatie/shared dependency, skipping`);
    continue;
  }
  if (current === pin) {
    console.log(`already on ${tag}`);
    continue;
  }

  console.log(`${current} → ${pin}`);
  pkg.dependencies['@flatie/shared'] = pin;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  try {
    execSync('pnpm install', { stdio: 'inherit', cwd: repo });
    execSync('pnpm type-check', { stdio: 'inherit', cwd: repo });
    console.log(`✔ ${name} bumped and type-checks`);
  } catch {
    failures.push(name);
    console.error(`✖ ${name}: install or type-check failed — inspect before committing`);
  }
}

console.log('\nDone. Commit each repo separately; merge order: backend → frontend → mobile.');
if (failures.length > 0) {
  console.error(`Failures: ${failures.join(', ')}`);
  process.exit(1);
}
