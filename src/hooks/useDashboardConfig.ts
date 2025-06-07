import { DashboardConfig } from "@/types/dashboard";
import { defaultDashboardConfig } from "@/config/dashboard.config";
import { useStorage } from "@/hooks/useStorage";

const DASHBOARD_STORAGE_KEY = "zen_tab_dashboard_config";

export const useDashboardConfig = () => {
  const [dashboardConfig, setDashboardConfig] = useStorage<DashboardConfig>(
    DASHBOARD_STORAGE_KEY,
    defaultDashboardConfig,
  );

  return {
    dashboardConfig,
    setDashboardConfig,
  };
};
