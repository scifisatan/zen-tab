import { JiraConfig } from "@/types/jira";
import { defaultJiraConfig } from "@/config/jira.config";
import { useStorage } from "@/hooks/useStorage";

const JIRA_STORAGE_KEY = "zen_tab_jira_config";

export const useJiraConfig = () => {
  const [jiraConfig, setJiraConfig] = useStorage<JiraConfig>(
    JIRA_STORAGE_KEY,
    defaultJiraConfig,
  );

  const updateJiraConfig = (
    domain: string,
    apiToken: string,
    email: string,
  ) => {
    setJiraConfig({
      domain,
      apiToken,
      email,
    });
  };

  return {
    jiraConfig,
    updateJiraConfig,
  };
};
