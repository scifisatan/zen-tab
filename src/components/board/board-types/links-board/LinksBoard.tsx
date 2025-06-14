import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, Board } from "@/types";
import LinkFormDialog from "@/components/LinkFormDialog";
import { LinksList } from "./LinksList";

interface LinksBoardProps {
  board: Board;
  onUpdateBoard: (updatedBoard: Board) => void;
}

export function LinksBoard({ board, onUpdateBoard }: LinksBoardProps) {
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState<Link | null>(null);

  const handleAddLink = (newLink: Link) => {
    const updatedBoard = {
      ...board,
      links: [...board.links, newLink],
    };
    onUpdateBoard(updatedBoard);
    setIsAddLinkOpen(false);
  };

  const handleEditLink = (editedLink: Link) => {
    const updatedBoard = {
      ...board,
      links: board.links.map((link) =>
        link.id === editedLink.id ? editedLink : link,
      ),
    };
    onUpdateBoard(updatedBoard);
    setCurrentEditLink(null);
  };

  const handleDeleteLink = (linkId: string) => {
    const updatedBoard = {
      ...board,
      links: board.links.filter((link) => link.id !== linkId),
    };
    onUpdateBoard(updatedBoard);
  };

  return (
    <div className="gap-0">
      <div className="flex flex-col">
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddLinkOpen(true)}
          >
            <Plus size={16} />
          </Button>
        </div>

        <LinksList
          links={board.links}
          isEditable
          onEditLink={(link) => setCurrentEditLink(link)}
          onDeleteLink={handleDeleteLink}
        />
      </div>

      <LinkFormDialog
        isOpen={isAddLinkOpen}
        onClose={() => setIsAddLinkOpen(false)}
        onSave={handleAddLink}
        title="Add Link"
      />

      <LinkFormDialog
        isOpen={!!currentEditLink}
        onClose={() => setCurrentEditLink(null)}
        onSave={handleEditLink}
        initialData={currentEditLink || undefined}
        title="Edit Link"
      />
    </div>
  );
}
