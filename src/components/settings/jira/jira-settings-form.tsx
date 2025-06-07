import React, { useState, useEffect } from "react";
import { useJiraConfig } from "@/hooks/useJiraConfig";
import { JiraConfig } from "@/types/jira";
import { SettingsHeader } from "../SettingsFormHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SaveButton } from "../SaveButton";
import { JiraInputField } from "./JiraInputField";

const jiraFields = [
  {
    id: "jira-domain",
    label: "Jira Domain",
    type: "text",
    placeholder: "e.g., company.atlassian.net",
    field: "domain" as keyof JiraConfig,
  },
  {
    id: "jira-email",
    label: "Jira Email",
    type: "email",
    placeholder: "Your Jira account email",
    field: "email" as keyof JiraConfig,
  },
  {
    id: "jira-token",
    label: "Jira API Token",
    type: "password",
    placeholder: "Your Jira API token",
    field: "apiToken" as keyof JiraConfig,
  },
];

export const JiraSettings: React.FC = () => {
  const { jiraConfig, updateJiraConfig } = useJiraConfig();

  const [formData, setFormData] = useState<JiraConfig>(jiraConfig);
  const [hasChanges, setHasChanges] = useState(false);

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
    <div className="space-y-8">
      <SettingsHeader title="Jira Integration" />

      <Card className="gap-2 py-6">
        <CardContent>
          <div className="flex flex-col gap-8">
            {jiraFields.map((fieldConfig) => (
              <JiraInputField
                key={fieldConfig.id}
                id={fieldConfig.id}
                label={fieldConfig.label}
                type={fieldConfig.type}
                placeholder={fieldConfig.placeholder}
                value={formData[fieldConfig.field] || ""}
                onChange={(value) =>
                  handleFieldChange(fieldConfig.field, value)
                }
              />
            ))}
          </div>
          <p className="py-2 pt-4 text-sm">
            Generate an API token from your{" "}
            <a
              className="underline underline-offset-1"
              href="https://id.atlassian.com/manage-profile/security/api-tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              Atlassian account settings.
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Save Button */}
      <SaveButton onClick={handleSave} disabled={!hasChanges}>
        Save Settings
      </SaveButton>
    </div>
  );
};
