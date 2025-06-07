import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";
import { SettingsHeader } from "../SettingsHeader";
import { SaveButton } from "../SaveButton";

export const DashboardSettings: React.FC = () => {
  const { dashboardConfig, setDashboardConfig } = useDashboardConfig();
  const [rawConfig, setRawConfig] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRawConfig(JSON.stringify(dashboardConfig, null, 2));
    setHasChanges(false);
    setError(null);
  }, [dashboardConfig]);

  const handleConfigChange = (value: string) => {
    setRawConfig(value);
    setHasChanges(true);
    setError(null);
  };

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(rawConfig);
      setDashboardConfig(parsedConfig);
      setHasChanges(false);
      setError(null);
    } catch (err) {
      setError("Invalid JSON format. Please check your configuration.");
    }
  };

  return (
    <div className="space-y-4">
      <SettingsHeader title="Dashboard Configuration" />

      <div className="space-y-4">
        <Label htmlFor="dashboard-config-json">Configuration JSON</Label>
        <Textarea
          id="dashboard-config-json"
          value={rawConfig}
          onChange={(e) => handleConfigChange(e.target.value)}
          placeholder="Enter your dashboard configuration..."
        />

        {error && (
          <div className="rounded border border-red-800 bg-red-900/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
      </div>
      <div className="pr-8">
        <SaveButton onClick={handleSave} disabled={!hasChanges}>
          Save Dashboard Config
        </SaveButton>
      </div>
    </div>
  );
};
