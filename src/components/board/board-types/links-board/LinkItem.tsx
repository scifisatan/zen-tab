import React from "react";
import * as Icons from "lucide-react";
import { Link as LinkType } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LinkItemProps {
  link: LinkType;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditable?: boolean;
}

export const LinkItem: React.FC<LinkItemProps> = ({
  link,
  onEdit,
  onDelete,
  isEditable = false,
}) => {
  const IconComponent = (Icons as any)[link.icon] || Icons.Link;

  return (
    <div className="group hover:bg-background/30 my-1 flex items-center justify-between rounded-md p-2 px-1 py-2 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-grow items-center gap-3 transition-colors"
      >
        <IconComponent className="text-lg" />
        <span className="text-lg font-medium">{link.name}</span>
      </a>

      {isEditable && (
        <div
          className={cn(
            "flex gap-2 opacity-0 transition-opacity group-hover:opacity-100",
            isEditable ? "visible" : "hidden",
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onEdit && onEdit();
            }}
            className="h-8 w-8 p-0"
          >
            <Icons.Edit size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onDelete && onDelete();
            }}
            className="text-destructive hover:text-destructive h-8 w-8 p-0"
          >
            <Icons.Trash size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};
