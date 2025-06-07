import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { Hour, Minute, Time24hr } from "@/types/time";
import { useState, useEffect } from "react";

// Local editing state type - allows strings during editing
type LocalTime = {
  hour: string;
  minute: string;
};

type TimeField = "hour" | "minute";

interface TimePickerProps {
  time: Time24hr;
  setTime: (time: Time24hr) => void;
}

export function TimePicker({ time, setTime }: TimePickerProps) {
  const [localTime, setLocalTime] = useState<LocalTime>({
    hour: time.hour,
    minute: time.minute,
  });

  useEffect(() => {
    setLocalTime({
      hour: time.hour,
      minute: time.minute,
    });
  }, [time]);

  // Generic handler for both hour and minute fields
  const createTimeHandler = (field: TimeField) => {
    const maxValue = field === "hour" ? 23 : 59;
    const maxFirstDigit = field === "hour" ? 2 : 5;

    return {
      onChange: (value: string) => {
        // Allow only digits and limit to 2 characters
        const digitsOnly = value.replace(/\D/g, "").slice(0, 2);

        // Always update the local display value first
        setLocalTime((prev) => ({ ...prev, [field]: digitsOnly }));

        // If empty, don't update parent yet
        if (digitsOnly === "") {
          return;
        }

        // Convert to number and validate range
        const numValue = parseInt(digitsOnly);

        // Only update parent if it's a valid complete value
        if (digitsOnly.length === 2 && numValue >= 0 && numValue <= maxValue) {
          const paddedValue = numValue.toString().padStart(2, "0") as
            | Hour
            | Minute;
          setTime({ ...time, [field]: paddedValue });
        } else if (
          digitsOnly.length === 1 &&
          numValue >= 0 &&
          numValue <= maxFirstDigit
        ) {
          // Allow single digit input for valid first digits
          // Don't update parent yet, wait for second digit or blur
        }
      },

      onBlur: () => {
        // On blur, ensure we have a valid 2-digit value
        const currentValue = localTime[field];
        if (currentValue === "" || currentValue.length === 0) {
          const defaultValue = "00" as Hour | Minute;
          setLocalTime((prev) => ({ ...prev, [field]: defaultValue }));
          setTime({ ...time, [field]: defaultValue });
        } else if (currentValue.length === 1) {
          const paddedValue = currentValue.padStart(2, "0") as Hour | Minute;
          setLocalTime((prev) => ({ ...prev, [field]: paddedValue }));
          setTime({ ...time, [field]: paddedValue });
        }
      },
    };
  };

  const hourHandler = createTimeHandler("hour");
  const minuteHandler = createTimeHandler("minute");

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <Clock className="text-muted-foreground h-4 w-4" />
      </div>
      <div className="flex items-center space-x-1">
        <Input
          type="text"
          value={localTime.hour}
          onChange={(e) => hourHandler.onChange(e.target.value)}
          onBlur={hourHandler.onBlur}
          className="w-16 text-center"
          placeholder="HH"
        />
        <span className="text-xl">:</span>
        <Input
          type="text"
          value={localTime.minute}
          onChange={(e) => minuteHandler.onChange(e.target.value)}
          onBlur={minuteHandler.onBlur}
          className="w-16 text-center"
          placeholder="MM"
        />
      </div>
    </div>
  );
}
