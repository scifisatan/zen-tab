import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import GeneralSettings from "./general";
import JiraSettings from "./jira";
import DashboardSettings from "./dashboard";
import ThemeSettings from "./themes";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[80vh] min-w-3xl flex-col overflow-hidden">
        <DialogHeader className="mx-auto flex-shrink-0 py-2">
          <DialogTitle className="text-3xl">Zen Tab Settings</DialogTitle>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="m-2 w-full flex-shrink-0">
            <TabsTrigger className="p-4 py-6 text-xl" value="general">
              General
            </TabsTrigger>
            <TabsTrigger className="p-4 py-6 text-xl" value="themes">
              Themes
            </TabsTrigger>
            <TabsTrigger className="p-4 py-6 text-xl" value="jira">
              Jira
            </TabsTrigger>
            <TabsTrigger className="p-4 py-6 text-xl" value="dashboard">
              Dashboard
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 min-h-0 flex-1 overflow-y-hidden">
            <ScrollArea className="h-full px-4">
              <TabsContent
                value="general"
                className="h-auto min-h-full space-y-4 p-2"
              >
                <GeneralSettings />
              </TabsContent>

              <TabsContent
                value="themes"
                className="h-auto min-h-full space-y-4 p-2"
              >
                <ThemeSettings />
              </TabsContent>

              <TabsContent
                value="jira"
                className="h-auto min-h-full space-y-4 p-2"
              >
                <JiraSettings />
              </TabsContent>

              <TabsContent
                value="dashboard"
                className="h-auto min-h-full space-y-6 p-2"
              >
                <DashboardSettings />
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
