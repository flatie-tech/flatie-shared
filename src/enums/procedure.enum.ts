export const ProcedureStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;
export type ProcedureStatus = (typeof ProcedureStatus)[keyof typeof ProcedureStatus];

export const PhaseStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;
export type PhaseStatus = (typeof PhaseStatus)[keyof typeof PhaseStatus];

export const ProcedureEntryType = {
  NOTE: 'note',
  PROCUREMENT: 'procurement',
  VOTE: 'vote',
  DOCUMENT: 'document',
  MILESTONE: 'milestone',
} as const;
export type ProcedureEntryType = (typeof ProcedureEntryType)[keyof typeof ProcedureEntryType];
