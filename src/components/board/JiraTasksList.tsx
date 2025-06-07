import React from "react";
import { JiraTask as JiraTaskType } from "@/types/jira";
import JiraTask from "./JiraTask";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useStorage } from "@/hooks/useStorage";
import { getJiraTasksFromBackground } from "@/api";
import { useJiraConfig } from "@/hooks/useJiraConfig";

interface JiraTasksListProps {
  jqlQuery: string;
}

const JiraTasksList: React.FC<JiraTasksListProps> = ({ jqlQuery }) => {
  const { jiraConfig } = useJiraConfig();
  const [jiraTasks, setJiraTasks] = useStorage<JiraTaskType[]>(
    `jiraTasks_${jqlQuery}`,
    [],
  );

  const {
    data: fetchedTasks = [],
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["jiraTasks", jqlQuery, jiraConfig.domain],
    queryFn: () => getJiraTasksFromBackground(jqlQuery),
    enabled:
      !!jqlQuery &&
      !!jiraConfig.apiToken &&
      !!jiraConfig.domain &&
      !!jiraConfig.email,
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

  React.useEffect(() => {
    if (fetchedTasks.length > 0) {
      setJiraTasks(fetchedTasks);
    }
  }, [fetchedTasks, setJiraTasks]);

  const displayTasks = fetchedTasks.length > 0 ? fetchedTasks : jiraTasks;
  const isRefreshing = isFetching && !isLoading;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {isLoading
              ? "Loading..."
              : `${displayTasks.length} task${displayTasks.length !== 1 ? "s" : ""}`}
          </span>
          {isError && <AlertCircle size={14} className="text-red-500" />}
        </div>
        <div className="flex items-center gap-2">
          {dataUpdatedAt && !isLoading && (
            <span className="text-muted-foreground text-xs">
              Updated {new Date(dataUpdatedAt).toLocaleTimeString()}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              size={16}
              className={`mr-1 ${isFetching ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {!jiraConfig ? (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
          <p className="text-sm text-yellow-800">
            Jira configuration incomplete. Please configure your Jira settings
            in the extension settings.
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-800">
            {error?.message || "Failed to fetch tasks"}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <div className="space-y-1">
          {displayTasks.map((task) => (
            <JiraTask key={task.key} task={task} />
          ))}
          {!isLoading && displayTasks.length === 0 && (
            <p className="text-muted-foreground py-4 text-center text-sm">
              No tasks found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JiraTasksList;
