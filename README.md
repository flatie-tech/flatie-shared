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

**Peer dependency:** Requires `zod@^4.0.0`.

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
  PollType,           // CONSENSUS, COMMUNITY
  CommonStatus,       // ACTIVE, COMPLETED, CANCELLED
  ApprovalStatus,     // PENDING, APPROVED, REJECTED
  FailureStatus,      // PENDING, IN_PROGRESS ('inProgress'), RESOLVED
  Priority,           // NORMAL, URGENT
  BuildingStatus,     // PENDING_APPROVAL, ACTIVE, REJECTED
  OrgStatus,          // PENDING_APPROVAL, ACTIVE, REJECTED
  OrgType,            // MANAGEMENT_FIRM, PLATFORM
  ApartmentRole,      // OWNER, TENANT (apartment-scoped — distinct from BuildingRole)
  PollStatus,         // active, completed, cancelled
  FailureLocationType,// common_area, own_unit
  FailureUnitType,    // apartment, garage, storage_unit
  MaintenanceLogFinancedBy,  // building_funds, insurance, co_owner
  NotificationType,   // 32 notification event names
  NotificationCategory,
  NotificationChannel,
  NotificationDeliveryStatus,
  DevicePlatform,     // ios, android, web
  // ... and more
} from '@flatie/shared';
```

### Enum Rules

Shared exports **only** string sets that the backend enforces via `pgEnum()`. The backend (Drizzle) is the canonical source — if a value isn't in a backend `pgEnum`, it isn't a shared enum.

| Rule | Why |
|---|---|
| Every `pgEnum()` in `flatie-backend/src/db/schema/` has a matching const object here. The backend schema imports it instead of inlining the string array. | Single source of truth. Mobile/frontend can't drift if there's only one definition. |
| App-level conventions that **aren't** persisted with a DB constraint (e.g. `MaintenanceStatus`, `Frequency`, `FileCategory`, `NoticeType`) stay in consumer packages. They're intentionally NOT in shared. | A shared enum promises backend validation. Inventing values here that backend doesn't check creates false confidence. |
| When adding a new `pgEnum` to the backend, you **must** also add it to `@flatie/shared/enums` and import it in the Drizzle schema. | Keeps the invariant above. |
| Use `const` objects (`as const`) with a same-named type — **never** TypeScript `enum`. | TS enums create nominal types that break across package boundaries; const objects are structural and work with string literals. |

### Schemas (Zod 4)

Validation schemas for auth, entities, and API payloads:

```typescript
import { loginSchema, registerSchema, createNoticeSchema } from '@flatie/shared/schemas';
import { permissionsResponseSchema } from '@flatie/shared/schemas';
```

### Types

TypeScript type definitions for entities, requests, and responses:

```typescript
import type { Building, User, Notice, PaginatedResponse } from '@flatie/shared/types';
```

### Design Tokens

OKLCH color tokens, per-context themes (org, admin, platform, representatives), and radii — extracted from `flatie-frontend/src/app/globals.css` and now the canonical source.

Three consumer shapes:

```typescript
// 1. Programmatic — read tokens in JS/TS code
import { colors, themes, radii } from '@flatie/shared/tokens';
colors['background'].light;          // 'oklch(1 0 0)'
themes.org.dark.primary;             // 'oklch(0.6 0.17 145)'
radii.radius;                        // '0.625rem'
```

```css
/* 2. CSS — frontend (Tailwind v4) */
@import '@flatie/shared/tokens.css';
```

```js
// 3. Tailwind preset — mobile (NativeWind)
const flatiePreset = require('@flatie/shared/tailwind-preset');
module.exports = {
  presets: [flatiePreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

The CSS output defines `:root`, `.dark`, `.theme-<name>` and `.dark .theme-<name>` blocks. Frontend's `globals.css` `@theme inline` block stays in the consumer — it maps CSS variables to Tailwind utility class names (web-specific concern).

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
import { colors, themes } from '@flatie/shared/tokens';
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
- **Zod 4 as peer dependency**: Backend, frontend, and shared all use Zod 4. Schemas can be imported directly by any consumer.
- **Permission mappings in the backend**: This package defines the Permission enum and helpers. The role-to-permission mapping constants live in the backend since they're a deployment concern.
- **Design tokens**: Shared owns the wire contract for visual tokens (colors, themes, radii). Frontend's `@theme inline` Tailwind v4 block stays in the consumer — that's a web-specific mapping layer, not a shared token concern.

## License

MIT
