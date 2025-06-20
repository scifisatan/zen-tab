import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  DASHBOARD_CONFIG_KEY,
  EDITOR_CONTENT_KEY,
  GENERAL_CONFIG_KEY,
  JIRA_CONFIG_KEY,
  SELECTED_THEME_KEY,
  APPEARANCE_MODE_KEY,
  CUSTOM_THEMES_KEY,
} from "@/constants/storage-key";

interface ImportExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExportItem {
  key: string;
  label: string;
  description: string;
}

const exportItems: ExportItem[] = [
  {
    key: DASHBOARD_CONFIG_KEY,
    label: "Dashboard Configuration",
    description: "Dashboard layout and widget settings",
  },
  {
    key: EDITOR_CONTENT_KEY,
    label: "Editor Content",
    description: "Saved notes and editor content",
  },
  {
    key: GENERAL_CONFIG_KEY,
    label: "General Settings",
    description: "General application preferences",
  },
  {
    key: JIRA_CONFIG_KEY,
    label: "Jira Configuration",
    description: "Jira integration settings",
  },
  {
    key: SELECTED_THEME_KEY,
    label: "Selected Theme",
    description: "Currently active theme",
  },
  {
    key: APPEARANCE_MODE_KEY,
    label: "Appearance Mode",
    description: "Light/dark mode preference",
  },
  {
    key: CUSTOM_THEMES_KEY,
    label: "Custom Themes",
    description: "User-created custom themes",
  },
];

export const ImportExportDialog: React.FC<ImportExportDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [selectedItems, setSelectedItems] = useState<string[]>(
    exportItems.map((item) => item.key),
  );
  const [importData, setImportData] = useState("");
  const [activeTab, setActiveTab] = useState("export");

  const handleItemToggle = (key: string) => {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(exportItems.map((item) => item.key));
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleExport = () => {
    try {
      const exportData: Record<string, any> = {};

      selectedItems.forEach((key) => {
        if (key === EDITOR_CONTENT_KEY) {
          // Handle editor content with board IDs
          const editorData: Record<string, any> = {};

          // Get all queries that start with EDITOR_CONTENT_KEY
          const queries = queryClient.getQueryCache().getAll();
          queries.forEach((query) => {
            const queryKey = query.queryKey;
            if (Array.isArray(queryKey) && queryKey[0] === EDITOR_CONTENT_KEY) {
              const boardId = queryKey[1]?.boardId;
              if (boardId && query.state.data !== undefined) {
                editorData[boardId] = query.state.data;
              }
            }
          });

          if (Object.keys(editorData).length > 0) {
            exportData[key] = editorData;
          }
        } else {
          // Handle simple keys
          const cachedData = queryClient.getQueryData([key]);
          if (cachedData !== undefined) {
            exportData[key] = cachedData;
          }
        }
      });

      if (Object.keys(exportData).length === 0) {
        toast.error(
          "No data found to export. Make sure you have content in your selected settings.",
        );
        return;
      }

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `zen-tab-settings-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Your settings have been exported successfully.");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export settings. Please try again.");
    }
  };

  const handleImport = async () => {
    try {
      const data = JSON.parse(importData);
      let importedCount = 0;

      // Import data into React Query cache
      for (const [key, value] of Object.entries(data)) {
        if (exportItems.some((item) => item.key === key)) {
          if (key === EDITOR_CONTENT_KEY && typeof value === "object") {
            // Handle editor content with board IDs
            for (const [boardId, editorContent] of Object.entries(
              value as Record<string, any>,
            )) {
              const queryKey = [EDITOR_CONTENT_KEY, { boardId }];
              queryClient.removeQueries({ queryKey });
              queryClient.setQueryData(queryKey, editorContent);
            }
          } else {
            // Handle simple keys
            queryClient.removeQueries({ queryKey: [key] });
            queryClient.setQueryData([key], value);
          }

          importedCount++;
        }
      }

      if (importedCount > 0) {
        toast.success(
          `Successfully imported ${importedCount} settings. The page will refresh to apply changes.`,
        );

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        setImportData("");
        onClose();
      } else {
        toast.error("No valid settings found in the imported data.");
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Invalid JSON format. Please check your data and try again.");
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import/Export Settings</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="import">Import</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                  Deselect All
                </Button>
              </div>

              <div className="max-h-60 space-y-3 overflow-y-auto">
                {exportItems.map((item) => (
                  <div key={item.key} className="flex items-start space-x-3">
                    <Checkbox
                      id={item.key}
                      checked={selectedItems.includes(item.key)}
                      onCheckedChange={() => handleItemToggle(item.key)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={item.key} className="font-medium">
                        {item.label}
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleExport}
                disabled={selectedItems.length === 0}
                className="w-full"
              >
                Export Selected Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-input">Import from file:</Label>
                <input
                  id="file-input"
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="text-muted-foreground text-center text-sm">
                — or —
              </div>

              <div>
                <Label htmlFor="import-textarea">Paste JSON data:</Label>
                <Textarea
                  id="import-textarea"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Paste your exported settings JSON here..."
                  className="mt-1 h-40"
                />
              </div>

              <Button
                onClick={handleImport}
                disabled={!importData.trim()}
                className="w-full"
              >
                Import Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
