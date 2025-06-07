import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSection, FormField } from "@/components/ui/form-section";
import { TimePicker } from "@/components/TimePicker";
import { useGeneralConfig } from "@/hooks/useGeneralConfig";
import { GeneralConfig, DayIndex } from "@/types/general";
import { Save } from "lucide-react";
import { Time24hr } from "@/types/time";
import { ThemeToggle } from "./settings/general/ThemeToggle";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const GeneralConfigForm: React.FC = () => {
  const { generalConfig, updateGeneralConfig } = useGeneralConfig();

  const [formData, setFormData] = useState<GeneralConfig>(generalConfig);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(generalConfig);
    setHasChanges(false);
  }, [generalConfig]);

  const handleClockTimeChange = (
    field: "clockInTime" | "clockOutTime",
    time: Time24hr,
  ) => {
    setFormData((prev) => ({
      ...prev,
      timeConfig: {
        ...prev.timeConfig,
        [field]: time,
      },
    }));
    console.log("Setting new time locally", field, time);
    setHasChanges(true);
  };

  const handleMessagesChange = (
    field: "relaxingMessages" | "clockedOutMessages",
    value: string,
  ) => {
    const messages = value.split("\n");
    setFormData((prev) => ({
      ...prev,
      [field]: messages,
    }));
    setHasChanges(true);
  };

  const handleWeekendDayChange = (dayIndex: DayIndex, checked: boolean) => {
    setFormData((prev) => {
      const weekendDays = checked
        ? [...prev.weekendDays, dayIndex]
        : prev.weekendDays.filter((day) => day !== dayIndex);

      return {
        ...prev,
        weekendDays: weekendDays.sort((a, b) => a - b),
      };
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    const cleanedFormData = {
      ...formData,
      relaxingMessages: formData.relaxingMessages.filter(
        (msg) => msg.trim() !== "" || msg === "",
      ),
      clockedOutMessages: formData.clockedOutMessages.filter(
        (msg) => msg.trim() !== "" || msg === "",
      ),
    };
    updateGeneralConfig(cleanedFormData);
    setHasChanges(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground">
          Configure the basic settings for your dashboard.
        </p>
      </div>

      {/* Form Sections */}
      <div className="space-y-6">
        <FormSection
          title="Appearance"
          description="Customize the visual appearance of your dashboard"
        >
          <ThemeToggle />
        </FormSection>

        <FormSection
          title="Weekend Configuration"
          description="Define which days are considered weekends for office hours calculation"
        >
          <FormField
            label="Weekend Days"
            description="Select the days considered as weekend. This affects the office hours calculation."
          >
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={`weekend-${day}`}
                    checked={formData.weekendDays.includes(day as DayIndex)}
                    onCheckedChange={(checked: boolean) =>
                      handleWeekendDayChange(day as DayIndex, checked)
                    }
                  />
                  <Label
                    htmlFor={`weekend-${day}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {WEEKDAYS[day]}
                  </Label>
                </div>
              ))}
            </div>
          </FormField>
        </FormSection>

        <FormSection
          title="Office Hours"
          description="Set your working hours and customize messages for different times"
        >
          {/* Time Pickers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Clock In Time"
              description="When your work day begins"
            >
              <TimePicker
                time={formData.timeConfig?.clockInTime}
                setTime={(time) => handleClockTimeChange("clockInTime", time)}
              />
            </FormField>

            <FormField
              label="Clock Out Time"
              description="When your work day ends"
            >
              <TimePicker
                time={formData.timeConfig?.clockOutTime}
                setTime={(time) => handleClockTimeChange("clockOutTime", time)}
              />
            </FormField>
          </div>

          {/* Message Configuration Subsection */}
          <div className="space-y-4 pt-2">
            <h4 className="text-base font-semibold">Message Configuration</h4>

            <FormField
              label="Before Office Hours Messages"
              description="Messages displayed before office hours. One message per line."
            >
              <Textarea
                id="relaxing-messages"
                placeholder="Enter one message per line"
                value={(formData.relaxingMessages || []).join("\n")}
                onChange={(e) =>
                  handleMessagesChange("relaxingMessages", e.target.value)
                }
                className="scrollbar-thin max-h-[200px] min-h-[100px] resize-y overflow-auto text-sm leading-relaxed break-words whitespace-pre-wrap"
              />
            </FormField>

            <FormField
              label="After Office Hours Messages"
              description="Messages displayed after office hours. One message per line."
            >
              <Textarea
                id="clockedout-messages"
                placeholder="Enter one message per line"
                value={(formData.clockedOutMessages || []).join("\n")}
                onChange={(e) =>
                  handleMessagesChange("clockedOutMessages", e.target.value)
                }
                className="min-h-[100px]"
              />
            </FormField>
          </div>
        </FormSection>

        {/* Save Button Section */}
        <FormSection title="" description="" showSeparator={false}>
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="disabled:opacity-50"
            >
              <Save className="mr-2 h-4 w-4" />
              Save General Settings
            </Button>
          </div>
        </FormSection>
      </div>
    </div>
  );
};
