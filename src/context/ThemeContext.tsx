import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

export type CustomTheme = {
  id: string;
  name: string;
  lightTheme: string;
  darkTheme: string;
};

export type AppearanceMode = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  defaultMode?: AppearanceMode;
};

type ThemeProviderState = {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  appearanceMode: AppearanceMode;
  setAppearanceMode: (mode: AppearanceMode) => void;
  customThemes: CustomTheme[];
  addCustomTheme: (theme: CustomTheme) => void;
  removeCustomTheme: (id: string) => void;
  updateCustomTheme: (theme: CustomTheme) => void;
  currentTheme: string; // The actual applied theme (light/dark)
};

const gruvboxTheme: CustomTheme = {
  id: "gruvbox",
  name: "Gruvbox",
  lightTheme: `:root {
    --background: oklch(0.98 0.01 85);
    --foreground: oklch(0.25 0.02 85);
    --card: oklch(0.96 0.02 85);
    --card-foreground: oklch(0.25 0.02 85);
    --popover: oklch(0.96 0.02 85);
    --popover-foreground: oklch(0.25 0.02 85);
    --primary: oklch(0.55 0.15 75);
    --primary-foreground: oklch(0.98 0.01 85);
    --secondary: oklch(0.92 0.02 85);
    --secondary-foreground: oklch(0.35 0.02 85);
    --muted: oklch(0.92 0.02 85);
    --muted-foreground: oklch(0.45 0.02 85);
    --accent: oklch(0.88 0.02 85);
    --accent-foreground: oklch(0.25 0.02 85);
    --destructive: oklch(0.55 0.15 25);
    --destructive-foreground: oklch(0.98 0.01 85);
    --border: oklch(0.85 0.02 85);
    --input: oklch(0.85 0.02 85);
    --ring: oklch(0.55 0.15 75);
  }`,
  darkTheme: `.dark {
    --background: oklch(0.15 0.02 85);
    --foreground: oklch(0.85 0.02 85);
    --card: oklch(0.18 0.02 85);
    --card-foreground: oklch(0.85 0.02 85);
    --popover: oklch(0.18 0.02 85);
    --popover-foreground: oklch(0.85 0.02 85);
    --primary: oklch(0.65 0.15 75);
    --primary-foreground: oklch(0.15 0.02 85);
    --secondary: oklch(0.25 0.02 85);
    --secondary-foreground: oklch(0.75 0.02 85);
    --muted: oklch(0.25 0.02 85);
    --muted-foreground: oklch(0.55 0.02 85);
    --accent: oklch(0.30 0.02 85);
    --accent-foreground: oklch(0.85 0.02 85);
    --destructive: oklch(0.65 0.15 25);
    --destructive-foreground: oklch(0.15 0.02 85);
    --border: oklch(0.35 0.02 85);
    --input: oklch(0.25 0.02 85);
    --ring: oklch(0.65 0.15 75);
  }`,
};

// Query keys
const SELECTED_THEME_KEY = "selectedTheme";
const APPEARANCE_MODE_KEY = "appearanceMode";
const CUSTOM_THEMES_KEY = "customThemes";

// Default values
const DEFAULT_SELECTED_THEME = "gruvbox";
const DEFAULT_APPEARANCE_MODE: AppearanceMode = "system";
const DEFAULT_CUSTOM_THEMES: CustomTheme[] = [];

