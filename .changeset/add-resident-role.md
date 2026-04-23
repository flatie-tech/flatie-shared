---
'@flatie/shared': minor
---

Add `BuildingRole.RESIDENT` — default building-level membership for anyone who lives in the building but hasn't been confirmed as a co-owner (tenants, family members of co-owners, pre-registration buyers, roommates).

- New enum value on `BuildingRole`.
- `BUILDING_ROLE_RANK` renumbered: RESIDENT (0) < CO_OWNER (1) < DEPUTY_REPRESENTATIVE / OWNER_REPRESENTATIVE (2). `canAssignRole` semantics unchanged (strict greater-than).
- `BUILDING_ROLE_PERMISSIONS[RESIDENT]` grants community-content reads and own-failure-report management. Explicitly excludes `financial:read` (residents don't pay pričuva under Croatian ZUOZ) and voting permissions (voting is a co-ownership right).

Consumers must handle RESIDENT in any BuildingRole switch/filter UI. Nothing removed.
