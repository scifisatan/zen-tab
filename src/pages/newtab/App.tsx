import Dashboard from "@/components/Dashboard";
import { Header } from "@/components/DashboardHeader";
import { MainLayout } from "@/components/MainLayout";
import SettingsDialog, { SettingsDialogToggle } from "@/components/settings";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryclient = new QueryClient();

const App = () => {
  const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle 'S' key to toggle settings dialog
      if (event.key.toLowerCase() === 's') {
        setIsSettingsDialogVisible(prev => !prev);
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
    <ThemeProvider>
      <QueryClientProvider client={queryclient}>
        <MainLayout>
          <Header />
          <Dashboard />
          <SettingsDialog
            isOpen={isSettingsDialogVisible}
            onClose={() => setIsSettingsDialogVisible(false)}
          />
          <SettingsDialogToggle
            openSettingsDialog={setIsSettingsDialogVisible}
          />
        </MainLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
