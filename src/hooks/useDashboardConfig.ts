import { DashboardConfig } from "@/types/dashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { defaultDashboardConfig } from "@/config/dashboard.config";

const DASHBOARD_CONFIG_KEY = "dashboard_config";

export const useDashboardConfig = () => {
  const queryClient = useQueryClient();

  const {
    data: dashboardConfig = defaultDashboardConfig,
    isLoading,
    error,
  } = useQuery({
    queryKey: [DASHBOARD_CONFIG_KEY],
    queryFn: () => defaultDashboardConfig,
  });

  const setDashboardConfig = (
    newConfig: DashboardConfig | ((prev: DashboardConfig) => DashboardConfig),
  ) => {
    if (typeof newConfig === "function") {
      const currentConfig =
        queryClient.getQueryData<DashboardConfig>([DASHBOARD_CONFIG_KEY]) ||
        defaultDashboardConfig;
      const updatedConfig = newConfig(currentConfig);
      queryClient.setQueryData([DASHBOARD_CONFIG_KEY], updatedConfig);
    } else {
      queryClient.setQueryData([DASHBOARD_CONFIG_KEY], newConfig);
    }
  };

  return {
    dashboardConfig,
    setDashboardConfig,
    isLoading,
    error,
  };
};
