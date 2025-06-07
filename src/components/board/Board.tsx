import { BoardTitle } from "@/components/board/BoardTitle";
import { Board, Link, DashboardConfig } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import LinkFormDialog from "../LinkFormDialog";
import LinksList from "./LinkList";
import JiraTasksList from "./JiraTasksList";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function Board({
  board,
  setDashboardConfig,
}: {
  board: Board;
  setDashboardConfig: Dispatch<SetStateAction<DashboardConfig>>;
}) {
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState<Link | null>(null);

  // Helper function to update a board within the dashboard config
  const updateBoard = (updatedBoard: Board) => {
    setDashboardConfig((prevConfig) => ({
      ...prevConfig,
      sections: prevConfig.sections.map((section) => ({
        ...section,
        rows: section.rows.map((row) =>
          row.map((b) => (b.id === board.id ? updatedBoard : b)),
        ),
      })),
    }));
  };

  const handleAddLink = (newLink: Link) => {
    const updatedBoard = {
      ...board,
      links: [...board.links, newLink],
    };
    updateBoard(updatedBoard);
    setIsAddLinkOpen(false);
  };

  const handleEditLink = (editedLink: Link) => {
    const updatedBoard = {
      ...board,
      links: board.links.map((link) =>
        link.id === editedLink.id ? editedLink : link,
      ),
    };
    updateBoard(updatedBoard);
    setCurrentEditLink(null);
  };

  const handleDeleteLink = (linkId: string) => {
    const updatedBoard = {
      ...board,
      links: board.links.filter((link) => link.id !== linkId),
    };
    updateBoard(updatedBoard);
  };

  return (
    <div className="flex flex-1">
      <Card className="w-full gap-2">
        <CardHeader className="flex justify-between">
          <BoardTitle title={board.title} />
          {board.type === "links" && (
            <Button variant="outline" onClick={() => setIsAddLinkOpen(true)}>
              <Plus />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {board.type === "links" ? (
            <LinksList
              links={board.links}
              isEditable
              onEditLink={(link) => setCurrentEditLink(link)}
              onDeleteLink={handleDeleteLink}
            />
          ) : board.type === "jira" && board.jqlQuery ? (
            <JiraTasksList jqlQuery={board.jqlQuery} />
          ) : null}
        </CardContent>
      </Card>

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
