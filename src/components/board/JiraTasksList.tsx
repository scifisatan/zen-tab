import { JiraTask as JiraTaskType } from "@/types/jira";
import JiraTask from "./JiraTask";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useJiraTasks } from "@/hooks/useJiraTasks";
import { useJiraConfig } from "@/hooks/useJiraConfig";
import React from "react";
import { Card, CardContent } from "../ui/card";

interface JiraTasksListProps {
  jqlQuery: string;
}

const JiraTasksList: React.FC<JiraTasksListProps> = ({ jqlQuery }) => {
  const { jiraConfig, isLoading: configLoading } = useJiraConfig();

  const {
    data: displayTasks,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useJiraTasks(jqlQuery);

  const isRefreshing = isFetching && !isLoading;
  const isLoadingState = configLoading || isLoading;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {isLoadingState
              ? "Loading..."
              : `${displayTasks.length} task${displayTasks.length !== 1 ? "s" : ""}`}
          </span>
          {isError && <AlertCircle size={14} className="text-red-500" />}
        </div>
        <div className="flex items-center gap-2">
          {dataUpdatedAt && !isLoadingState && (
            <span className="text-muted-foreground text-xs">
              Updated {new Date(dataUpdatedAt).toLocaleTimeString()}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching || configLoading}
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
        <Card>
          <CardContent>
            <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-sm text-yellow-800">
                Jira configuration incomplete. Please configure your Jira
                settings in the extension settings.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : isError ? (
        <div className="rounded-md border p-3">
          <p className="text-sm">{error?.message || "Failed to fetch tasks"}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {displayTasks.map((task: JiraTaskType) => (
            <JiraTask key={task.key} task={task} />
          ))}
          {!isLoadingState && displayTasks.length === 0 && (
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
