import { ThemeProvider } from "@/context/ThemeContext";
import { MainLayout } from "@/components/MainLayout";
import { Header } from "@/components/Header";
import { useState } from "react";
import ConfigFormDialog from "@/components/ConfigFormDialog";
import ConfigFormDialogToggle from "@/components/ConfigFormDialogToggle";
import Dashboard from "@/components/Dashboard";

const App = () => {
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  return (
    <ThemeProvider>
      <MainLayout>
        <Header />
        <Dashboard />
        <ConfigFormDialog
          isOpen={configDialogOpen}
          onClose={() => setConfigDialogOpen(false)}
        />
        <ConfigFormDialogToggle setConfigDialogOpen={setConfigDialogOpen} />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
