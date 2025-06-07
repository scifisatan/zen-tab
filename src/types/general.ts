import { Time24h } from "./time";

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
4 | 5 | 6;

export interface timeConfig {
  clockInTime: Time24h;
  clockOutTime: Time24h;
}

export interface GeneralConfig {
  weekendDays: DayIndex[];
  timeConfig: timeConfig;
  relaxingMessages: string[];
  clockedOutMessages: string[];
}
