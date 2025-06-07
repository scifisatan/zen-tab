import { Section, DashboardConfig } from "@/types";
import { SectionTitle } from "./SectionTitle";
import { SectionRow } from "./SectionRow";
import { Dispatch, SetStateAction } from "react";

export function Section({
  section,
  setDashboardConfig,
}: {
  section: Section;
  setDashboardConfig: Dispatch<SetStateAction<DashboardConfig>>;
}) {
  return (
    <div className="no-scrollbar flex h-full flex-1 flex-col overflow-y-auto p-4">
      <SectionTitle title={section.title} />
      <div className="flex flex-col gap-8">
        {section.rows.map((row) => (
          <SectionRow
            key={row.map((board) => board.id).join("-")}
            row={row}
            setDashboardConfig={setDashboardConfig}
          />
        ))}
      </div>
    </div>
  );
}
