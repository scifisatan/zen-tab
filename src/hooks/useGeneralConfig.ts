import { GeneralConfig } from "@/types/general";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { defaultGeneralConfig } from "@/config/general.config";

const GENERAL_CONFIG_KEY = "general_config";

export const useGeneralConfig = () => {
  const queryClient = useQueryClient();

  const {
    data: generalConfig = defaultGeneralConfig,
    isLoading,
    error,
  } = useQuery({
    queryKey: [GENERAL_CONFIG_KEY],
    queryFn: () => defaultGeneralConfig,
  });

  const updateGeneralConfig = (newConfig: GeneralConfig) => {
    queryClient.setQueryData([GENERAL_CONFIG_KEY], newConfig);
  };

  return {
    generalConfig,
    updateGeneralConfig,
    isLoading,
    error,
  };
};
