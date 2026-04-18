import { FailureStatus, Priority } from '../enums';

/**
 * Semantic variant names for a design system's status indicators.
 *
 * Apps map these to concrete colors/badges:
 * - `success`: green — resolved, completed, active-and-happy
 * - `warning`: yellow/amber — attention needed, in-progress
 * - `danger`: red — urgent, rejected, failed
 * - `info`: blue — informational, pending
 * - `neutral`: gray — inert, cancelled, default
 */
export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Map a failure report status to a semantic variant.
 */
export function failureStatusVariant(status: FailureStatus): StatusVariant {
  switch (status) {
    case FailureStatus.PENDING:
      return 'info';
    case FailureStatus.IN_PROGRESS:
      return 'warning';
    case FailureStatus.RESOLVED:
      return 'success';
    default:
      return 'neutral';
  }
}

/**
 * Map a priority value to a semantic variant.
 */
export function priorityVariant(priority: Priority): StatusVariant {
  switch (priority) {
    case Priority.URGENT:
      return 'danger';
    case Priority.NORMAL:
      return 'neutral';
    default:
      return 'neutral';
  }
}
