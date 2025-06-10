import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JiraTask } from "@/types/jira";
import { getJiraTasksFromBackground } from "@/api";
import { useJiraConfig } from "./useJiraConfig";

interface UseJiraTasksResult {
  data: JiraTask[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
  isFetching: boolean;
  dataUpdatedAt: number | undefined;
}

export const useJiraTasks = (jqlQuery: string): UseJiraTasksResult => {
  const { jiraConfig, isLoading: configLoading } = useJiraConfig();
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    error,
    isLoading: apiLoading,
    isError,
    refetch: apiRefetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["jira_tasks", jqlQuery, jiraConfig?.domain],
    queryFn: () => getJiraTasksFromBackground(jqlQuery),
    enabled:
      !!jqlQuery &&
      !!jiraConfig?.apiToken &&
      !!jiraConfig?.domain &&
      !!jiraConfig?.email,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on auth errors or config errors
      if (
        error?.message?.includes("401") ||
        error?.message?.includes("403") ||
        error?.message?.includes("configuration")
      ) {
        return false;
      }
      return failureCount < 3;
    },
    refetchOnWindowFocus: false,
  });

  const refetch = async () => {
    await apiRefetch();
  };

  const clearCache = () => {
    queryClient.removeQueries({
      queryKey: ["jira_tasks", jqlQuery, jiraConfig?.domain],
      exact: true,
    });
  };

  const isLoading = configLoading || apiLoading;

  return {
    data: tasks,
    isLoading,
    isError,
    error,
    refetch,
    clearCache,
    isFetching,
    dataUpdatedAt,
  };
};
