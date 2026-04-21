import { describe, expect, it } from 'vitest';
import { NotificationType } from '../../src/enums/notification.enum';
import {
  ARCHIVE_TYPES,
  archivedItemSchema,
  buildingDetailResponseSchema,
  buildingResponseSchema,
  eventResponseSchema,
  failureReportResponseSchema,
  getNotificationDataSchema,
  listArchivedResponseSchema,
  maintenanceLogResponseSchema,
  noticeResponseSchema,
  notificationResponseSchema,
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

describe('Nested event schema (widened in v0.18.2)', () => {
  const nestedEvent = {
    id: EVENT_ID,
    title: 'Inspection',
    type: 'maintenance',
    description: 'Quarterly walkthrough',
    startDate: TIMESTAMP,
    endDate: TIMESTAMP,
    color: 'green',
    userId: USER_ID,
    buildingId: BUILDING_ID,
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
  };

  it('notices accept an events array with the full 11-field shape', () => {
    const payload = {
      id: BUILDING_ID,
      buildingId: BUILDING_ID,
      title: 'Elevator service',
      content: 'Lift will be offline on Tuesday.',
      createdBy: USER_ID,
      approved: true,
      createdAt: TIMESTAMP,
      canApprove: false,
      canEdit: false,
      canDelete: false,
      events: [nestedEvent],
    };
    expect(() => noticeResponseSchema.parse(payload)).not.toThrow();
  });

  it('maintenance logs accept an events array with the full 11-field shape', () => {
    const payload = {
      id: BUILDING_ID,
      buildingId: BUILDING_ID,
      title: 'Roof repair',
      createdBy: USER_ID,
      contractor: 'ACME Roofing',
      cost: 5000,
      events: [nestedEvent],
      createdAt: TIMESTAMP,
      canEdit: false,
      canDelete: false,
    };
    expect(() => maintenanceLogResponseSchema.parse(payload)).not.toThrow();
  });

  it('nested event tolerates null optionals (description, userId, updatedAt)', () => {
    const payload = {
      id: BUILDING_ID,
      buildingId: BUILDING_ID,
      title: 'Notice',
      content: '...',
      createdBy: USER_ID,
      approved: true,
      createdAt: TIMESTAMP,
      canApprove: false,
      canEdit: false,
      canDelete: false,
      events: [
        {
          id: EVENT_ID,
          title: 'System event',
          startDate: TIMESTAMP,
          endDate: TIMESTAMP,
          description: null,
          userId: null,
          updatedAt: null,
        },
      ],
    };
    expect(() => noticeResponseSchema.parse(payload)).not.toThrow();
  });
});

describe('Failure report response (polls field added in v0.18.2)', () => {
  it('parses a failure report with a populated polls array', () => {
    const payload = {
      id: BUILDING_ID,
      buildingId: BUILDING_ID,
      title: 'Broken intercom',
      submittedBy: USER_ID,
      status: 'pending',
      approved: false,
      createdAt: TIMESTAMP,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      canStatus: false,
      polls: [
        {
          id: POLL_ID,
          question: 'Should we replace the intercom?',
          pollType: 'standard',
          deadline: TIMESTAMP,
        },
      ],
    };
    expect(() => failureReportResponseSchema.parse(payload)).not.toThrow();
  });

  it('defaults polls to empty array when absent', () => {
    const payload = {
      id: BUILDING_ID,
      buildingId: BUILDING_ID,
      title: 'Broken intercom',
      submittedBy: USER_ID,
      status: 'pending',
      approved: false,
      createdAt: TIMESTAMP,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      canStatus: false,
    };
    const parsed = failureReportResponseSchema.parse(payload);
    expect(parsed.polls).toEqual([]);
  });
});

describe('Notification response schema', () => {
  const NOTIFICATION_ID = 'dd0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a33';
  const CONVERSATION_ID = 'ee0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a44';

  const baseNotification = {
    id: NOTIFICATION_ID,
    buildingId: BUILDING_ID,
    buildingName: 'Sunset Apartments',
    read: false,
    readAt: null,
    createdAt: TIMESTAMP,
  };

  it('parses a NOTICE_CREATED notification with typed data', () => {
    const payload = {
      ...baseNotification,
      type: NotificationType.NOTICE_CREATED,
      title: 'New notice',
      body: 'A notice was posted',
      data: {
        entityType: 'notice',
        entityId: NOTIFICATION_ID,
        actorId: USER_ID,
        actorName: 'Iva',
        title: 'Water outage',
        content: 'Tomorrow 08:00-14:00',
        createdAt: TIMESTAMP,
        isPinned: false,
        actionUrl: `/admin/buildings/${BUILDING_ID}?noticeId=${NOTIFICATION_ID}`,
      },
    };
    expect(() => notificationResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses a CHAT_MESSAGE notification with conversation payload', () => {
    const payload = {
      ...baseNotification,
      type: NotificationType.CHAT_MESSAGE,
      title: 'New message',
      body: 'Iva: hello',
      data: {
        actorId: USER_ID,
        actorName: 'Iva',
        senderName: 'Iva',
        messagePreview: 'hello',
        conversationId: CONVERSATION_ID,
        actionUrl: `/admin/buildings/${BUILDING_ID}/chat?c=${CONVERSATION_ID}`,
      },
    };
    expect(() => notificationResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses a WASTE_REMINDER_MIXED payload from the scheduler', () => {
    const payload = {
      ...baseNotification,
      type: NotificationType.WASTE_REMINDER_MIXED,
      title: 'Mixed waste tomorrow',
      body: 'Bring out the mixed waste bin',
      data: {
        entityType: 'event',
        entityId: EVENT_ID,
        actorId: USER_ID,
        actorName: 'Iva',
        title: 'Mixed waste collection',
        wasteTypeLabel: '{{wasteSubtype_mixed}}',
        subtype: 'mixed',
        startDate: TIMESTAMP,
        actionUrl: `/admin/buildings/${BUILDING_ID}/events`,
      },
    };
    expect(() => notificationResponseSchema.parse(payload)).not.toThrow();
  });

  it('parses a MAINTENANCE_LOG_CREATED with decimal cost as string', () => {
    const payload = {
      ...baseNotification,
      type: NotificationType.MAINTENANCE_LOG_CREATED,
      title: 'New maintenance log',
      body: 'Log added',
      data: {
        entityType: 'maintenance_log',
        entityId: NOTIFICATION_ID,
        actorName: 'Iva',
        title: 'Elevator service',
        description: 'Annual inspection',
        category: 'Elevator',
        contractor: 'KONE',
        cost: '1250.00',
        actionUrl: `/admin/buildings/${BUILDING_ID}`,
      },
    };
    expect(() => notificationResponseSchema.parse(payload)).not.toThrow();
  });

  it('accepts a null data field for unimplemented notification types', () => {
    const payload = {
      ...baseNotification,
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title: 'System',
      body: 'Hello',
      data: null,
    };
    expect(() => notificationResponseSchema.parse(payload)).not.toThrow();
  });

  it('rejects an unknown notification type', () => {
    const payload = {
      ...baseNotification,
      type: 'not_a_real_type',
      title: 'Bogus',
      body: 'Bogus',
    };
    expect(() => notificationResponseSchema.parse(payload)).toThrow();
  });

  it('getNotificationDataSchema narrows to the per-type payload schema', () => {
    const chatSchema = getNotificationDataSchema(NotificationType.CHAT_MESSAGE);
    const valid = chatSchema.parse({
      actorName: 'Iva',
      senderName: 'Iva',
      messagePreview: 'hello',
      conversationId: CONVERSATION_ID,
    });
    expect(valid.conversationId).toBe(CONVERSATION_ID);

    expect(() =>
      chatSchema.parse({
        actorName: 'Iva',
        senderName: 'Iva',
        messagePreview: 'hello',
        conversationId: 'not-a-uuid',
      }),
    ).toThrow();
  });
});

describe('Archive response schemas', () => {
  const APARTMENT_ID = 'dd0a1e6e-8c9d-4a5b-8e7f-4d3c2e1b0a33';

  it('parses a valid archived-item payload', () => {
    const payload = {
      id: APARTMENT_ID,
      type: 'apartments',
      label: 'Apartment 4B',
      buildingId: BUILDING_ID,
      archivedAt: TIMESTAMP,
      archivedBy: USER_ID,
      archivedByName: 'Iva Ivić',
      daysUntilPurge: 12,
    };
    expect(archivedItemSchema.parse(payload).type).toBe('apartments');
  });

  it('allows null buildingId for global entities like organizations', () => {
    const payload = {
      id: APARTMENT_ID,
      type: 'organizations',
      label: 'Management Firm',
      buildingId: null,
      archivedAt: TIMESTAMP,
      archivedBy: null,
      archivedByName: null,
      daysUntilPurge: 0,
    };
    expect(() => archivedItemSchema.parse(payload)).not.toThrow();
  });

  it('rejects an unknown archive type', () => {
    const payload = {
      id: APARTMENT_ID,
      type: 'not_a_real_type',
      label: 'Bogus',
      buildingId: null,
      archivedAt: TIMESTAMP,
      archivedBy: null,
      archivedByName: null,
      daysUntilPurge: 0,
    };
    expect(() => archivedItemSchema.parse(payload)).toThrow();
  });

  it('covers all 18 types in ARCHIVE_TYPES', () => {
    expect(ARCHIVE_TYPES).toHaveLength(18);
    expect(new Set(ARCHIVE_TYPES).size).toBe(18);
  });

  it('parses the aggregator list response', () => {
    const payload = { items: [] };
    expect(listArchivedResponseSchema.parse(payload).items).toEqual([]);
  });
});
