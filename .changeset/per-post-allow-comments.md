---
'@flatie/shared': minor
---

Add per-post `allowComments` flag to notice, event, and failure-report schemas.

Each entity's `create*Schema`, `update*Schema`, and `*ResponseSchema` now exposes an `allowComments: boolean` field. Defaults to `true` server-side (existing posts stay commentable). When set to `false`, the post's author opted out of comments — the backend should reject `POST /comments` for that post and return an empty list from `GET /comments`, and clients should hide the comment thread entirely.

Motivation: post authors (representatives and co-owners alike) need to disable comments on individual posts. The existing building-wide `commentsEnabled` setting only gates the feature globally per building.
