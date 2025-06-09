import { useState, useEffect, useCallback, useRef } from "react";
import { useGeneralConfig } from "@/hooks/useGeneralConfig";
import { formatCurrentTime } from "@/lib/format";
import { time24hrToDate, isWeekend } from "@/lib/time";

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
      // Return early if config is not loaded yet
      if (!generalConfig) {
        setCustomMessage("");
        return;
      }

      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const clockInTime = time24hrToDate(generalConfig.timeConfig.clockInTime);
      const clockOutTime = time24hrToDate(
        generalConfig.timeConfig.clockOutTime,
      );

      // Check if it's weekend - weekends have no office hours
      if (isWeekend(now, generalConfig.weekendDays)) {
        const randomMessage =
          generalConfig.weekendMessages &&
          generalConfig.weekendMessages.length > 0
            ? generalConfig.weekendMessages[
                Math.floor(Math.random() * generalConfig.weekendMessages.length)
              ]
            : "It's the weekend, enjoy your time off!";
        setCustomMessage(randomMessage);
        return;
      }

      // Handle night shift case (clock out time is next day)
      const isNightShift =
        clockOutTime.getHours() < clockInTime.getHours() ||
        (clockOutTime.getHours() === clockInTime.getHours() &&
          clockOutTime.getMinutes() <= clockInTime.getMinutes());

      // Safeguard: If clock-in and clock-out times are the same, treat as no working hours
      if (
        clockInTime.getHours() === clockOutTime.getHours() &&
        clockInTime.getMinutes() === clockOutTime.getMinutes()
      ) {
        const randomMessage =
          generalConfig.relaxingMessages &&
          generalConfig.relaxingMessages.length > 0
            ? generalConfig.relaxingMessages[
                Math.floor(
                  Math.random() * generalConfig.relaxingMessages.length,
                )
              ]
            : "No office hours configured, enjoy your free time!";
        setCustomMessage(randomMessage);
        return;
      }

      // Create clock-out time for today, handling night shift
      const clockoutTime = new Date(now);
      if (isNightShift && currentHour < 12) {
        // If it's night shift and current time is in early morning (before noon),
        // clock out time is today
        clockoutTime.setHours(
          clockOutTime.getHours(),
          clockOutTime.getMinutes(),
          0,
          0,
        );
      } else if (isNightShift) {
        // If it's night shift and current time is afternoon/evening,
        // clock out time is next day
        clockoutTime.setDate(clockoutTime.getDate() + 1);
        clockoutTime.setHours(
          clockOutTime.getHours(),
          clockOutTime.getMinutes(),
          0,
          0,
        );
      } else {
        // Normal day shift
        clockoutTime.setHours(
          clockOutTime.getHours(),
          clockOutTime.getMinutes(),
          0,
          0,
        );
      }

      // Check if before clock-in time
      let isBeforeClockIn = false;
      if (isNightShift) {
        // For night shift, "before clock-in" means the time between clock-out and clock-in
        // This can span across days
        if (currentHour < 12) {
          // Early morning hours - we're before clock-in if we're after clock-out time
          // but before today's clock-in time
          const todayClockIn = new Date(now);
          todayClockIn.setHours(
            clockInTime.getHours(),
            clockInTime.getMinutes(),
            0,
            0,
          );
          isBeforeClockIn = now >= clockoutTime && now < todayClockIn;
        } else {
          // Afternoon/evening hours - we're before clock-in if we're after today's clock-out
          // and before tomorrow's clock-in (but this is handled by time comparison)
          const todayClockOut = new Date(now);
          todayClockOut.setHours(
            clockOutTime.getHours(),
            clockOutTime.getMinutes(),
            0,
            0,
          );

          if (
            currentHour < clockInTime.getHours() ||
            (currentHour === clockInTime.getHours() &&
              currentMinute < clockInTime.getMinutes())
          ) {
            // We're before today's clock-in time
            isBeforeClockIn = true;
          } else if (now >= todayClockOut) {
            // We're after today's clock-out, so we're in the break period until tomorrow's clock-in
            isBeforeClockIn = true;
          }
        }
      } else {
        // For day shift, before clock-in is simply before the start time
        isBeforeClockIn =
          currentHour < clockInTime.getHours() ||
          (currentHour === clockInTime.getHours() &&
            currentMinute < clockInTime.getMinutes());
      }

      if (isBeforeClockIn) {
        const randomMessage =
          generalConfig.relaxingMessages &&
          generalConfig.relaxingMessages.length > 0
            ? generalConfig.relaxingMessages[
                Math.floor(
                  Math.random() * generalConfig.relaxingMessages.length,
                )
              ]
            : "Take your time, office hours haven't started yet!";
        setCustomMessage(randomMessage);
        return;
      }

      // Check if after clock-out time or if we're in a non-working period
      const isAfterClockOut = now >= clockoutTime;

      // Additional check for night shift: if we're past midnight and before clock-in
      let isInNonWorkingPeriod = false;
      if (isNightShift) {
        // For night shift, non-working period is between clock-out and next clock-in
        const todayClockIn = new Date(now);
        todayClockIn.setHours(
          clockInTime.getHours(),
          clockInTime.getMinutes(),
          0,
          0,
        );

        if (currentHour < 12) {
          // Early morning - check if we're after clock-out but before today's clock-in
          isInNonWorkingPeriod = isAfterClockOut && now < todayClockIn;
        }
      }

      if (isAfterClockOut || isInNonWorkingPeriod) {
        const randomMessage =
          generalConfig.clockedOutMessages &&
          generalConfig.clockedOutMessages.length > 0
            ? generalConfig.clockedOutMessages[
                Math.floor(
                  Math.random() * generalConfig.clockedOutMessages.length,
                )
              ]
            : "Work's done! Time to relax and unwind.";
        setCustomMessage(randomMessage);
        return;
      }

      // During work hours - show countdown (updated every second)
      const timeDiff = clockoutTime.getTime() - now.getTime();

      // Safeguard against negative time differences (shouldn't happen with above checks)
      if (timeDiff <= 0) {
        const randomMessage =
          generalConfig.clockedOutMessages &&
          generalConfig.clockedOutMessages.length > 0
            ? generalConfig.clockedOutMessages[
                Math.floor(
                  Math.random() * generalConfig.clockedOutMessages.length,
                )
              ]
            : "Work's done! Time to relax and unwind.";
        setCustomMessage(randomMessage);
        return;
      }

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

      // Return early if config is not loaded yet
      if (!generalConfig) {
        return;
      }

      // Update custom message when minute changes or during work hours (every second for countdown)
      // Weekends have no working hours, so never update every second on weekends
      const isWorkingHours =
        !isWeekend(now, generalConfig.weekendDays) &&
        (() => {
          const clockInTime = time24hrToDate(
            generalConfig.timeConfig.clockInTime,
          );
          const clockOutTime = time24hrToDate(
            generalConfig.timeConfig.clockOutTime,
          );

          // Safeguard: If times are the same, no working hours
          if (
            clockInTime.getHours() === clockOutTime.getHours() &&
            clockInTime.getMinutes() === clockOutTime.getMinutes()
          ) {
            return false;
          }

          // Handle night shift case
          const isNightShift =
            clockOutTime.getHours() < clockInTime.getHours() ||
            (clockOutTime.getHours() === clockInTime.getHours() &&
              clockOutTime.getMinutes() <= clockInTime.getMinutes());

          // Create clock-out time for comparison
          const clockoutTime = new Date(now);
          if (isNightShift && currentHour < 12) {
            clockoutTime.setHours(
              clockOutTime.getHours(),
              clockOutTime.getMinutes(),
              0,
              0,
            );
          } else if (isNightShift) {
            clockoutTime.setDate(clockoutTime.getDate() + 1);
            clockoutTime.setHours(
              clockOutTime.getHours(),
              clockOutTime.getMinutes(),
              0,
              0,
            );
          } else {
            clockoutTime.setHours(
              clockOutTime.getHours(),
              clockOutTime.getMinutes(),
              0,
              0,
            );
          }

          // Check if currently in working hours
          if (isNightShift) {
            // For night shift, working hours span across midnight
            const todayClockIn = new Date(now);
            todayClockIn.setHours(
              clockInTime.getHours(),
              clockInTime.getMinutes(),
              0,
              0,
            );

            if (currentHour >= 12) {
              // Afternoon/evening - check if after clock-in and before midnight
              const isAfterClockIn =
                currentHour > clockInTime.getHours() ||
                (currentHour === clockInTime.getHours() &&
                  currentMinute >= clockInTime.getMinutes());
              return isAfterClockIn;
            } else {
              // Early morning - check if before clock-out
              return now < clockoutTime;
            }
          } else {
            // For day shift, standard logic
            const isAfterClockIn =
              currentHour > clockInTime.getHours() ||
              (currentHour === clockInTime.getHours() &&
                currentMinute >= clockInTime.getMinutes());
            return isAfterClockIn && now < clockoutTime;
          }
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
