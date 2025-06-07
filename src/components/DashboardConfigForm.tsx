import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDashboardConfig } from "@/hooks/useDashboardConfig";

export const DashboardConfigForm: React.FC = () => {
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
      <div className="space-y-2">
        <h3 className="text-gruvbox-yellow text-lg font-medium">
          Dashboard Configuration
        </h3>
        <p className="text-gruvbox-fg3 text-sm">
          Configure your dashboard using JSON format. Edit the configuration
          below and click save to apply changes.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="dashboard-config-json" className="text-gruvbox-fg">
            Configuration JSON
          </Label>
          <Textarea
            id="dashboard-config-json"
            value={rawConfig}
            onChange={(e) => handleConfigChange(e.target.value)}
            className="bg-gruvbox-bg0 border-gruvbox-bg3 text-gruvbox-fg h-96 font-mono text-sm"
            placeholder="Enter your dashboard configuration..."
          />
        </div>

        {error && (
          <div className="rounded border border-red-800 bg-red-900/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="bg-gruvbox-yellow text-gruvbox-bg hover:bg-gruvbox-yellow/90"
        >
          Save Dashboard Config
        </Button>
      </div>
    </div>
  );
};
