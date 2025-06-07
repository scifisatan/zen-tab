import { Board as BoardI } from "@/types";
import Board from "@/components/board/Board";

export function SectionRow({ row }: { row: BoardI[] }) {
  return (
    <div className="flex flex-1 gap-8">
      {row.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
}
