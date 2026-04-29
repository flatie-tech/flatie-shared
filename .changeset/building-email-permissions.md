---
'@flatie/shared': minor
---

feat(building-email): add `BUILDING_EMAIL_VIEW` and `BUILDING_EMAIL_MANAGE`
permissions for the per-building inbox feature, wire `view` to co-owners and
`manage` to representatives/deputies, and expose `buildingEmailKeys` through
the master `queryKeys` aggregator.
