import React, { useState, useEffect } from "react";
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
import { CustomTheme } from "@/constants/theme-presets";
import { parseCSSForTheme } from "@/lib/css";

interface CustomThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (theme: CustomTheme) => void;
  editingTheme?: CustomTheme;
}

const defaultTheme = `:root {
  /* Light mode - Gruvbox Light */
  --background: #f9f5d7;
  --foreground: #3c3836;
  --card: #fbf1c7;
  --card-foreground: #3c3836;
  --popover: #fbf1c7;
  --popover-foreground: #3c3836;
  --primary: #af3a03;
  --primary-foreground: #f9f5d7;
  --secondary: #f2e5bc;
  --secondary-foreground: #3c3836;
  --muted: #f2e5bc;
  --muted-foreground: #665c54;
  --accent: #ebdbb2;
  --accent-foreground: #3c3836;
  --destructive: #cc241d;
  --destructive-foreground: #f9f5d7;
  --border: #d5c4a1;
  --input: #d5c4a1;
  --ring: #af3a03;
}

.dark {
  /* Dark mode - Gruvbox Dark */
  --background: #1d2021;
  --foreground: #ebdbb2;
  --card: #282828;
  --card-foreground: #ebdbb2;
  --popover: #32302f;
  --popover-foreground: #ebdbb2;
  --primary: #fabd2f;
  --primary-foreground: #1d2021;
  --secondary: #3c3836;
  --secondary-foreground: #ebdbb2;
  --muted: #3c3836;
  --muted-foreground: #a89984;
  --accent: #504945;
  --accent-foreground: #ebdbb2;
  --destructive: #fb4934;
  --destructive-foreground: #ebdbb2;
  --border: #504945;
  --input: #3c3836;
  --ring: #fabd2f;
}`;

export const CustomThemeEditor: React.FC<CustomThemeEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTheme,
}) => {
  const [themeName, setThemeName] = useState("");
  const [themeCSS, setThemeCSS] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editingTheme) {
        setThemeName(editingTheme.name);
        const combinedCSS = `${editingTheme.lightTheme}\n\n${editingTheme.darkTheme}`;
        setThemeCSS(combinedCSS);
      } else {
        setThemeName("");
        setThemeCSS(defaultTheme);
      }
    }
  }, [isOpen, editingTheme]);

  const handleSave = () => {
    if (!themeName.trim()) return;

    const { lightTheme, darkTheme } = parseCSSForTheme(themeCSS);

    const theme: CustomTheme = {
      id: editingTheme?.id || `custom_${Date.now()}`,
      name: themeName,
      lightTheme: lightTheme.trim(),
      darkTheme: darkTheme.trim(),
      isBuiltIn: false,
    };

    onSave(theme);
    onClose();
  };

  const handleReset = () => {
    if (editingTheme) {
      setThemeName(editingTheme.name);
      const combinedCSS = `${editingTheme.lightTheme}\n\n${editingTheme.darkTheme}`;
      setThemeCSS(combinedCSS);
    } else {
      setThemeName("");
      setThemeCSS(defaultTheme);
    }
  };

  const handleClose = () => {
    onClose();
    setThemeName("");
    setThemeCSS("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
            Reset
          </Button>
          <Button variant="outline" onClick={handleClose}>
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
