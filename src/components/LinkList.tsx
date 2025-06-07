import React from "react";
import { Link as LinkType } from "@/types/dashboard";
import LinkItem from "./LinkItem";

interface LinksListProps {
  links: LinkType[];
  isEditable?: boolean;
  onEditLink?: (link: LinkType) => void;
  onDeleteLink?: (linkId: string) => void;
}

const LinksList: React.FC<LinksListProps> = ({
  links,
  isEditable = false,
  onEditLink,
  onDeleteLink,
}) => {
  return (
    <div className="mt-2 space-y-1">
      {links.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          isEditable={isEditable}
          onEdit={() => onEditLink && onEditLink(link)}
          onDelete={() => onDeleteLink && onDeleteLink(link.id)}
        />
      ))}
    </div>
  );
};

export default LinksList;
