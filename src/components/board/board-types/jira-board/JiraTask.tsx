import React from "react";
import { Circle, ExternalLink } from "lucide-react";
import { JiraTask as JiraTaskType } from "@/types";

interface JiraTaskProps {
  task: JiraTaskType;
}

export const JiraTask: React.FC<JiraTaskProps> = ({ task }) => {
  const statusConfig: Record<
    string,
    { circle: string; badge: string; bg: string }
  > = {
    "In Progress": {
      circle: "text-blue-300",
      badge:
        "bg-blue-50/70 text-blue-600 border-blue-200/70 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800/50",
      bg: "hover:bg-blue-50/30 dark:hover:bg-blue-950/20",
    },
    "To Do": {
      circle: "text-amber-300",
      badge:
        "bg-amber-50/70 text-amber-600 border-amber-200/70 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/50",
      bg: "hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
    },
    Done: {
      circle: "text-emerald-300",
      badge:
        "bg-emerald-50/70 text-emerald-600 border-emerald-200/70 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/50",
      bg: "hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20",
    },
    Cancelled: {
      circle: "text-red-300",
      badge:
        "bg-red-50/70 text-red-600 border-red-200/70 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800/50",
      bg: "hover:bg-red-50/30 dark:hover:bg-red-950/20",
    },
  };

  const config = statusConfig[task.status] || {
    circle: "text-gray-300",
    badge:
      "bg-gray-50/70 text-gray-600 border-gray-200/70 dark:bg-gray-950/50 dark:text-gray-400 dark:border-gray-800/50",
    bg: "hover:bg-gray-50/30 dark:hover:bg-gray-950/20",
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
            <h3 className="text-lg font-medium">{task.title}</h3>
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
