import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GeneralConfigForm } from "@/components/GeneralConfigForm";
import { JiraConfigForm } from "@/components/JiraConfigForm";
import { DashboardConfigForm } from "@/components/DashboardConfigForm";

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
      <DialogContent className="flex h-[80vh] w-7xl flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Dashboard Configuration</DialogTitle>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="flex-shrink-0">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="jira">Jira</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <div className="min-h-0 flex-1 overflow-y-hidden">
            <TabsContent
              value="general"
              className="h-auto min-h-full space-y-4 p-4"
            >
              <GeneralConfigForm />
            </TabsContent>

            <TabsContent
              value="jira"
              className="h-auto min-h-full space-y-4 p-4"
            >
              <JiraConfigForm />
            </TabsContent>

            <TabsContent
              value="dashboard"
              className="h-auto min-h-full space-y-6 p-4"
            >
              <DashboardConfigForm />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigFormDialog;
