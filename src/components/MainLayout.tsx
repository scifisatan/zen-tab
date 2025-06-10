import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const {
    appearanceMode,
    applyTheme,
    customThemes,
    getAllThemes,
    selectedTheme,
  } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const allThemes = getAllThemes();
    const theme = allThemes.find((t) => t.id === selectedTheme);

    if (!theme) {
      console.warn(`Theme with id "${selectedTheme}" not found`);
      return;
    }

    let isDark = false;
    let appliedMode = appearanceMode;

    if (appearanceMode === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      appliedMode = isDark ? "dark" : "light";
    } else {
      isDark = appearanceMode === "dark";
    }

    root.classList.add(appliedMode || "");

    applyTheme(theme, isDark);
  }, [selectedTheme, appearanceMode, customThemes]);

  useEffect(() => {
    if (appearanceMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const allThemes = getAllThemes();
      const theme = allThemes.find((t) => t.id === selectedTheme);
      if (!theme) {
        console.warn(`Theme with id "${selectedTheme}" not found`);
        return;
      }
      applyTheme(theme, e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [selectedTheme, appearanceMode, customThemes]);

  if (!selectedTheme) {
    return null;
  }

  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col overflow-clip p-6 font-sans">
      {children}
    </div>
  );
};
