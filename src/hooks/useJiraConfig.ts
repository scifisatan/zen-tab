import { JiraConfig } from "@/types/jira";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { defaultJiraConfig } from "@/config/jira.config";

const JIRA_CONFIG_KEY = "jira_config";

export const useJiraConfig = () => {
  const queryClient = useQueryClient();

  const {
    data: jiraConfig = defaultJiraConfig,
    isLoading,
    error,
  } = useQuery({
    queryKey: [JIRA_CONFIG_KEY],
    queryFn: () => defaultJiraConfig, // fallback if nothing is persisted
  });

  const setJiraConfig = (
    config: JiraConfig | ((prev: JiraConfig) => JiraConfig),
  ) => {
    let newConfig: JiraConfig;

    if (typeof config === "function") {
      const currentConfig =
        queryClient.getQueryData<JiraConfig>([JIRA_CONFIG_KEY]) ||
        defaultJiraConfig;
      newConfig = config(currentConfig);
    } else {
      newConfig = config;
    }

    // TanStack Query with persistence handles storage automatically
    queryClient.setQueryData([JIRA_CONFIG_KEY], newConfig);
  };

  return {
    jiraConfig,
    setJiraConfig,
    isLoading,
    error,
  };
};
