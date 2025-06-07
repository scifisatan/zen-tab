import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock } from "lucide-react";

interface TimePickerProps {
  date: Date | string;
  setDate: (date: Date) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  // Ensure we're working with a Date object
  const ensureDate = (value: Date | string): Date => {
    if (value instanceof Date) {
      return value;
    }
    try {
      return new Date(value);
    } catch (e) {
      console.error("Invalid date:", value);
      return new Date();
    }
  };

  const dateObj = ensureDate(date);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = (hour: number) => {
    const newDate = new Date(dateObj);
    newDate.setHours(hour);
    setDate(newDate);
  };

  const handleMinuteChange = (minute: number) => {
    const newDate = new Date(dateObj);
    newDate.setMinutes(minute);
    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-gruvbox-bg0 border-gruvbox-bg3 text-gruvbox-fg w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {format(dateObj, "HH:mm")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="bg-gruvbox-bg1 text-gruvbox-fg grid grid-cols-2 gap-2 p-3">
          <div className="space-y-2">
            <div className="text-gruvbox-yellow text-center font-medium">
              Hour
            </div>
            <div className="no-scrollbar h-60 overflow-y-auto pr-2">
              {hours.map((hour) => (
                <div
                  key={hour}
                  onClick={() => handleHourChange(hour)}
                  className={cn(
                    "cursor-pointer rounded p-2 text-center",
                    dateObj.getHours() === hour
                      ? "bg-gruvbox-blue text-gruvbox-bg0"
                      : "hover:bg-gruvbox-bg2",
                  )}
                >
                  {hour.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-gruvbox-yellow text-center font-medium">
              Minute
            </div>
            <div className="no-scrollbar h-60 overflow-y-auto pr-2">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  onClick={() => handleMinuteChange(minute)}
                  className={cn(
                    "cursor-pointer rounded p-2 text-center",
                    dateObj.getMinutes() === minute
                      ? "bg-gruvbox-blue text-gruvbox-bg0"
                      : "hover:bg-gruvbox-bg2",
                  )}
                >
                  {minute.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
