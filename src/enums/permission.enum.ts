export enum Permission {
  // Notice permissions
  NOTICE_CREATE = 'notice:create',
  NOTICE_READ = 'notice:read',
  NOTICE_UPDATE = 'notice:update',
  NOTICE_DELETE = 'notice:delete',
  NOTICE_APPROVE = 'notice:approve',

  // Poll permissions
  POLL_CREATE = 'poll:create',
  POLL_READ = 'poll:read',
  POLL_UPDATE = 'poll:update',
  POLL_DELETE = 'poll:delete',
  POLL_VOTE = 'poll:vote',
  POLL_FINALIZE = 'poll:finalize',

  // Building permissions
  BUILDING_CREATE = 'building:create',
  BUILDING_READ = 'building:read',
  BUILDING_UPDATE = 'building:update',
  BUILDING_DELETE = 'building:delete',
  BUILDING_MANAGE_USERS = 'building:manage_users',
  BUILDING_ASSIGN_ROLES = 'building:assign_roles',
  BUILDING_REMOVE_USERS = 'building:remove_users',
  BUILDING_GENERATE_OTP = 'building:generate_otp',

  // User permissions
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_MANAGE = 'user:manage',

  // Event permissions
  EVENT_CREATE = 'event:create',
  EVENT_READ = 'event:read',
  EVENT_UPDATE = 'event:update',
  EVENT_DELETE = 'event:delete',

  // Failure Report permissions
  FAILURE_REPORT_CREATE = 'failure_report:create',
  FAILURE_REPORT_READ = 'failure_report:read',
  FAILURE_REPORT_UPDATE = 'failure_report:update',
  FAILURE_REPORT_DELETE = 'failure_report:delete',
  FAILURE_REPORT_APPROVE = 'failure_report:approve',

  // Maintenance Log permissions
  MAINTENANCE_LOG_CREATE = 'maintenance_log:create',
  MAINTENANCE_LOG_READ = 'maintenance_log:read',
  MAINTENANCE_LOG_UPDATE = 'maintenance_log:update',
  MAINTENANCE_LOG_DELETE = 'maintenance_log:delete',

  // Financial permissions
  FINANCIAL_CREATE = 'financial:create',
  FINANCIAL_READ = 'financial:read',
  FINANCIAL_UPDATE = 'financial:update',
  FINANCIAL_DELETE = 'financial:delete',

  // Building Role permissions
  BUILDING_ROLE_ASSIGN = 'building_role:assign',
  BUILDING_ROLE_UPDATE = 'building_role:update',
  BUILDING_ROLE_REMOVE = 'building_role:remove',

  // Voting permissions
  CAN_VOTE = 'vote:cast',
  VOTE_WEIGHT_BASED = 'vote:weight_based',

  // System permissions
  SYSTEM_ADMIN = 'system:admin',
  SYSTEM_MANAGE = 'system:manage',
}
