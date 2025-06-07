import { Board as BoardI, DashboardConfig } from "@/types";
import Board from "@/components/board/";
import { Dispatch, SetStateAction } from "react";

export function SectionRow({
  row,
  setDashboardConfig,
}: {
  row: BoardI[];
  setDashboardConfig: Dispatch<SetStateAction<DashboardConfig>>;
}) {
  return (
    <div className="flex flex-1 flex-nowrap gap-8 overflow-x-auto sm:flex-wrap">
      {row.map((board) => (
        <Board
          key={board.id}
          board={board}
          setDashboardConfig={setDashboardConfig}
        />
      ))}
    </div>
  );
}
