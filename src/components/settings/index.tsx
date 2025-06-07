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
import { JiraSettings } from "./jira";
import { DashboardSettings } from "./dashboard";

interface ConfigFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigFormDialog: React.FC<ConfigFormDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[80vh] w-full flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Zen Tab Settings</DialogTitle>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="mx-auto w-3/5 flex-shrink-0">
            <TabsTrigger value="jira">Jira</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <div className="min-h-0 flex-1 overflow-y-hidden">
            <ScrollArea className="h-full">
              <TabsContent
                value="general"
                className="h-auto min-h-full space-y-4 p-4"
              >
                <GeneralSettings />
              </TabsContent>

              <TabsContent
                value="jira"
                className="h-auto min-h-full space-y-4 p-4"
              >
                <JiraSettings />
              </TabsContent>

              <TabsContent
                value="dashboard"
                className="h-auto min-h-full space-y-6 p-4"
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

export default ConfigFormDialog;
