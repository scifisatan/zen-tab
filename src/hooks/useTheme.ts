import { BUILT_IN_THEMES, customProps } from "@/constants/theme-presets";
import { CustomTheme, AppearanceMode } from "@/types/theme";
import { parseThemeCSS } from "@/lib/css";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  SELECTED_THEME_KEY,
  CUSTOM_THEMES_KEY,
  APPEARANCE_MODE_KEY,
} from "@/constants/storage-key";

export function useTheme() {
  const queryClient = useQueryClient();

  const { data: selectedTheme } = useQuery({
    queryKey: [SELECTED_THEME_KEY],
    queryFn: () => "gruvbox",
  });

  const { data: appearanceMode = "system" } = useQuery<AppearanceMode>({
    queryKey: [APPEARANCE_MODE_KEY],
    queryFn: () => "system" as AppearanceMode,
  });

  const { data: customThemes } = useQuery<CustomTheme[]>({
    queryKey: [CUSTOM_THEMES_KEY],
    queryFn: () => [] as CustomTheme[],
  });

  const getAllThemes = () => [...BUILT_IN_THEMES, ...(customThemes || [])];

  const setSelectedTheme = (theme: string) => {
    queryClient.setQueryData([SELECTED_THEME_KEY], theme);
  };

  const setAppearanceMode = (mode: AppearanceMode) => {
    queryClient.setQueryData([APPEARANCE_MODE_KEY], mode);
  };

  const addCustomTheme = (newTheme: CustomTheme) => {
    const current =
      queryClient.getQueryData<CustomTheme[]>([CUSTOM_THEMES_KEY]) || [];
    queryClient.setQueryData([CUSTOM_THEMES_KEY], [...current, newTheme]);
  };

  const removeCustomTheme = (id: string) => {
    const current =
      queryClient.getQueryData<CustomTheme[]>([CUSTOM_THEMES_KEY]) || [];
    queryClient.setQueryData(
      [CUSTOM_THEMES_KEY],
      current.filter((t) => t.id !== id),
    );

    // If the removed theme was selected, switch to gruvbox
    if (selectedTheme === id) {
      setSelectedTheme("gruvbox");
    }
  };

  const updateCustomTheme = (updatedTheme: CustomTheme) => {
    const current =
      queryClient.getQueryData<CustomTheme[]>([CUSTOM_THEMES_KEY]) || [];
    queryClient.setQueryData(
      [CUSTOM_THEMES_KEY],
      current.map((t) => (t.id === updatedTheme.id ? updatedTheme : t)),
    );
  };

  const applyTheme = (theme: CustomTheme, isDark: boolean) => {
    const root = window.document.documentElement;

    customProps.forEach((prop) => {
      root.style.removeProperty(prop);
    });

    const themeCSS = isDark ? theme.darkTheme : theme.lightTheme;

    const variables = parseThemeCSS(themeCSS, isDark);

    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  };

  return {
    selectedTheme,
    setSelectedTheme,

    appearanceMode,
    setAppearanceMode,

    customThemes,
    getAllThemes,

    addCustomTheme,
    removeCustomTheme,
    updateCustomTheme,

    applyTheme,
  };
}
