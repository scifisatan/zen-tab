import { Time24hr } from "./time";

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface timeConfig {
  clockInTime: Time24hr;
  clockOutTime: Time24hr;
}

export interface GeneralConfig {
  weekendDays: DayIndex[];
  timeConfig: timeConfig;
  relaxingMessages: string[];
  clockedOutMessages: string[];
}
