<<<<<<< Updated upstream
import Dashboard from "@/components/Dashboard";
import { Header } from "@/components/DashboardHeader";
import { MainLayout } from "@/components/MainLayout";
import SettingsDialog, { SettingsDialogToggle } from "@/components/settings";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryclient = new QueryClient();
=======
import { useState } from "react";

import { MainLayout } from "@/components/MainLayout";
import { Header } from "@/components/DashboardHeader";
import SettingsDialog, { SettingsDialogToggle } from "@/components/settings";
import Dashboard from "@/components/Dashboard";
>>>>>>> Stashed changes

const App = () => {
  const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle 'S' key to open settings dialog
      if (event.key.toLowerCase() === 's') {
        setIsSettingsDialogVisible(true);
      }
      // Handle 'Esc' key to close settings dialog when open
      else if (event.key === 'Escape' && isSettingsDialogVisible) {
        setIsSettingsDialogVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
