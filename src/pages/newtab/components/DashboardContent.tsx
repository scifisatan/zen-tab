import React from "react";
import { QuickAccessSection } from "./QuickAccessSection";
import { TasksSection } from "./TasksSection";
import { Link, SectionType, Task } from "@src/types";

interface DashboardContentProps {
  workLinks: Link[];
  socialLinks: Link[];
  toolsLinks: Link[];
  onAddLink: (section: SectionType) => void;
  onEditLink: (section: SectionType, link: Link) => void;
  onDeleteLink: (section: SectionType, linkId: string) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  workLinks,
  socialLinks,
  toolsLinks,
  onAddLink,
  onEditLink,
  onDeleteLink,
}) => {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
      <QuickAccessSection
        className="xl:col-span-1"
        workLinks={workLinks}
        socialLinks={socialLinks}
        toolsLinks={toolsLinks}
        onAddLink={onAddLink}
        onEditLink={onEditLink}
        onDeleteLink={onDeleteLink}
      />
      <TasksSection className="xl:col-span-1" />
    </div>
  );
};
