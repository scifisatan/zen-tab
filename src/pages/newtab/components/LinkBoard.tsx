import React, { ReactNode } from "react";
import { Link, SectionType } from "@src/types";
import { Edit2, Trash2 } from "lucide-react";
import { renderIcon } from "../utils/iconRenderer";
import Card from "./ui/Card";
import BoardTitle from "./BoardTitle";
import BoardHeader from "./BoardHeader";
import AddLink from "./AddLink";

interface LinkBoardProps {
  title: string;
  icon: ReactNode;
  links: Link[];
  sectionName: SectionType;
  onAddLink: (section: SectionType) => void;
  onEditLink: (section: SectionType, link: Link) => void;
  onDeleteLink: (section: SectionType, linkId: string) => void;
}

export const LinkBoard: React.FC<LinkBoardProps> = ({
  title,
  icon,
  links,
  sectionName,
  onAddLink,
  onEditLink,
  onDeleteLink,
}) => {
  function addLink() {
    onAddLink(sectionName);
  }

  const handleEdit = (link: Link, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEditLink(sectionName, link);
  };

  const handleDelete = (linkId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteLink(sectionName, linkId);
  };

  return (
    <>
      <Card>
        <BoardHeader>
          <BoardTitle icon={icon} title={title} />
          <AddLink clickHandler={addLink} />
        </BoardHeader>
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="group hover:bg-gruvbox-blue/10 relative flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ease-in-out"
            >
              <a
                href={link.url}
                className="text-gruvbox-fg flex flex-1 items-center gap-3 text-base font-medium no-underline transition-all duration-200 ease-in-out hover:translate-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {renderIcon(link.icon)}
                <span>{link.name}</span>
              </a>

              {/* Edit and Delete buttons */}
              <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  onClick={(e) => handleEdit(link, e)}
                  className="text-gruvbox-blue hover:text-gruvbox-aqua hover:bg-gruvbox-blue/20 flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200"
                  title="Edit link"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => handleDelete(link.id, e)}
                  className="text-gruvbox-red hover:text-gruvbox-orange hover:bg-gruvbox-red/20 flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200"
                  title="Delete link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
