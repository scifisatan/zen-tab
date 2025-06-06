import { Task } from "@src/types";
import TaskItem from "@pages/newtab/components/TaskItem";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="no-scrollbar flex h-[55vh] flex-col gap-2 overflow-y-auto">
      {tasks.map((task, index) => (
        <TaskItem key={task.key || index} task={task} />
      ))}
    </div>
  );
}
