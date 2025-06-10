import { createContext, useEffect } from "react";
import {
  CustomTheme,
  AppearanceMode,
  gruvboxTheme,
} from "@/constants/theme-presets";
import { useTheme } from "@/hooks/useTheme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;

  appearanceMode: AppearanceMode;
  setAppearanceMode: (mode: AppearanceMode) => void;

  addCustomTheme: (theme: CustomTheme) => void;
  removeCustomTheme: (id: string) => void;
  updateCustomTheme: (theme: CustomTheme) => void;
  getAllThemes: () => CustomTheme[];

  customThemes: CustomTheme[];
};

export const ThemeProviderContext = createContext<ThemeProviderState>({
  selectedTheme: "gruvbox",
  setSelectedTheme: () => null,
  appearanceMode: "system" as AppearanceMode,
  setAppearanceMode: () => null,
  customThemes: [],

  addCustomTheme: () => null,
  removeCustomTheme: () => null,
  updateCustomTheme: () => null,
  getAllThemes: () => [],
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const {
    addCustomTheme,
    appearanceMode,
    applyTheme,
    customThemes,
    getAllThemes,
    removeCustomTheme,
    selectedTheme,
    setAppearanceMode,
    setSelectedTheme,
    updateCustomTheme,
  } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const allThemes = getAllThemes();
    const theme = allThemes.find((t) => t.id === selectedTheme) || gruvboxTheme;

    let isDark = false;
    let appliedMode = appearanceMode;

    if (appearanceMode === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      appliedMode = isDark ? "dark" : "light";
    } else {
      isDark = appearanceMode === "dark";
    }

    root.classList.add(appliedMode);

    applyTheme(theme, isDark);
  }, [selectedTheme, appearanceMode, customThemes]);

  useEffect(() => {
    if (appearanceMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const allThemes = getAllThemes();
      const theme =
        allThemes.find((t) => t.id === selectedTheme) || gruvboxTheme;
      applyTheme(theme, e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [selectedTheme, appearanceMode, customThemes]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        selectedTheme,
        setSelectedTheme,
        appearanceMode,
        setAppearanceMode,
        customThemes,
        getAllThemes,
        addCustomTheme,
        removeCustomTheme,
        updateCustomTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}
