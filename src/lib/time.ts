import { DayIndex } from "@/types";
import { Time24hr } from "@/types/time";

export function time24hToDate(time: Time24hr): Date {
  const hour = parseInt(time.hour);
  const minute = parseInt(time.minute);
  return new Date(0, 0, 0, hour, minute, 0);
}

export function isWeekend(date: Date, weekendDays: DayIndex[]): boolean {
  return weekendDays.includes(date.getDay() as DayIndex);
}

export function time24hrToStr(time: Time24hr): string {
  return `${time.hour}:${time.minute}`;
}
// export function strToTime24hr(time: string):Time24hr {
//   const [hour, minute] = time.split(":");
//   return {""}
// }
