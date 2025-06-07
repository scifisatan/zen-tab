import React from "react";
import { Circle, ExternalLink } from "lucide-react";
import { JiraTask as JiraTaskType } from "@/types";

interface JiraTaskProps {
  task: JiraTaskType;
}

const JiraTask: React.FC<JiraTaskProps> = ({ task }) => {
  const statusConfig: Record<
    string,
    { circle: string; badge: string; bg: string }
  > = {
    "In Progress": {
      circle: "text-blue-500",
      badge:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
      bg: "hover:bg-blue-50/50 dark:hover:bg-blue-950/30",
    },
    "To Do": {
      circle: "text-amber-500",
      badge:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
      bg: "hover:bg-amber-50/50 dark:hover:bg-amber-950/30",
    },
    Done: {
      circle: "text-emerald-500",
      badge:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
      bg: "hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30",
    },
    Cancelled: {
      circle: "text-red-500",
      badge:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
      bg: "hover:bg-red-50/50 dark:hover:bg-red-950/30",
    },
  };

  const config = statusConfig[task.status] || {
    circle: "text-gray-500",
    badge:
      "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800",
    bg: "hover:bg-gray-50/50 dark:hover:bg-gray-950/30",
  };

  return (
    <div className="group relative">
      <a
        href={task.url}
        className={`my-1 block rounded-xl p-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg hover:shadow-black/5 active:translate-y-0 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:shadow-black/20 ${config.bg} `}
      >
        {/* Header with status and external link icon */}
        <div className="mb-1 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Circle
                size={14}
                className={`fill-current ${config.circle} transition-transform group-hover:scale-110`}
              />
              <div
                className={`absolute inset-0 rounded-full ${config.circle.replace("text-", "bg-")} scale-150 animate-pulse opacity-20`}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-300">
              {task.title}
            </h3>
          </div>
        </div>

        {/* Badges section */}
        <div className="mb-2 flex items-center gap-3 pl-6">
          <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            {task.key}
          </span>
          <span
            className={`inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium transition-colors ${config.badge}`}
          >
            {task.status}
          </span>
        </div>
      </a>
    </div>
  );
};

export default JiraTask;
