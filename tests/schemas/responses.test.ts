import { describe, expect, it } from 'vitest';
import {
  buildingDetailResponseSchema,
  buildingResponseSchema,
  eventResponseSchema,
  paginatedBuildingsResponseSchema,
  paginatedEventsResponseSchema,
  paginatedPollsResponseSchema,
  pollResponseSchema,
  pollResultsSchema,
  pollVotersResponseSchema,
} from '../../src/schemas/responses';

const BUILDING_ID = '550e8400-e29b-41d4-a716-446655440000';
const USER_ID = '7c0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a9d';
const POLL_ID = '3e0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a99';
const EVENT_ID = 'ab0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a11';
const FILE_ID = 'cc0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a22';
const TIMESTAMP = '2026-04-20T12:00:00.000Z';

const emptyPaginated = {
  data: [],
  count: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

describe('Building response schemas', () => {
  it('parses a full building summary payload', () => {
    const payload = {
      id: BUILDING_ID,
      name: 'Sunset Apartments',
      address: '123 Sunset Boulevard, Zagreb',
      coverImage: 'https://example.com/cover.jpg',
      type: 'RESIDENTIAL',
      totalUnits: 24,
      isStratified: false,
      createdBy: USER_ID,
      createdAt: TIMESTAMP,
      updatedAt: TIMESTAMP,
    };
    expect(() => buildingResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses a minimal building summary with only required fields', () => {
    const payload = {
      id: BUILDING_ID,
      name: 'Minimal',
      address: 'Some Street',
      type: 'COMMERCIAL',
      totalUnits: 1,
      isStratified: true,
      createdAt: TIMESTAMP,
    };
    expect(() => buildingResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses a full building detail with nested representatives', () => {
    const payload = {
      id: BUILDING_ID,
      name: 'Sunset Apartments',
      address: '123 Sunset Boulevard',
      coverImage: null,
      type: 'RESIDENTIAL_COMMERCIAL',
      totalUnits: 42,
      isStratified: false,
      houseRulesFileUrl: null,
      numberOfFloors: 10,
      description: 'A building',
      latitude: 45.8,
      longitude: 15.97,
      createdBy: USER_ID,
      createdAt: TIMESTAMP,
      updatedAt: null,
      manager: { name: 'Alice', email: 'alice@example.com' },
      funds: { currentBalance: '27820.54', currency: '€' },
      ownerRepresentatives: [{ id: USER_ID, name: 'Bob', email: 'bob@example.com', phone: null }],
      deputyRepresentatives: [],
    };
    expect(() => buildingDetailResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses an empty paginated buildings wrapper', () => {
    expect(() => paginatedBuildingsResponseSchema.parse(emptyPaginated)).not.toThrow();
  });
});

describe('Event response schemas', () => {
  it('parses a full event payload', () => {
    const payload = {
      id: EVENT_ID,
      title: 'Maintenance Meeting',
      type: 'meeting',
      description: 'Monthly meeting',
      startDate: TIMESTAMP,
      endDate: TIMESTAMP,
      color: 'blue',
      buildingId: BUILDING_ID,
      recurrenceType: 'none',
      subtype: null,
      recurrenceEndDate: null,
      isRecurrenceInstance: false,
      user: { id: USER_ID, name: 'Alice' },
      isAnonymous: false,
      approved: true,
      canEdit: true,
      canDelete: true,
      canApprove: false,
      onlineMeetingUrl: null,
      meetingMinutes: null,
      minuteTakerId: null,
      usedAsScheduleBy: [{ id: '1', type: 'failure_report', title: 'Broken lift' }],
    };
    expect(() => eventResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses a minimal event payload', () => {
    const payload = {
      id: EVENT_ID,
      title: 'Quick event',
      type: 'other',
      startDate: TIMESTAMP,
      endDate: TIMESTAMP,
      color: 'gray',
      buildingId: BUILDING_ID,
      recurrenceType: 'none',
      isAnonymous: false,
      approved: true,
      canEdit: false,
      canDelete: false,
      canApprove: false,
    };
    expect(() => eventResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses an empty paginated events wrapper', () => {
    expect(() => paginatedEventsResponseSchema.parse(emptyPaginated)).not.toThrow();
  });
});

describe('Poll response schemas', () => {
  it('parses a minimal per-user poll payload', () => {
    const payload = {
      id: POLL_ID,
      buildingId: BUILDING_ID,
      question: 'Replace the lobby lights?',
      options: ['Yes', 'No'],
      createdBy: USER_ID,
      createdAt: TIMESTAMP,
      updatedAt: TIMESTAMP,
      pollType: 'COMMUNITY',
      status: 'active',
      totalVotes: 5,
      totalWeight: 5,
      isResultsFinalized: false,
    };
    expect(() => pollResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses a full poll results payload with option breakdown', () => {
    const payload = {
      id: POLL_ID,
      buildingId: BUILDING_ID,
      question: 'Approve new maintenance contract?',
      options: ['Yes'],
      createdBy: USER_ID,
      createdAt: TIMESTAMP,
      pollType: 'CONSENSUS',
      status: 'completed',
      requiredConsensusPercentage: 75,
      totalVotes: 10,
      totalWeight: 100,
      totalEligibleVoters: 20,
      winningOptionIndex: 0,
      isResultsFinalized: true,
      finalizedAt: TIMESTAMP,
      finalizedBy: USER_ID,
      optionResults: [
        {
          optionIndex: 0,
          optionText: 'Yes',
          voteCount: 10,
          totalWeight: 100,
          percentage: 100,
          weightPercentage: 100,
        },
      ],
      consensusReached: true,
      currentConsensusPercentage: 100,
      approved: true,
      canApprove: false,
      canEdit: false,
      canDelete: false,
      canVote: false,
      hasUserVoted: true,
      userVotedOptionIndex: 0,
      files: [
        {
          id: FILE_ID,
          title: 'Attachment',
          documentUrl: 'https://example.com/file.pdf',
          fileType: 'document',
          uploadedBy: USER_ID,
          createdAt: TIMESTAMP,
        },
      ],
    };
    expect(() => pollResultsSchema.parse(payload)).not.toThrow();
  });

  it('parses a poll voters response', () => {
    const payload = {
      pollId: POLL_ID,
      question: 'Approve new maintenance contract?',
      options: ['Yes', 'No'],
      totalVotes: 1,
      voters: [
        {
          userId: USER_ID,
          name: 'Alice',
          email: 'alice@example.com',
          selectedOptionIndex: 0,
          selectedOptionText: 'Yes',
          voteWeight: 1,
          votedAt: TIMESTAMP,
        },
      ],
    };
    expect(() => pollVotersResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses an empty paginated polls wrapper', () => {
    expect(() => paginatedPollsResponseSchema.parse(emptyPaginated)).not.toThrow();
  });
});
