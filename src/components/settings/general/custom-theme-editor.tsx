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
import { DialogDescription } from "@radix-ui/react-dialog";

interface CustomThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (theme: CustomTheme) => void;
  editingTheme?: CustomTheme;
}

const defaultTheme = `:root {
  /* Light mode - Gruvbox Light */
  /* css-variables here.... */
}

.dark {
  /* Dark mode - Gruvbox Dark */
 /* css-variables here.... */
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
          <DialogDescription>
            <p className="text-muted-foreground text-xs">
              Paste complete CSS from{" "}
              <span>
                {" "}
                <a
                  className="underline underline-offset-2"
                  href="https://tweakcn.com"
                >
                  tweakcn.com
                </a>{" "}
              </span>{" "}
              here
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
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
