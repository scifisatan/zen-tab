import { DayIndex } from "@/types";
import { Time24h } from "@/types/time";

export function dateToTime24h(date: Date): Time24h {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}` as Time24h;
}

export function time24hToDate(timeStr: Time24h): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return new Date(0, 0, 0, hours, minutes, 0);
}

export function isWeekend(date: Date, weekendDays: DayIndex[]): boolean {
  return weekendDays.includes(date.getDay() as DayIndex);
}
