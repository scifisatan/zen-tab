import React from "react";
import { CheckCircle } from "lucide-react";
import SectionTitle from "../../../components/section/SectionTitle";
import Card from "./ui/Card";
import BoardTitle from "../../../components/board/BoardTitle";
import BoardHeader from "../../../components/board/BoardHeader";
import { useTasks } from "../hooks/useTasks";
import TaskList from "./TaskList";

interface TasksSectionProps {
  className: string;
}

export const TasksSection: React.FC<TasksSectionProps> = ({ className }) => {
  const { tasks, loading, error, refreshTasks } = useTasks();
  return (
    <>
      <div className={`${className}`}>
        <SectionTitle title="My Tasks" />
        <Card>
          <BoardHeader>
            <BoardTitle
              icon={<CheckCircle className="h-6 w-6" />}
              title="Assigned Issue"
            />

            <button
              className="b-0 text-gruvbox-fg cursor-pointer bg-none p-2 text-sm opacity-70 transition-opacity duration-200 ease-in-out hover:opacity-100"
              onClick={refreshTasks}
            >
              Refresh
            </button>
          </BoardHeader>
          {loading && <p> Loading...</p>}
          {error && (
            <p>
              There was an error loading the tasks, make sure the entered values
              are correct.
            </p>
          )}
          {tasks && <TaskList tasks={tasks} />}
        </Card>
      </div>
    </>
  );
};
