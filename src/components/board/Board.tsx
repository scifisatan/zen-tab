import { BoardTitle } from "./BoardTitle";
import { BoardRenderer } from "./BoardRenderer";
import { Board, DashboardConfig } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";

export function Board({
  board,
  setDashboardConfig,
}: {
  board: Board;
  setDashboardConfig: Dispatch<SetStateAction<DashboardConfig>>;
}) {
  // Helper function to update a board within the dashboard config
  const updateBoard = (updatedBoard: Board) => {
    setDashboardConfig((prevConfig) => ({
      ...prevConfig,
      sections: prevConfig.sections.map((section) => ({
        ...section,
        rows: section.rows.map((row) =>
          row.map((b) => (b.id === board.id ? updatedBoard : b)),
        ),
      })),
    }));
  };

  return (
    <Card className="w-full flex-1 gap-2">
      <CardHeader className="flex justify-between">
        <BoardTitle title={board.title} />
      </CardHeader>
      <CardContent>
        <BoardRenderer board={board} onUpdateBoard={updateBoard} />
      </CardContent>
    </Card>
  );
}
