import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJiraConfig } from "@/hooks/useJiraConfig";
import { JiraConfig } from "@/types/jira";
import { Save } from "lucide-react";

export const JiraConfigForm: React.FC = () => {
  const { jiraConfig, updateJiraConfig } = useJiraConfig();

  // Local state for form data
  const [formData, setFormData] = useState<JiraConfig>(jiraConfig);
  const [hasChanges, setHasChanges] = useState(false);

  // Update local state when jiraConfig changes
  useEffect(() => {
    setFormData(jiraConfig);
    setHasChanges(false);
  }, [jiraConfig]);

  const handleFieldChange = (field: keyof JiraConfig, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateJiraConfig(formData.domain, formData.apiToken, formData.email);
    setHasChanges(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-gruvbox-yellow text-lg font-medium">
          Jira Integration
        </h3>
        <p className="text-gruvbox-fg3 text-sm">
          Configure your Jira connection settings.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="jira-domain" className="text-gruvbox-fg">
            Jira Domain
          </Label>
          <Input
            id="jira-domain"
            placeholder="e.g., company.atlassian.net"
            value={formData.domain || ""}
            onChange={(e) => handleFieldChange("domain", e.target.value)}
            className="bg-gruvbox-bg0 border-gruvbox-bg3 text-gruvbox-fg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jira-email" className="text-gruvbox-fg">
            Jira Email
          </Label>
          <Input
            id="jira-email"
            type="email"
            placeholder="Your Jira account email"
            value={formData.email || ""}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="bg-gruvbox-bg0 border-gruvbox-bg3 text-gruvbox-fg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jira-token" className="text-gruvbox-fg">
            Jira API Token
          </Label>
          <Input
            id="jira-token"
            type="password"
            placeholder="Your Jira API token"
            value={formData.apiToken || ""}
            onChange={(e) => handleFieldChange("apiToken", e.target.value)}
            className="bg-gruvbox-bg0 border-gruvbox-bg3 text-gruvbox-fg"
          />
          <p className="text-gruvbox-fg4 text-xs">
            Generate an API token from your Atlassian account settings.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="bg-gruvbox-green hover:bg-gruvbox-green/80 text-gruvbox-bg0 disabled:opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Jira Settings
        </Button>
      </div>
    </div>
  );
};
