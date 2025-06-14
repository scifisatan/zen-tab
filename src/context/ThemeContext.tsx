import { useTheme as useSimpleTheme } from "@/hooks/useTheme";
import { AppearanceMode } from "@/types/theme";
import { createContext, useContext, useEffect } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: AppearanceMode;
};

type ThemeProviderState = {
  theme: AppearanceMode;
  setTheme: (theme: AppearanceMode) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  const { appearanceMode, setAppearanceMode: updateTheme } = useSimpleTheme();

  // Use the theme from cache or default
  const currentTheme = appearanceMode || defaultTheme;

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: light)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(currentTheme);
  }, [currentTheme]);

  const value = {
    theme: currentTheme,
    setTheme: (newTheme: AppearanceMode) => {
      updateTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
