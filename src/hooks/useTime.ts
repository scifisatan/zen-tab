import { useState, useEffect, useCallback, useRef } from "react";
import { useGeneralConfig } from "@/hooks/useGeneralConfig";
import { formatCurrentTime } from "@/lib/format";
import { time24hToDate, isWeekend } from "@/lib/time";

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const { generalConfig } = useGeneralConfig();

  // Track previous values to detect changes
  const prevHour = useRef<number>(-1);
  const prevMinute = useRef<number>(-1);

  // Memoized greeting update function
  const updateGreeting = useCallback((hour: number) => {
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // Memoized custom message update function
  const updateCustomMessage = useCallback(
    (now: Date) => {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const clockInTime = time24hToDate(generalConfig.timeConfig.clockInTime);
      const clockOutTime = time24hToDate(generalConfig.timeConfig.clockOutTime);

      // Check if it's weekend
      if (isWeekend(now, generalConfig.weekendDays)) {
        const randomMessage =
          generalConfig.weekendMessages[
            Math.floor(Math.random() * generalConfig.weekendMessages.length)
          ];
        setCustomMessage(randomMessage);
        return;
      }

      // Check if before clock-in time
      if (
        currentHour < clockInTime.getHours() ||
        (currentHour === clockInTime.getHours() &&
          currentMinute < clockInTime.getMinutes())
      ) {
        const randomMessage =
          generalConfig.relaxingMessages[
            Math.floor(Math.random() * generalConfig.relaxingMessages.length)
          ];
        setCustomMessage(randomMessage);
        return;
      }

      // Check if after clock-out time
      const clockoutTime = new Date(now);
      clockoutTime.setHours(
        clockOutTime.getHours(),
        clockOutTime.getMinutes(),
        0,
        0,
      );

      if (now >= clockoutTime) {
        const randomMessage =
          generalConfig.clockedOutMessages[
            Math.floor(Math.random() * generalConfig.clockedOutMessages.length)
          ];
        setCustomMessage(randomMessage);
        return;
      }

      // During work hours - show countdown (updated every second)
      const timeDiff = clockoutTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeDiff % (1000 * 60 * 60)) / (1000 * 60),
      );
      const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

      if (hoursLeft > 0) {
        setCustomMessage(
          `clocking out in ${hoursLeft} hour${hoursLeft !== 1 ? "s" : ""} ${minutesLeft} min${minutesLeft !== 1 ? "s" : ""} ${secondsLeft} sec${secondsLeft !== 1 ? "s" : ""}`,
        );
      } else if (minutesLeft > 0) {
        setCustomMessage(
          `clocking out in ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""} ${secondsLeft} second${secondsLeft !== 1 ? "s" : ""}`,
        );
      } else if (secondsLeft > 0) {
        setCustomMessage(
          `clocking out in ${secondsLeft} second${secondsLeft !== 1 ? "s" : ""}`,
        );
      } else {
        setCustomMessage("clocking out now!");
      }
    },
    [generalConfig],
  );

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Always update current time (for seconds display)
      setCurrentTime(now);

      // Update greeting only when hour changes
      if (prevHour.current !== currentHour) {
        updateGreeting(currentHour);
        prevHour.current = currentHour;
      }

      // Update custom message when minute changes or during work hours (every second for countdown)
      const isWorkingHours =
        !isWeekend(now, generalConfig.weekendDays) &&
        (() => {
          const clockInTime = time24hToDate(
            generalConfig.timeConfig.clockInTime,
          );
          const clockOutTime = time24hToDate(
            generalConfig.timeConfig.clockOutTime,
          );
          const clockoutTime = new Date(now);
          clockoutTime.setHours(
            clockOutTime.getHours(),
            clockOutTime.getMinutes(),
            0,
            0,
          );

          return (
            (currentHour > clockInTime.getHours() ||
              (currentHour === clockInTime.getHours() &&
                currentMinute >= clockInTime.getMinutes())) &&
            now < clockoutTime
          );
        })();

      if (prevMinute.current !== currentMinute || isWorkingHours) {
        updateCustomMessage(now);
        prevMinute.current = currentMinute;
      }
    };

    // Initial update
    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateGreeting, updateCustomMessage, generalConfig]);

  return {
    currentTime,
    greeting,
    customMessage,
    formatCurrentTime,
  };
};
