import {
  AppearanceMode,
  BUILT_IN_THEMES,
  customProps,
} from "@/constants/theme-presets";
import { CustomTheme } from "@/constants/theme-presets";
import { parseThemeCSS } from "@/lib/css";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTheme() {
  const queryClient = useQueryClient();

  const { data: selectedTheme = "gruvbox" } = useQuery({
    queryKey: ["selectedTheme"],
    queryFn: () => "gruvbox", // fallback if nothing is persisted
  });

  const { data: appearanceMode = "system" as AppearanceMode } = useQuery({
    queryKey: ["appearanceMode"],
    queryFn: () => "system" as AppearanceMode, // fallback if nothing is persisted
  });

  const { data: customThemes = [] } = useQuery({
    queryKey: ["customThemes"],
    queryFn: () => [], // fallback if nothing is persisted
  });

  const getAllThemes = () => [...BUILT_IN_THEMES, ...customThemes];

  const setSelectedTheme = (theme: string) => {
    queryClient.setQueryData(["selectedTheme"], theme);
  };

  const setAppearanceMode = (mode: AppearanceMode) => {
    queryClient.setQueryData(["appearanceMode"], mode);
  };

  const addCustomTheme = (newTheme: CustomTheme) => {
    const current =
      queryClient.getQueryData<CustomTheme[]>(["customThemes"]) || [];
    queryClient.setQueryData(["customThemes"], [...current, newTheme]);
  };

  const removeCustomTheme = (id: string) => {
    const current =
      queryClient.getQueryData<CustomTheme[]>(["customThemes"]) || [];
    queryClient.setQueryData(
      ["customThemes"],
      current.filter((t) => t.id !== id),
    );

    // If the removed theme was selected, switch to gruvbox
    if (selectedTheme === id) {
      setSelectedTheme("gruvbox");
    }
  };

  const updateCustomTheme = (updatedTheme: CustomTheme) => {
    const current =
      queryClient.getQueryData<CustomTheme[]>(["customThemes"]) || [];
    queryClient.setQueryData(
      ["customThemes"],
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
