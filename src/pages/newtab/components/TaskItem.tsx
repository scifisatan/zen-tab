// import { gruvboxColors } from "@/data";
import { JiraTask } from "@/types";
import { getStatusClass } from "@/pages/newtab/utils/utils";

export default function TaskItem({ task }: { task: JiraTask }) {
  return (
    <>
      <a
        href={task.url}
        className="text-gruvbox-fg hover:bg-gruvbox-purple/30 flex items-start gap-4 rounded-lg p-4 no-underline transition-all duration-200 ease-in-out hover:-translate-y-0.5"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={`mt-2 h-3 w-3 shrink-0 rounded-full ${getStatusClass(
            task.status,
          )}`}
        ></div>
        <div className="min-w-0 flex-1">
          <div className="text-gruvbox-fg mb-2 text-lg font-bold">
            {task.summary}
          </div>
          <div className="flex items-center gap-3 text-xs opacity-80">
            <span className="bg-gruvbox-bg3 rounded-sm px-2 py-1 font-mono text-xs">
              {task.key}
            </span>
            <span
              className={`rounded-sm px-2 py-1 text-xs ${getStatusClass(
                task.status,
              )}`}
            >
              {task.status}
            </span>
          </div>
        </div>
      </a>
      {/* <style jsx>{`
        .status-todo {
          background: ${gruvboxColors.gray}4d;
        }

        .status-in-progress {
          background: ${gruvboxColors.blue}4d;
        }

        .status-review {
          background: ${gruvboxColors.yellow}4d;
        }

        .status-default {
          background: ${gruvboxColors.gray}4d;
        }
      `}</style> */}
    </>
  );
}
