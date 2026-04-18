export const MaintenanceLogFinancedBy = {
  BUILDING_FUNDS: 'building_funds',
  INSURANCE: 'insurance',
  CO_OWNER: 'co_owner',
} as const;

export type MaintenanceLogFinancedBy =
  (typeof MaintenanceLogFinancedBy)[keyof typeof MaintenanceLogFinancedBy];
