'use strict';

// src/constants/query-keys.ts
var userKeys = {
  all: ["user"],
  lists: () => [...userKeys.all, "list"],
  list: (name, filters = {}) => [...userKeys.lists(), name, { ...filters }],
  details: () => [...userKeys.all, "detail"],
  detail: (id) => [...userKeys.details(), id],
  info: () => userKeys.detail("info")
};
var buildingKeys = {
  all: ["building"],
  lists: () => [...buildingKeys.all, "list"],
  list: (filters = {}) => [...buildingKeys.lists(), { ...filters }],
  details: () => [...buildingKeys.all, "detail"],
  detail: (id) => [...buildingKeys.details(), id],
  otp: (id) => [...buildingKeys.all, "otp", id],
  users: (id, filters = {}) => [...buildingKeys.all, "users", id, { ...filters }]
};
var noticeKeys = {
  all: ["notice"],
  lists: () => [...noticeKeys.all, "list"],
  list: (filters = {}) => [...noticeKeys.lists(), { ...filters }],
  details: () => [...noticeKeys.all, "detail"],
  detail: (id) => [...noticeKeys.details(), id]
};
var pollKeys = {
  all: ["poll"],
  lists: () => [...pollKeys.all, "list"],
  list: (filters = {}) => [...pollKeys.lists(), { ...filters }],
  details: () => [...pollKeys.all, "detail"],
  detail: (id) => [...pollKeys.details(), id],
  results: (id) => [...pollKeys.detail(id), "results"],
  voters: (id) => [...pollKeys.detail(id), "voters"]
};
var eventKeys = {
  all: ["event"],
  lists: () => [...eventKeys.all, "list"],
  list: (filters = {}) => [...eventKeys.lists(), { ...filters }],
  details: () => [...eventKeys.all, "detail"],
  detail: (id) => [...eventKeys.details(), id]
};
var failureReportKeys = {
  all: ["failureReport"],
  lists: () => [...failureReportKeys.all, "list"],
  list: (filters = {}) => [...failureReportKeys.lists(), { ...filters }],
  details: () => [...failureReportKeys.all, "detail"],
  detail: (id) => [...failureReportKeys.details(), id]
};
var maintenanceLogKeys = {
  all: ["maintenanceLog"],
  lists: () => [...maintenanceLogKeys.all, "list"],
  list: (filters = {}) => [...maintenanceLogKeys.lists(), { ...filters }],
  details: () => [...maintenanceLogKeys.all, "detail"],
  detail: (id) => [...maintenanceLogKeys.details(), id]
};
var documentKeys = {
  all: ["document"],
  lists: () => [...documentKeys.all, "list"],
  list: (filters = {}) => [...documentKeys.lists(), { ...filters }],
  details: () => [...documentKeys.all, "detail"],
  detail: (id) => [...documentKeys.details(), id]
};
var fundsKeys = {
  all: ["funds"],
  balance: (buildingId) => [...fundsKeys.all, "balance", buildingId],
  summary: (buildingId) => [...fundsKeys.all, "summary", buildingId],
  graph: (buildingId) => [...fundsKeys.all, "graph", buildingId],
  income: (buildingId) => [...fundsKeys.all, "income", buildingId],
  transactions: (buildingId, filters = {}) => [...fundsKeys.all, "transactions", buildingId, { ...filters }]
};
var permissionKeys = {
  all: ["permission"],
  lists: () => [...permissionKeys.all, "list"],
  list: (filters = {}) => [...permissionKeys.lists(), { ...filters }],
  details: () => [...permissionKeys.all, "detail"],
  detail: (id) => [...permissionKeys.details(), id]
};
var recentKeys = {
  all: ["recent"],
  items: (buildingId, filters = {}) => [...recentKeys.all, buildingId, { ...filters }]
};
var adminKeys = {
  all: ["admin"],
  dashboard: () => [...adminKeys.all, "dashboard"],
  dashboardSummary: () => [...adminKeys.dashboard(), "summary"],
  users: (filters = {}) => [...adminKeys.all, "users", { ...filters }],
  buildings: (filters = {}) => [...adminKeys.all, "buildings", { ...filters }]
};
var queryKeys = {
  user: userKeys,
  building: buildingKeys,
  notice: noticeKeys,
  poll: pollKeys,
  event: eventKeys,
  failureReport: failureReportKeys,
  maintenanceLog: maintenanceLogKeys,
  document: documentKeys,
  funds: fundsKeys,
  permission: permissionKeys,
  recent: recentKeys,
  admin: adminKeys
};

exports.adminKeys = adminKeys;
exports.buildingKeys = buildingKeys;
exports.documentKeys = documentKeys;
exports.eventKeys = eventKeys;
exports.failureReportKeys = failureReportKeys;
exports.fundsKeys = fundsKeys;
exports.maintenanceLogKeys = maintenanceLogKeys;
exports.noticeKeys = noticeKeys;
exports.permissionKeys = permissionKeys;
exports.pollKeys = pollKeys;
exports.queryKeys = queryKeys;
exports.recentKeys = recentKeys;
exports.userKeys = userKeys;
//# sourceMappingURL=chunk-GCY5CQ43.cjs.map
//# sourceMappingURL=chunk-GCY5CQ43.cjs.map