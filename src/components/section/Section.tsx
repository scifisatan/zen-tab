import { Section } from "@/types";
import { SectionTitle } from "./SectionTitle";
import { SectionRow } from "./SectionRow";

export function Section({ section }: { section: Section }) {
  return (
    <div className="no-scrollbar flex h-full flex-1 flex-col overflow-y-auto p-4">
      <SectionTitle title={section.title} />
      <div className="flex flex-col gap-8">
        {section.rows.map((row) => (
          <SectionRow key={row.map((board) => board.id).join("-")} row={row} />
        ))}
      </div>
    </div>
  );
}
