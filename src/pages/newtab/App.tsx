import { ThemeProvider } from "@/context/ThemeContext";
import { MainLayout } from "@/components/MainLayout";
import { Header } from "@/components/DashboardHeader";
import { useState } from "react";
import SettingsDialog, { SettingsDialogToggle } from "@/components/settings";
import Dashboard from "@/components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryclient = new QueryClient();

const App = () => {
  const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false);

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
