import { DayIndex } from "@/types";
import { Time24hr } from "@/types/time";

export function time24hrToDate(time: Time24hr): Date {
  const hour = parseInt(time.hour);
  const minute = parseInt(time.minute);
  return new Date(0, 0, 0, hour, minute, 0);
}

export function isWeekend(date: Date, weekendDays: DayIndex[]): boolean {
  return weekendDays.includes(date.getDay() as DayIndex);
}
