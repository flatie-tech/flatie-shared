# @flatie/shared

Shared types, enums, schemas, and utilities for Flatie applications.

Used by:
- **flatie-backend** (NestJS API)
- **flatie-frontend** (Next.js web app)
- **flatie-mobile** (React Native mobile app)

## Installation

This package is distributed as a GitHub dependency (not published to npm):

```bash
# Production / CI
pnpm add github:flatie-tech/flatie-shared#v0.2.0

# Local development (recommended)
pnpm add file:../flatie-shared
```

**Peer dependency:** Requires `zod@^3.23.0`.

> **Do not use `pnpm link`** for local development. It creates symlinks that break Next.js/Turbopack module resolution. Use `file:` protocol instead.

## What's Included

### Permissions

90+ granular permissions for multi-layered RBAC:

```typescript
import { Permission, domainPermissions, SCOPED_DOMAINS } from '@flatie/shared';

// Flat permissions
Permission.BUILDING_CREATE       // 'building:create'
Permission.PLATFORM_VIEW_ORGS    // 'platform:view_orgs'
Permission.ORG_MANAGE_MEMBERS    // 'org:manage_members'

// Scoped domain permissions (notice, event, poll, failure_report, document, maintenance_log)
Permission.NOTICE_UPDATE_OWN     // 'notice:update:own'
Permission.NOTICE_UPDATE_ANY     // 'notice:update:any'

// Generate permission sets for a domain at a given access level
domainPermissions('notice', 'read');    // ['notice:read']
domainPermissions('notice', 'own');     // ['notice:read', 'notice:create', 'notice:update:own', 'notice:delete:own']
domainPermissions('notice', 'manage');  // [...own, 'notice:update:any', 'notice:delete:any']
```

### Roles

```typescript
import {
  BuildingRole,    // CO_OWNER, DEPUTY_REPRESENTATIVE, OWNER_REPRESENTATIVE
  OrgRole,         // OPERATIVE, REFERENT, SUPERVISOR, ORG_ADMIN
  PlatformRole,    // PLATFORM_OPERATIVE, PLATFORM_SUPPORT, PLATFORM_MODERATOR, PLATFORM_ADMIN
  Role,            // USER, ADMIN
} from '@flatie/shared';

// Role assignment rules (rank-based: can only assign roles at or below your rank)
import { canAssignRole, canAssignOrgRole, canAssignPlatformRole } from '@flatie/shared';

canAssignOrgRole(OrgRole.SUPERVISOR, OrgRole.REFERENT);    // true
canAssignOrgRole(OrgRole.REFERENT, OrgRole.SUPERVISOR);    // false
```

### Enums

```typescript
import {
  BuildingType,       // RESIDENTIAL, COMMERCIAL, RESIDENTIAL_COMMERCIAL
  PollType,           // STANDARD, WEIGHTED
  CommonStatus,       // ACTIVE, COMPLETED, CANCELLED
  ApprovalStatus,     // PENDING, APPROVED, REJECTED
  MaintenanceStatus,  // PENDING, IN_PROGRESS, COMPLETED, CANCELLED
  FailureStatus,      // PENDING, IN_PROGRESS, RESOLVED, CANCELLED
  Priority,           // LOW, MEDIUM, HIGH, URGENT
  // ... and more
} from '@flatie/shared';
```

### Schemas (Zod 3)

Validation schemas for auth, entities, and API payloads:

```typescript
import { loginSchema, registerSchema, createNoticeSchema } from '@flatie/shared/schemas';
import { permissionsResponseSchema } from '@flatie/shared/schemas';
```

> **Note:** These schemas use Zod 3. If your consumer uses Zod 4 (like the Next.js frontend), you cannot import them directly. Instead, derive Zod enums from the exported const objects.

### Types

TypeScript type definitions for entities, requests, and responses:

```typescript
import type { Building, User, Notice, PaginatedResponse } from '@flatie/shared/types';
```

### URL Constants

```typescript
import { API_ROUTES } from '@flatie/shared/urls';

API_ROUTES.AUTH.LOGIN                    // '/auth/login'
API_ROUTES.BUILDINGS.BY_ID('123')        // '/buildings/123'
API_ROUTES.NOTICES('building-id')        // '/buildings/building-id/notices'
```

### Utilities

```typescript
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@flatie/shared/utils';
import { formatCurrency, formatText, getDateRange } from '@flatie/shared/utils';
import { normalizePaginatedResponse } from '@flatie/shared/utils';
```

## Sub-path Imports

Import by category to reduce bundle size:

```typescript
import { Permission } from '@flatie/shared/enums';
import { loginSchema } from '@flatie/shared/schemas';
import type { Building } from '@flatie/shared/types';
import { API_ROUTES } from '@flatie/shared/urls';
import { hasPermission } from '@flatie/shared/utils';
import { queryKeys } from '@flatie/shared/constants';
```

Or import everything from the main entry:

```typescript
import { Permission, BuildingRole, hasPermission } from '@flatie/shared';
```

## Development

```bash
pnpm install     # Install dependencies
pnpm build       # Build (ESM + CJS + DTS via tsup)
pnpm dev         # Build in watch mode
pnpm test        # Run tests (Vitest)
pnpm test:watch  # Tests in watch mode
pnpm lint        # Biome check
pnpm type-check  # TypeScript check
```

### Project Structure

```
src/
├── index.ts              # Main barrel export
├── enums/                # Const object enums (Permission, roles, statuses)
│   ├── permission.enum.ts   # Permission + domainPermissions() + SCOPED_DOMAINS
│   └── role.enum.ts         # BuildingRole, OrgRole, PlatformRole + canAssign*()
├── schemas/              # Zod 3 validation schemas
├── types/                # TypeScript type definitions
├── constants/            # Query keys for React Query
├── urls/                 # API route constants
└── utils/                # Permission helpers, formatting, pagination
tests/
├── enums/                # Permission + role tests
└── utils/                # Utility tests
```

### Build Output

Built with [tsup](https://tsup.egoist.dev/):
- ESM (`.js`) for modern bundlers
- CJS (`.cjs`) for Node.js
- Type declarations (`.d.ts` + `.d.cts`)

The `prepare` script runs `tsup` automatically on `pnpm install`, so git dependency consumers get a built package without a separate build step.

## Releasing

1. Make changes in `src/`, run `pnpm build && pnpm test`
2. Bump version in `package.json`
3. Commit, tag (`git tag v0.x.0`), push with tags
4. Update consumer `package.json` references to the new tag

## Design Decisions

- **Const objects over TypeScript enums**: Permissions and roles use `as const` objects for structural compatibility across package boundaries (TS enums create nominal types that break when consumed across separate builds).
- **Zod 3 as peer dependency**: The backend uses Zod 3 directly. The frontend (Zod 4) derives its own enums from the exported const objects rather than importing Zod schemas.
- **Permission mappings in the backend**: This package defines the Permission enum and helpers. The role-to-permission mapping constants live in the backend since they're a deployment concern.

## License

MIT
