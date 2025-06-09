import { Card, CardContent } from "@/components/ui/card";
import { useJiraConfig } from "@/hooks/useJiraConfig";
import { JiraConfig } from "@/types/jira";
import React, { useEffect, useState } from "react";
import { SaveButton } from "../SaveButton";
import { SettingsHeader } from "../SettingsFormHeader";
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
  const { jiraConfig, setJiraConfig, isLoading } = useJiraConfig();

  const [formData, setFormData] = useState<JiraConfig | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (jiraConfig) {
      setFormData(jiraConfig);
      setHasChanges(false);
    }
  }, [jiraConfig]);

  const handleFieldChange = (field: keyof JiraConfig, value: string) => {
    if (formData) {
      setFormData((prev) => ({
        ...prev!,
        [field]: value,
      }));
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    if (formData) {
      setJiraConfig(formData);
      setHasChanges(false);
    }
  };

  if (isLoading || !formData) {
    return (
      <div className="space-y-8">
        <SettingsHeader title="Jira Integration" />
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
        Save
      </SaveButton>
    </div>
  );
};
