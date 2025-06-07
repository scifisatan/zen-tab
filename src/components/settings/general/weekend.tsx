import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GeneralConfig, DayIndex } from "@/types/general";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const WeekendSettings: React.FC<{
  formData: GeneralConfig;
  updateFormData: any;
}> = ({ formData, updateFormData }) => {
  const handleWeekendDayChange = (dayIndex: DayIndex, checked: boolean) => {
    updateFormData((prev: GeneralConfig) => {
      const weekendDays = checked
        ? [...prev.weekendDays, dayIndex]
        : prev.weekendDays.filter((day) => day !== dayIndex);

      return {
        ...prev,
        weekendDays: weekendDays.sort((a, b) => a - b),
      };
    });
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {DAYS.map((dayName, dayIndex) => (
        <div
          key={dayIndex}
          className="hover:bg-accent/50 flex flex-col items-center space-y-2 rounded-md border p-2 transition-colors"
        >
          <Checkbox
            id={`weekend-${dayIndex}`}
            checked={formData.weekendDays.includes(dayIndex as DayIndex)}
            onCheckedChange={(checked: boolean) =>
              handleWeekendDayChange(dayIndex as DayIndex, checked)
            }
          />
          <Label
            htmlFor={`weekend-${dayIndex}`}
            className="cursor-pointer text-xs font-medium select-none"
          >
            {dayName}
          </Label>
        </div>
      ))}
    </div>
  );
};
