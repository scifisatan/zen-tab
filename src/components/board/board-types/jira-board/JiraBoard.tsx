import { Board } from "@/types";
import { JiraTasksList } from "./JiraTasksList";

interface JiraBoardProps {
  board: Board;
  onUpdateBoard: (updatedBoard: Board) => void;
}

export function JiraBoard({ board, onUpdateBoard }: JiraBoardProps) {
  if (!board.jqlQuery) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No JQL query configured for this board.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <JiraTasksList
        board={board}
        onUpdateBoard={onUpdateBoard}
        jqlQuery={board.jqlQuery}
      />
    </div>
  );
}
