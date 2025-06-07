import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeneralConfig } from "@/hooks/useGeneralConfig";
import { GeneralConfig } from "@/types/general";
import { AppearanceSettings } from "./appearance";
import { WeekendSettings } from "./weekend";
import { OfficeHoursSettings } from "./office-hours";
import { CustomMessagesSettings } from "./custom-messages";
import { SettingsHeader } from "../SettingsFormHeader";
import { SaveButton } from "../SaveButton";

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
    title: "Appearance",
    description: "Customize the visual theme of your dashboard",
    component: AppearanceSettings,
  },
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
  const { generalConfig, updateGeneralConfig } = useGeneralConfig();
  const [formData, setFormData] = useState<GeneralConfig>(generalConfig);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(generalConfig);
    setHasChanges(false);
  }, [generalConfig]);

  const updateFormData = (updater: (prev: GeneralConfig) => GeneralConfig) => {
    setFormData(updater);
    setHasChanges(true);
  };

  const handleSave = () => {
    const cleanedFormData = {
      ...formData,
      relaxingMessages: formData.relaxingMessages.filter(
        (msg) => msg.trim() !== "",
      ),
      clockedOutMessages: formData.clockedOutMessages.filter(
        (msg) => msg.trim() !== "",
      ),
    };
    updateGeneralConfig(cleanedFormData);
    setHasChanges(false);
  };

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
        Save Settings
      </SaveButton>
    </div>
  );
};
