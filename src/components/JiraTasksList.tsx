import React, { useState, useEffect } from "react";
import { JiraTask as JiraTaskType } from "@/types/jira";
import JiraTask from "./JiraTask";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface JiraTasksListProps {
  jqlQuery: string;
}

const JiraTasksList: React.FC<JiraTasksListProps> = ({ jqlQuery }) => {
  const [tasks, setTasks] = useState<JiraTaskType[]>([]);
  const [loading, setLoading] = useState(false);

  // use useQuery to fetch jira tasks based on jqlQuery
  // we already have a function in api.ts
  // useAsyncStorage or smth like this to store
  // configurable interval?

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">
          {loading ? "Loading..." : `${tasks.length} tasks`}
        </span>
        <Button
          variant="ghost"
          size="sm"
          // onClick={fetchTasks}
          disabled={loading}
        >
          <RefreshCw
            size={16}
            className={`mr-1 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
      <div className="space-y-1">
        {tasks.map((task) => (
          <JiraTask key={task.key} task={task} />
        ))}
      </div>
    </div>
  );
};

export default JiraTasksList;
