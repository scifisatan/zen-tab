import { Section, DashboardConfig } from "@/types";
import { SectionTitle } from "./SectionTitle";
import { SectionRow } from "./SectionRow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction } from "react";

export function Section({
  section,
  setDashboardConfig,
}: {
  section: Section;
  setDashboardConfig: Dispatch<SetStateAction<DashboardConfig>>;
}) {
  return (
    <div className="flex h-full flex-1 flex-col overflow-y-hidden p-4">
      {/* Fixed section title */}
      <div className="mb-6 flex-shrink-0">
        <SectionTitle title={section.title} />
      </div>

      {/* Scrollable section rows */}
      <ScrollArea className="h-full flex-1 overflow-y-auto">
        <div className="flex flex-col gap-8 pr-4">
          {section.rows.map((row) => (
            <SectionRow
              key={row.map((board) => board.id).join("-")}
              row={row}
              setDashboardConfig={setDashboardConfig}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
