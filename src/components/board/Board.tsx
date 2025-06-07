import BoardTitle from "@/components/board/BoardTitle";
import { Board, Link } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import LinkFormDialog from "../LinkFormDialog";
import LinksList from "../LinkList";
import JiraTasksList from "../JiraTasksList";
import { Plus } from "lucide-react";

export default function Board({ board }: { board: Board }) {
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [currentEditLink, setCurrentEditLink] = useState<Link | null>(null);

  return (
    <div className="flex flex-1">
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <BoardTitle title={board.title} />
          {board.type === "links" && (
            <Button variant="secondary" onClick={() => setIsAddLinkOpen(true)}>
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
              onDeleteLink={() => {
                console.log("link deleted");
              }}
            />
          ) : board.type === "jira" && board.jqlQuery ? (
            <JiraTasksList jqlQuery={board.jqlQuery} />
          ) : null}
        </CardContent>
      </Card>

      <LinkFormDialog
        isOpen={isAddLinkOpen}
        onClose={() => setIsAddLinkOpen(false)}
        onSave={() => {
          console.log("save link");
        }}
        title="Add Link"
      />

      <LinkFormDialog
        isOpen={!!currentEditLink}
        onClose={() => setCurrentEditLink(null)}
        onSave={() => {
          console.log("save link");
        }}
        initialData={currentEditLink || undefined}
        title="Edit Link"
      />
    </div>
  );
}
