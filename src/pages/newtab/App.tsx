import { useEffect, useState } from "react";

import { MainLayout } from "@/components/MainLayout";
import { Header } from "@/components/DashboardHeader";
import SettingsDialog, { SettingsDialogToggle } from "@/components/settings";
import Dashboard from "@/components/Dashboard";

const App = () => {
  const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle 'Alt+S' key to open settings dialog
      if (event.altKey && event.key.toLowerCase() === "s") {
        event.preventDefault(); // Prevent default browser behavior
        setIsSettingsDialogVisible(true);
      }
      // Handle 'Esc' key to close settings dialog when open
      else if (event.key === "Escape" && isSettingsDialogVisible) {
        setIsSettingsDialogVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsDialogVisible]);

  return (
    <MainLayout>
      <Header />
      <Dashboard />
      <SettingsDialog
        isOpen={isSettingsDialogVisible}
        onClose={() => setIsSettingsDialogVisible(false)}
      />
      <SettingsDialogToggle openSettingsDialog={setIsSettingsDialogVisible} />
    </MainLayout>
  );
};

export default App;
