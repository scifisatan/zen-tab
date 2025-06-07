import React from "react";
import * as Icons from "lucide-react";
import { Link as LinkType } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface LinkItemProps {
  link: LinkType;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditable?: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({
  link,
  onEdit,
  onDelete,
  isEditable = false,
}) => {
  const IconComponent = (Icons as any)[link.icon] || Icons.Link;

  return (
    <div className="group flex items-center justify-between rounded-md px-1 py-2 transition-colors">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-grow items-center gap-3 transition-colors"
      >
        <IconComponent size={20} className="text-gruvbox-yellow" />
        <span>{link.name}</span>
      </a>

      {isEditable && (
        <div
          className={cn(
            "flex gap-2 opacity-0 transition-opacity group-hover:opacity-100",
            isEditable ? "visible" : "hidden",
          )}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit && onEdit();
            }}
            className="rounded p-1"
          >
            <Icons.Edit size={16} className="text-gruvbox-blue" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete && onDelete();
            }}
            className="rounded p-1"
          >
            <Icons.Trash size={16} className="text-gruvbox-red" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkItem;
