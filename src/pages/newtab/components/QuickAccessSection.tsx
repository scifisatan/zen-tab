import React from "react";
import { Briefcase, Users, Wrench } from "lucide-react";
import { LinkBoard } from "./LinkBoard";
import { Link, SectionType } from "../types";
import SectionTitle from "./SectionTitle";

interface QuickAccessSectionProps {
  className: string;
  workLinks: Link[];
  socialLinks: Link[];
  toolsLinks: Link[];
  onAddLink: (section: SectionType) => void;
  onEditLink: (section: SectionType, link: Link) => void;
  onDeleteLink: (section: SectionType, linkId: string) => void;
}

export const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  className,
  workLinks,
  socialLinks,
  toolsLinks,
  onAddLink,
  onEditLink,
  onDeleteLink,
}) => {
  return (
    <div className={`${className}`}>
      <SectionTitle title="Quick Access" />
      <div className="flex flex-col gap-8">
        {/* Work Links */}
        <LinkBoard
          title="Work"
          icon={<Briefcase className="h-6 w-6" />}
          links={workLinks}
          sectionName="work"
          onAddLink={onAddLink}
          onEditLink={onEditLink}
          onDeleteLink={onDeleteLink}
        />

        {/* Social and Tools Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <LinkBoard
            title="Social"
            icon={<Users className="h-6 w-6" />}
            links={socialLinks}
            sectionName="social"
            onAddLink={onAddLink}
            onEditLink={onEditLink}
            onDeleteLink={onDeleteLink}
          />

          <LinkBoard
            title="Tools"
            icon={<Wrench className="h-6 w-6" />}
            links={toolsLinks}
            sectionName="tools"
            onAddLink={onAddLink}
            onEditLink={onEditLink}
            onDeleteLink={onDeleteLink}
          />
        </div>
      </div>
    </div>
  );
};
