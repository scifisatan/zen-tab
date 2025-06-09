import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeneralConfig } from "@/hooks/useGeneralConfig";
import { GeneralConfig } from "@/types/general";
import React, { useEffect, useState } from "react";
import { SaveButton } from "../SaveButton";
import { SettingsHeader } from "../SettingsFormHeader";
import { CustomMessagesSettings } from "./custom-messages";
import { OfficeHoursSettings } from "./office-hours";
import { WeekendSettings } from "./weekend";

interface SettingSection {
  title: string;
  description: string;
  component: React.ComponentType<{
    formData: GeneralConfig;
    updateFormData: (updater: (prev: GeneralConfig) => GeneralConfig) => void;
  }>;
}

const SETTINGS_SECTIONS: SettingSection[] = [
  {
    title: "Weekend Days",
    description:
      "Select days considered as weekend for office hours calculations",
    component: WeekendSettings,
  },
  {
    title: "Office Hours",
    description: "Set your standard working hours for productivity tracking",
    component: OfficeHoursSettings,
  },
  {
    title: "Custom Messages",
    description: "Personalize messages shown during different times of the day",
    component: CustomMessagesSettings,
  },
];

export const GeneralSettings: React.FC = () => {
  const { generalConfig, updateGeneralConfig, isLoading } = useGeneralConfig();
  const [formData, setFormData] = useState<GeneralConfig | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (generalConfig) {
      setFormData(generalConfig);
      setHasChanges(false);
    }
  }, [generalConfig]);

  const updateFormData = (updater: (prev: GeneralConfig) => GeneralConfig) => {
    if (formData) {
      setFormData(updater(formData));
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    if (formData) {
      const cleanedFormData = {
        ...formData,
        relaxingMessages: formData.relaxingMessages.filter(
          (msg) => msg.trim() !== "",
        ),
        clockedOutMessages: formData.clockedOutMessages.filter(
          (msg) => msg.trim() !== "",
        ),
        weekendMessages: formData.weekendMessages.filter(
          (msg) => msg.trim() !== "",
        ),
      };
      updateGeneralConfig(cleanedFormData);
      setHasChanges(false);
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="space-y-6">
        <SettingsHeader title="General Settings" />
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="text-muted-foreground mt-2 text-sm">
              Loading settings...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SettingsHeader title="General Settings" />

      {/* Settings Cards */}
      <div className="space-y-4">
        {SETTINGS_SECTIONS.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <Card key={index} className="gap-2 py-4">
              <CardHeader>
                <CardTitle className="text-semi-bold text-lg">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SectionComponent
                  formData={formData}
                  updateFormData={updateFormData}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Save Button */}
      <SaveButton onClick={handleSave} disabled={!hasChanges}>
        Save
      </SaveButton>
    </div>
  );
};
