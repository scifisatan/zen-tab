import { Board as BoardI } from "@/types";
import Board from "@/components/board/";

export function SectionRow({ row }: { row: BoardI[] }) {
  return (
    <div className="flex flex-1 flex-nowrap gap-8 overflow-x-auto sm:flex-wrap">
      {row.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
}
