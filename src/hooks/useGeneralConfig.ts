import { GeneralConfig } from "@/types/general";
import { defaultGeneralConfig } from "@/config/general.config";
import { useStorage } from "@/hooks/useStorage";
import { useMemo } from "react";

const GENERAL_STORAGE_KEY = "zen_tab_general_config";

export const useGeneralConfig = () => {
  const [generalConfig, setGeneralConfig] = useStorage<GeneralConfig>(
    GENERAL_STORAGE_KEY,
    defaultGeneralConfig,
  );

  // Memoize the processed config to avoid unnecessary recalculations
  const processedConfig = useMemo(() => {
    const config = { ...generalConfig };

    if (config.timeConfig) {
      if (typeof config.timeConfig.clockInTime === "string") {
        config.timeConfig.clockInTime = config.timeConfig.clockInTime;
      }
      if (typeof config.timeConfig.clockOutTime === "string") {
        config.timeConfig.clockOutTime = config.timeConfig.clockOutTime;
      }
    }

    return config;
  }, [generalConfig]);

  const updateGeneralConfig = (newConfig: GeneralConfig) => {
    setGeneralConfig(newConfig);
  };

  return {
    generalConfig: processedConfig,
    updateGeneralConfig,
  };
};