const initialState: ThemeProviderState = {
  selectedTheme: DEFAULT_SELECTED_THEME,
  setSelectedTheme: () => null,
  appearanceMode: DEFAULT_APPEARANCE_MODE,
  setAppearanceMode: () => null,
  customThemes: DEFAULT_CUSTOM_THEMES,
  addCustomTheme: () => null,
  removeCustomTheme: () => null,
  updateCustomTheme: () => null,
  currentTheme: "system",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_SELECTED_THEME,
  defaultMode = DEFAULT_APPEARANCE_MODE,
  ...props
}: ThemeProviderProps) {
  const queryClient = useQueryClient();
  const [currentTheme, setCurrentTheme] = useState<string>("system");

  // Selected theme query
  const { data: selectedTheme = defaultTheme } = useQuery({
    queryKey: [SELECTED_THEME_KEY],
    queryFn: () => defaultTheme,
  });

  // Appearance mode query
  const { data: appearanceMode = defaultMode } = useQuery({
    queryKey: [APPEARANCE_MODE_KEY],
    queryFn: () => defaultMode,
  });

  // Custom themes query
  const { data: customThemes = DEFAULT_CUSTOM_THEMES } = useQuery({
    queryKey: [CUSTOM_THEMES_KEY],
    queryFn: () => DEFAULT_CUSTOM_THEMES,
  });

  // Get all available themes (built-in + custom)
  const allThemes = [gruvboxTheme, ...customThemes];

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

    // Reset custom styles first
    const customProps = [
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground",
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
      "--muted",
      "--muted-foreground",
      "--accent",
      "--accent-foreground",
      "--destructive",
      "--destructive-foreground",
      "--border",
      "--input",
      "--ring",
      "--chart-1",
      "--chart-2",
      "--chart-3",
      "--chart-4",
      "--chart-5",
      "--sidebar",
      "--sidebar-foreground",
      "--sidebar-primary",
      "--sidebar-primary-foreground",
      "--sidebar-accent",
      "--sidebar-accent-foreground",
      "--sidebar-border",
      "--sidebar-ring",
      "--font-sans",
      "--font-serif",
      "--font-mono",
      "--radius",
      "--shadow-2xs",
      "--shadow-xs",
      "--shadow-sm",
      "--shadow",
      "--shadow-md",
      "--shadow-lg",
      "--shadow-xl",
      "--shadow-2xl",
    ];

    customProps.forEach((prop) => {
      root.style.removeProperty(prop);
    });

    // Apply the appropriate theme variant
    const themeCSS = isDark ? theme.darkTheme : theme.lightTheme;

    // Parse CSS and extract variables
    const parseThemeCSS = (css: string) => {
      const variables: { [key: string]: string } = {};

      // Remove comments, normalize whitespace
      const cleanCSS = css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ");

      // Find the appropriate selector content
      let content = "";
      if (isDark) {
        // Look for .dark selector
        const darkMatch = cleanCSS.match(/\.dark\s*\{([^}]+)\}/);
        content = darkMatch ? darkMatch[1] : "";
      } else {
        // Look for :root selector
        const rootMatch = cleanCSS.match(/:root\s*\{([^}]+)\}/);
        content = rootMatch ? rootMatch[1] : "";
      }

      // If no selector found, treat the entire string as variable declarations
      if (!content && css.includes("--")) {
        content = css;
      }

      // Extract CSS variables
      const variableRegex = /--([\w-]+)\s*:\s*([^;]+);?/g;
      let match;

      while ((match = variableRegex.exec(content)) !== null) {
        const property = `--${match[1]}`;
        const value = match[2].trim();
        variables[property] = value;
      }

      return variables;
    };

    const variables = parseThemeCSS(themeCSS);

    // Apply extracted variables
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    root.classList.remove("light", "dark");

    // Find the selected theme
    const theme = allThemes.find((t) => t.id === selectedTheme) || gruvboxTheme;

    let isDark = false;
    let appliedMode = appearanceMode;

    if (appearanceMode === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      appliedMode = isDark ? "dark" : "light";
    } else {
      isDark = appearanceMode === "dark";
    }

    // Set the current theme for state tracking
    setCurrentTheme(appliedMode);

    // Add the appropriate class
    root.classList.add(appliedMode);

    // Apply the theme
    applyTheme(theme, isDark);
  }, [selectedTheme, appearanceMode, customThemes]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (appearanceMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const theme =
        allThemes.find((t) => t.id === selectedTheme) || gruvboxTheme;
      applyTheme(theme, e.matches);
      setCurrentTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [selectedTheme, appearanceMode, customThemes]);

  const value = {
    selectedTheme,
    setSelectedTheme,
    appearanceMode,
    setAppearanceMode,
    customThemes,
    addCustomTheme,
    removeCustomTheme,
    updateCustomTheme,
    currentTheme,
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
