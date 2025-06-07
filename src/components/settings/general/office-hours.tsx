import { TimePicker } from "@/components/TimePicker";
import { Label } from "@/components/ui/label";
import { GeneralConfig } from "@/types";
import { Time24hr } from "@/types/time";

export const OfficeHoursSettings: React.FC<{
  formData: GeneralConfig;
  updateFormData: any;
}> = ({ formData, updateFormData }) => {
  const handleClockTimeChange = (
    field: "clockInTime" | "clockOutTime",
    time: Time24hr,
  ) => {
    updateFormData((prev: GeneralConfig) => ({
      ...prev,
      timeConfig: {
        ...prev.timeConfig,
        [field]: time,
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label className="text-base font-medium">Clock In Time</Label>
        <TimePicker
          time={formData.timeConfig?.clockInTime}
          setTime={(time) => handleClockTimeChange("clockInTime", time)}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base font-medium">Clock Out Time</Label>
        <TimePicker
          time={formData.timeConfig?.clockOutTime}
          setTime={(time) => handleClockTimeChange("clockOutTime", time)}
        />
      </div>
    </div>
  );
};
