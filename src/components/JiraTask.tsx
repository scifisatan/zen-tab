import React from "react";
import { JiraTask as JiraTaskType } from "@/types/jira";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface JiraTaskProps {
  task: JiraTaskType;
}

const JiraTask: React.FC<JiraTaskProps> = ({ task }) => {
  const statusColors: Record<string, string> = {
    "In Progress": "text-blue",
    "To Do": "text-yello",
    Done: "text-green",
    Blocked: "text-red",
  };

  return (
    <a href={task.url}>
      <div className="flex flex-col gap-1 border-b py-2 last:border-0">
        <div className="flex items-center gap-2">
          <Circle
            size={10}
            className={cn(
              "fill-current",
              statusColors[task.status] || "text-gray",
            )}
          />
          <h3 className="font-medium">{task.title}</h3>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="rounded px-2 py-0.5">{task.key}</span>
          <span
            className={cn(
              "brounded px-2 py-0.5",
              statusColors[task.status] || "text-gray",
            )}
          >
            {task.status}
          </span>
        </div>
      </div>
    </a>
  );
};

export default JiraTask;
