export const BuildingOtpExpiry = {
  ONE_HOUR: '1_hour',
  ONE_DAY: '1_day',
  SEVEN_DAYS: '7_days',
  NEVER: 'never',
} as const;

export type BuildingOtpExpiry = (typeof BuildingOtpExpiry)[keyof typeof BuildingOtpExpiry];
