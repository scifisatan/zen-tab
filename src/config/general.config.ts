import { timeConfig, GeneralConfig, DayIndex } from "@/types/general";

const defaultTimeConfig: timeConfig = {
  clockInTime: {
    hour: "09",
    minute: "00",
  },
  clockOutTime: {
    hour: "16",
    minute: "30",
  },
};

const weekendDays: DayIndex[] = [0, 6];

const relaxingMessages = [
  "Take it easy, it's still early ☀️",
  "No rush, enjoy your morning peace 🌅",
  "It's non-office hours, time to relax ☕",
  "Early bird! But remember to breathe 🧘‍♂️",
  "The day hasn't started yet, unwind 🌸",
];

// Messages for after clocking out
const clockedOutMessages = [
  "Work's done! Time to unwind 🌅",
  "You've clocked out, enjoy your evening! 🌙",
  "Office hours are over, relax and recharge ✨",
  "Time to step away from work and breathe 🍃",
  "Work day complete! Time for yourself now 🧘‍♂️",
  "Clocked out! Your evening awaits 🌆",
];

const weekendMessages = [
  "Work's done! Time to unwind 🌅",
  "You've clocked out, enjoy your evening! 🌙",
  "Office hours are over, relax and recharge ✨",
  "Time to step away from work and breathe 🍃",
  "Work day complete! Time for yourself now 🧘‍♂️",
  "Clocked out! Your evening awaits 🌆",
];

export const defaultGeneralConfig: GeneralConfig = {
  weekendDays: weekendDays,
  timeConfig: defaultTimeConfig,
  relaxingMessages: relaxingMessages,
  clockedOutMessages: clockedOutMessages,
  weekendMessages: weekendMessages,
};
