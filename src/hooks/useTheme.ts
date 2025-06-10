import { useQuery, useQueryClient } from "@tanstack/react-query";

export type Theme = "dark" | "light" | "system";

const THEME_KEY = "theme";
const DEFAULT_THEME: Theme = "system";

export function useTheme() {
  const queryClient = useQueryClient();

  const {
    data: theme = DEFAULT_THEME,
    isLoading,
    error,
  } = useQuery({
    queryKey: [THEME_KEY],
    queryFn: () => DEFAULT_THEME,
  });

  const setTheme = (newTheme: Theme) => {
    queryClient.setQueryData([THEME_KEY], newTheme);
  };

  return {
    theme,
    setTheme,
    isLoading,
    error,
  };
}
