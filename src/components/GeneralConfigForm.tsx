import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/TimePicker";
import { useGeneralConfig } from "@/hooks/useGeneralConfig";
import { GeneralConfig } from "@/types/general";
import { Save } from "lucide-react";

export const GeneralConfigForm: React.FC = () => {
  const { generalConfig, updateGeneralConfig } = useGeneralConfig();

  // Local state for form data
  const [formData, setFormData] = useState<GeneralConfig>(generalConfig);
  const [hasChanges, setHasChanges] = useState(false);

  // Update local state when generalConfig changes
  useEffect(() => {
    setFormData(generalConfig);
    setHasChanges(false);
  }, [generalConfig]);

  const handleClockTimeChange = (
    field: "clockInTime" | "clockOutTime",
    date: Date,
  ) => {
    setFormData((prev) => ({
      ...prev,
      timeConfig: {
        ...prev.timeConfig,
        [field]: date,
      },
    }));
    setHasChanges(true);
  };

  const handleMessagesChange = (
    field: "relaxingMessages" | "clockedOutMessages",
    value: string,
  ) => {
    const messages = value.split("\n").filter((msg) => msg.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      [field]: messages,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateGeneralConfig(formData);
    setHasChanges(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-gruvbox-yellow text-lg font-medium">
          General Settings
        </h3>
        <p className="text-gruvbox-fg3 text-sm">
          Configure the basic settings for your dashboard.
        </p>
      </div>

      <div className="mt-4 space-y-4">
        <h4 className="text-md font-medium">Clock Settings</h4>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Clock In Time</Label>
              <TimePicker
                date={
                  formData.timeConfig?.clockInTime || new Date(0, 0, 0, 9, 0, 0)
                }
                setDate={(date) => handleClockTimeChange("clockInTime", date)}
              />
            </div>

            <div className="space-y-2">
              <Label>Clock Out Time</Label>
              <TimePicker
                date={
                  formData.timeConfig?.clockOutTime ||
                  new Date(0, 0, 0, 16, 30, 0)
                }
                setDate={(date) => handleClockTimeChange("clockOutTime", date)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relaxing-messages" className="text-gruvbox-fg">
              Before Office Hours Messages
            </Label>
            <Textarea
              id="relaxing-messages"
              placeholder="Enter one message per line"
              value={(formData.relaxingMessages || []).join("\n")}
              onChange={(e) =>
                handleMessagesChange("relaxingMessages", e.target.value)
              }
              className="bg-gruvbox-bg0 border-gruvbox-bg3 text-gruvbox-fg min-h-[100px]"
            />
            <p className="text-gruvbox-fg4 text-xs">
              Messages displayed before office hours. One message per line.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clockedout-messages" className="text-gruvbox-fg">
              After Office Hours Messages
            </Label>
            <Textarea
              id="clockedout-messages"
              placeholder="Enter one message per line"
              value={(formData.clockedOutMessages || []).join("\n")}
              onChange={(e) =>
                handleMessagesChange("clockedOutMessages", e.target.value)
              }
              className="bg-gruvbox-bg0 border-gruvbox-bg3 text-gruvbox-fg min-h-[100px]"
            />
            <p className="text-gruvbox-fg4 text-xs">
              Messages displayed after office hours. One message per line.
            </p>
          </div>
        </div>

        {/* Save Button */}
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
      </div>
    </div>
  );
};
