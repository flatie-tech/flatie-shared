# Flatie Shared

Shared types, enums, schemas, and utilities for Flatie applications (backend, frontend, mobile).

## Tech Stack

- **Runtime**: Node.js 20+, pnpm
- **Build**: tsup (ESM + CJS dual output)
- **Validation**: Zod 4 (peer dependency)
- **Testing**: Vitest
- **Linting/Formatting**: Biome
- **Git Hooks**: Lefthook

## Directory Structure

```
src/
├── index.ts              # Main barrel export
├── enums/                # Role, permission, building type enums (const objects)
│   ├── permission.enum.ts   # Permission const + domainPermissions()
│   ├── role.enum.ts         # BuildingRole, OrgRole, PlatformRole + canAssign*()
│   └── *.enum.ts            # BuildingType, PollType, etc.
├── schemas/              # Zod validation schemas
├── types/                # TypeScript type definitions
├── constants/            # Shared constants
├── urls/                 # URL/route helpers
└── utils/                # Shared utility functions
tests/                    # Vitest tests
```

## Commands

```bash
pnpm build          # Build with tsup (ESM + CJS + DTS)
pnpm dev            # Build in watch mode (tsup --watch)
pnpm test           # Run tests
pnpm test:watch     # Run tests in watch mode
pnpm lint           # Biome check
pnpm type-check     # TypeScript check (tsc --noEmit)
```

## How Consumers Use This Package

### Production / CI

Consumed as a git dependency:
```json
"@flatie/shared": "github:flatie-tech/flatie-shared#v0.2.0"
```
The `prepare` script runs `tsup` on install, building the package automatically.

### Local Development

Consumers use `file:` protocol for local development:
```json
"@flatie/shared": "file:../flatie-shared"
```

Run `pnpm dev` (tsup --watch) to rebuild on changes. Consumers need to run `pnpm install` after each rebuild to pick up the new hard-linked output.

### NEVER Recommend `pnpm link`

`pnpm link` creates symlinks that break Next.js (Turbopack can't resolve modules outside the project root) and leave persistent `pnpm-workspace.yaml` overrides that `pnpm unlink` does NOT clean up. Always use `file:` protocol instead.

## Releasing a New Version

1. Make changes in `src/`
2. Run `pnpm build && pnpm test`
3. Update version in `package.json`
4. Commit, tag (`git tag v0.x.0`), push with tags
5. Update consumer `package.json` references to new tag

## Key Design Decisions

- **Const objects over TypeScript enums**: Permissions, roles, etc. use `as const` objects for structural compatibility across packages (TypeScript enums create nominal types that break across package boundaries).
- **Zod 4 as peer dependency**: Both the backend and frontend use Zod 4. Zod schemas from this package can be imported directly by consumers.
- **Permission mappings live in the backend**: This package defines the Permission enum and helper functions (`domainPermissions`, `canAssignRole`). The role-to-permission mapping constants live in the backend (`permission-mappings.ts`) since they're a deployment concern, not a shared contract.
