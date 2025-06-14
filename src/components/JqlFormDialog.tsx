import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JqlFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jqlQuery: string) => void;
  initialJql?: string;
  title: string;
}

const JqlFormDialog: React.FC<JqlFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialJql = "",
  title,
}) => {
  const [jqlQuery, setJqlQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setJqlQuery(initialJql);
    }
  }, [initialJql, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(jqlQuery.trim());
    onClose();
  };

  const handleClose = () => {
    onClose();
    setJqlQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jql">JQL Query</Label>
            <Textarea
              id="jql"
              value={jqlQuery}
              onChange={(e) => setJqlQuery(e.target.value)}
              placeholder="e.g., assignee = currentUser() AND status != Done ORDER BY priority DESC"
              className="min-h-[100px]"
              required
            />
            <p className="text-muted-foreground text-xs">
              Enter a valid JQL (Jira Query Language) query to filter tasks
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JqlFormDialog;
