import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@/types/dashboard";
import { v4 as uuidv4 } from "uuid";
import { sanitizeUrl } from "@/lib/links";

interface LinkFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: Link) => void;
  initialData?: Link;
  title: string;
}

const iconOptions = [
  "Briefcase",
  "Trello",
  "CodeXml",
  "Code",
  "FileCode",
  "Github",
  "Twitter",
  "Youtube",
  "PenTool",
  "MessageSquare",
  "Sparkles",
  "FileText",
  "Link",
  "ExternalLink",
  "Globe",
];

const LinkFormDialog: React.FC<LinkFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    url: "",
    icon: "Link",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        url: initialData.url,
        icon: initialData.icon,
      });
    } else {
      setFormData({
        id: uuidv4(),
        name: "",
        url: "",
        icon: "Link",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sanitize the URL before saving
    const sanitizedFormData = {
      ...formData,
      url: sanitizeUrl(formData.url),
    };
    onSave(sanitizedFormData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => handleChange("icon", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    {icon}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkFormDialog;
