import { describe, expect, it } from 'vitest';
import type {
  EventColor,
  EventType,
  MaintenanceFinancedBy,
  RecurrenceType,
  VoteRequest,
} from '../../src/types';

/**
 * Type-level proof that the v0.59.0 types/ ↔ schemas/ convergence did not
 * silently change any exported shape: each converged name (now derived via
 * `z.infer` from its schema) must still be mutually assignable with the
 * union/object it was hand-written as before the rewrite.
 *
 * If a schema edit ever narrows or widens one of these, `tsc --noEmit`
 * (pnpm type-check, and vitest's transform) fails on this file.
 */
type MutuallyAssignable<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

// Pre-convergence hand-written shapes, copied verbatim:
type HandWrittenEventType =
  | 'service'
  | 'inspection'
  | 'maintenance'
  | 'meeting'
  | 'discussion'
  | 'planned_works'
  | 'waste_collection'
  | 'other';
type HandWrittenEventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray';
type HandWrittenRecurrenceType = 'none' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
type HandWrittenMaintenanceFinancedBy = 'building_funds' | 'insurance' | 'co_owner';
interface HandWrittenVoteRequest {
  selectedOptionIndex: number;
}

const eventTypeUnchanged: MutuallyAssignable<EventType, HandWrittenEventType> = true;
const eventColorUnchanged: MutuallyAssignable<EventColor, HandWrittenEventColor> = true;
const recurrenceTypeUnchanged: MutuallyAssignable<RecurrenceType, HandWrittenRecurrenceType> = true;
const maintenanceFinancedByUnchanged: MutuallyAssignable<
  MaintenanceFinancedBy,
  HandWrittenMaintenanceFinancedBy
> = true;
const voteRequestUnchanged: MutuallyAssignable<VoteRequest, HandWrittenVoteRequest> = true;

describe('types/ ↔ schemas/ convergence (v0.59.0)', () => {
  it('z.infer-derived re-exports keep the exact pre-convergence shapes', () => {
    expect(eventTypeUnchanged).toBe(true);
    expect(eventColorUnchanged).toBe(true);
    expect(recurrenceTypeUnchanged).toBe(true);
    expect(maintenanceFinancedByUnchanged).toBe(true);
    expect(voteRequestUnchanged).toBe(true);
  });
});
