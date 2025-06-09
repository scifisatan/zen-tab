import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CustomTheme } from "@/context/ThemeContext";

interface CustomThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (theme: CustomTheme) => void;
  editingTheme?: CustomTheme;
}

const defaultTheme = `:root {
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
}

.dark {
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
}`;

export const CustomThemeEditor: React.FC<CustomThemeEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTheme,
}) => {
  const [themeName, setThemeName] = useState(editingTheme?.name || "");

  // Combine light and dark themes from editing theme, or use default
  const getInitialThemeCSS = () => {
    if (editingTheme) {
      return `${editingTheme.lightTheme}\n\n${editingTheme.darkTheme}`;
    }
    return defaultTheme;
  };

  const [themeCSS, setThemeCSS] = useState(getInitialThemeCSS());

  const handleSave = () => {
    if (!themeName.trim()) return;

    // Parse the CSS to extract light and dark themes
    const parseThemeCSS = (css: string) => {
      const cleanCSS = css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ");

      // Extract :root content
      const rootMatch = cleanCSS.match(/:root\s*\{([^}]+)\}/);
      const lightTheme = rootMatch ? `:root {${rootMatch[1]}}` : "";

      // Extract .dark content
      const darkMatch = cleanCSS.match(/\.dark\s*\{([^}]+)\}/);
      const darkTheme = darkMatch ? `.dark {${darkMatch[1]}}` : "";

      return { lightTheme, darkTheme };
    };

    const { lightTheme, darkTheme } = parseThemeCSS(themeCSS);

    const theme: CustomTheme = {
      id: editingTheme?.id || `custom_${Date.now()}`,
      name: themeName,
      lightTheme: lightTheme.trim(),
      darkTheme: darkTheme.trim(),
    };

    onSave(theme);
    onClose();
  };

  const handleReset = () => {
    setThemeName(editingTheme?.name || "");
    setThemeCSS(getInitialThemeCSS());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {editingTheme ? "Edit Custom Theme" : "Create Custom Theme"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="theme-name">Theme Name</Label>
            <Input
              id="theme-name"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              placeholder="Enter theme name (e.g., Custom Theme)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme-css">Complete Theme CSS</Label>
            <Textarea
              id="theme-css"
              value={themeCSS}
              onChange={(e) => setThemeCSS(e.target.value)}
              placeholder="Paste your complete CSS with both :root and .dark selectors..."
              className="h-96 font-mono text-sm"
            />
            <p className="text-muted-foreground text-xs">
              Paste complete CSS including both :root and .dark selectors with
              all variables
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!themeName.trim()}>
            {editingTheme ? "Update" : "Create"} Theme
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};