import { GeneralConfig } from "@/types";
import { time24hToDate } from "@/lib/time";

// TODO: Separate this more
export const formatMessage = (date: Date, config: GeneralConfig) => {
  const now = new Date(date);
  const currentHour = now.getHours();

  const clockInTime = time24hToDate(config.timeConfig.clockInTime);
  const clockOutTime = time24hToDate(config.timeConfig.clockOutTime);

  // Check if it's before clock-in time (non-office hours)
  if (currentHour < clockInTime.getHours()) {
    const randomMessage =
      config.relaxingMessages[
        Math.floor(Math.random() * config.relaxingMessages.length)
      ];
    return randomMessage;
  }

  const clockoutTime = new Date(now);
  clockoutTime.setHours(
    clockOutTime.getHours(),
    clockOutTime.getMinutes(),
    0,
    0,
  );

  // Check if it's already past clock-out time today (clocked out)
  if (now >= clockoutTime) {
    const randomMessage =
      config.clockedOutMessages[
        Math.floor(Math.random() * config.clockedOutMessages.length)
      ];
    return randomMessage;
  }

  const timeDiff = clockoutTime.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

  if (hoursLeft > 0) {
    return `clocking out in ${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""} ${minutesLeft} min${minutesLeft !== 1 ? "s" : ""} ${secondsLeft} sec${secondsLeft !== 1 ? "s" : ""}`;
  } else if (minutesLeft > 0) {
    return `clocking out in ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""} ${secondsLeft} second${secondsLeft !== 1 ? "s" : ""}`;
  } else if (secondsLeft > 0) {
    return `clocking out in ${secondsLeft} second${secondsLeft !== 1 ? "s" : ""}`;
  } else {
    return "clocking out now!";
  }
};

export const formatCurrentTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};
