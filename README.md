# @flatie/shared

Shared types, schemas, enums, and utilities for Flatie applications.

## Overview

This package provides common code shared across the Flatie ecosystem:

- **flatie-backend** - NestJS API server
- **flatie-frontend** - Next.js web application
- **flatie-mobile** - React Native mobile app

## Installation

```bash
# Using pnpm (recommended)
pnpm add @flatie/shared

# Using npm
npm install @flatie/shared

# Using yarn
yarn add @flatie/shared
```

### Peer Dependencies

This package requires `zod` as a peer dependency:

```bash
pnpm add zod
```

## Usage

### Importing Everything

```typescript
import { Permission, Building, paginationParamsSchema } from '@flatie/shared';
```

### Importing by Category

```typescript
// Enums only
import { Permission, BuildingRole, PollType } from '@flatie/shared/enums';

// Types only
import { Building, User, Notice } from '@flatie/shared/types';

// Schemas only
import { paginationParamsSchema, baseEntitySchema } from '@flatie/shared/schemas';

// API Routes
import { API_ROUTES } from '@flatie/shared/urls';

// Utilities
import { formatCurrency, formatText } from '@flatie/shared/utils';
```

## API Reference

### Enums

#### Permission

71 granular permissions for access control:

```typescript
import { Permission } from '@flatie/shared/enums';

// Notice permissions
Permission.NOTICE_CREATE    // 'notice:create'
Permission.NOTICE_READ      // 'notice:read'
Permission.NOTICE_UPDATE    // 'notice:update'
Permission.NOTICE_DELETE    // 'notice:delete'
Permission.NOTICE_APPROVE   // 'notice:approve'

// Poll permissions
Permission.POLL_CREATE
Permission.POLL_VOTE
Permission.POLL_FINALIZE
// ... and more
```

#### BuildingRole

```typescript
import { BuildingRole } from '@flatie/shared/enums';

BuildingRole.BUILDING_MANAGER
BuildingRole.OWNER_REPRESENTATIVE
BuildingRole.DEPUTY_REPRESENTATIVE
BuildingRole.CO_OWNER
```

#### Status Enums

```typescript
import {
  CommonStatus,        // active, completed, cancelled
  ApprovalStatus,      // pending, approved, rejected
  MaintenanceStatus,   // pending, in_progress, completed, cancelled
  FailureStatus,       // pending, in_progress, resolved, cancelled
  Priority,            // low, medium, high, urgent
  TransactionType,     // income, expense
  Frequency,           // daily, weekly, monthly, quarterly, yearly
} from '@flatie/shared/enums';
```

### Types

#### Entity Types

```typescript
import type {
  // Base types
  BaseEntity,
  BuildingEntity,
  UserCreatedEntity,
  PermissionFields,

  // Domain types
  User,
  Building,
  BuildingWithRole,
  Notice,
  Poll,
  Event,
  FailureReport,
  MaintenanceLog,

  // Request types
  CreateNoticeRequest,
  CreatePollRequest,
  VoteRequest,

  // Pagination
  PaginationParams,
  PaginatedResponse,
} from '@flatie/shared/types';
```

### Schemas (Zod)

#### Base Schemas

```typescript
import {
  uuidSchema,
  dateTimeSchema,
  baseEntitySchema,
  buildingEntitySchema,
  permissionFieldsSchema,
} from '@flatie/shared/schemas';

// Validate a UUID
uuidSchema.parse('550e8400-e29b-41d4-a716-446655440000');

// Validate pagination params
paginationParamsSchema.parse({ offset: 0, limit: 10 });
```

#### Status Schemas

```typescript
import {
  CommonStatusSchema,
  ApprovalStatusSchema,
  PrioritySchema,
} from '@flatie/shared/schemas';

CommonStatusSchema.parse('active'); // OK
CommonStatusSchema.parse('invalid'); // Throws ZodError
```

### URLs (API Routes)

```typescript
import { API_ROUTES } from '@flatie/shared/urls';

// Static routes
API_ROUTES.AUTH.LOGIN           // '/auth/login'
API_ROUTES.USERS.ME             // '/users/me'
API_ROUTES.BUILDINGS.BASE       // '/buildings'

// Dynamic routes
API_ROUTES.BUILDINGS.BY_ID('123')           // '/buildings/123'
API_ROUTES.NOTICES('building-id')           // '/buildings/building-id/notices'
API_ROUTES.POLL('building-id', 'poll-id')   // '/buildings/building-id/polls/poll-id'
```

### Utilities

```typescript
import { formatText, formatCurrency, getDateRange, debounce } from '@flatie/shared/utils';

// Format snake_case to Title Case
formatText('CAN_EDIT_BUILDING');  // 'Can Edit Building'

// Format currency
formatCurrency(1234.56);           // '€1,234.56'
formatCurrency(1234.56, 'en-US', 'USD');  // '$1,234.56'

// Get date ranges for filters
getDateRange('today');    // { fromDate: '2025-01-04', toDate: '2025-01-04' }
getDateRange('week');     // { fromDate: '2024-12-28', toDate: '2025-01-04' }

// Debounce function
const debouncedSearch = debounce((query: string) => {
  console.log('Searching:', query);
}, 300);
```

## Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Setup

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in watch mode
pnpm dev

# Run tests
pnpm test

# Lint and format
pnpm lint
pnpm lint:fix
pnpm format
```

### Project Structure

```
src/
├── index.ts           # Main entry point
├── enums/             # TypeScript enums
│   ├── permission.enum.ts
│   ├── building-role.enum.ts
│   ├── status.enum.ts
│   └── ...
├── types/             # TypeScript interfaces
│   ├── user.types.ts
│   ├── building.types.ts
│   ├── notice.types.ts
│   └── ...
├── schemas/           # Zod validation schemas
│   ├── base.schema.ts
│   ├── pagination.schema.ts
│   └── ...
├── urls/              # API route constants
│   └── index.ts
└── utils/             # Utility functions
    └── index.ts
```

### Building

The package is built using [tsup](https://tsup.egoist.dev/) and outputs:

- ESM (`.js`) - Modern ES modules
- CJS (`.cjs`) - CommonJS for Node.js
- Type declarations (`.d.ts`)

```bash
pnpm build
```

### Testing

Tests are written using [Vitest](https://vitest.dev/):

```bash
# Run tests once
pnpm test

# Watch mode
pnpm test:watch
```

### Linting

Code quality is enforced with [Biome](https://biomejs.dev/):

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm lint:fix

# Format code
pnpm format
```

## Contributing

1. Make changes in the `src/` directory
2. Run `pnpm lint:fix` to fix linting issues
3. Run `pnpm test` to ensure tests pass
4. Run `pnpm build` to verify the build
5. Commit your changes

## License

MIT
