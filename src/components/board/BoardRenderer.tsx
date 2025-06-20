import { Board, BoardType } from "@/types";
import {
  LinksBoard,
  JiraBoard,
  NepaliDateBoard,
  Editor
} from "./board-types";

interface BoardRendererProps {
  board: Board;
  onUpdateBoard: (updatedBoard: Board) => void;
}

export function BoardRenderer({ board, onUpdateBoard }: BoardRendererProps) {
  switch (board.type) {
    case "links":
      return <LinksBoard board={board} onUpdateBoard={onUpdateBoard} />;
    case "jira":
      return <JiraBoard board={board} onUpdateBoard={onUpdateBoard} />;
    case "nepali-date":
      return <NepaliDateBoard />;
    case "editor":
      return <Editor board={board} />;
    default:
      return (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Unknown board type: {board.type}
        </div>
      );
  }
}

// Registry for board types - makes it easy to add new types
export const BOARD_TYPES: Record<
  BoardType,
  { label: string; description: string }
> = {
  links: {
    label: "Links Board",
    description: "A board for managing and organizing your favorite links",
  },
  jira: {
    label: "Jira Board",
    description: "A board for displaying Jira tasks based on JQL queries",
  },
  "nepali-date": {
    label: "Nepal Date",
    description: "A board for displaying today's nepali date",
  },
  "editor": {
    label: "Editor",
    description: "A board for storing notes"
  }
};

// Helper function to get available board types
export function getAvailableBoardTypes() {
  return Object.entries(BOARD_TYPES).map(([type, config]) => ({
    type: type as BoardType,
    ...config,
  }));
}
