import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Palette, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { CustomThemeEditor } from "@/components/settings/general/custom-theme-editor";
import type { CustomTheme, AppearanceMode } from "@/context/ThemeContext";

const ThemeSettings: React.FC = () => {
  const {
    selectedTheme,
    setSelectedTheme,
    appearanceMode,
    setAppearanceMode,
    customThemes,
    addCustomTheme,
    removeCustomTheme,
    updateCustomTheme,
  } = useTheme();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<CustomTheme | undefined>();

  const handleCreateTheme = () => {
    setEditingTheme(undefined);
    setIsEditorOpen(true);
  };

  const handleEditTheme = (customTheme: CustomTheme) => {
    setEditingTheme(customTheme);
    setIsEditorOpen(true);
  };

  const handleSaveTheme = (newTheme: CustomTheme) => {
    if (editingTheme) {
      updateCustomTheme(newTheme);
    } else {
      addCustomTheme(newTheme);
    }
  };

  // Extract color values from CSS variables for preview
  const extractColorsFromTheme = (
    themeCSS: string,
    isDark: boolean = false,
  ) => {
    const colors: string[] = [];

    // Parse CSS content
    const parseCSS = (css: string, selector: string) => {
      const cleanCSS = css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ");
      const regex = new RegExp(
        `${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]+)\\}`,
        "i",
      );
      const match = cleanCSS.match(regex);
      return match ? match[1] : "";
    };

    // Extract from appropriate selector
    const selector = isDark ? ".dark" : ":root";
    const content = parseCSS(themeCSS, selector);

    const colorVars = [
      "--primary",
      "--secondary",
      "--accent",
      "--destructive",
      "--background",
      "--foreground",
    ];

    colorVars.forEach((varName) => {
      const regex = new RegExp(`${varName}\\s*:\\s*([^;]+);?`, "i");
      const match = content.match(regex);
      if (match) {
        const value = match[1].trim();
        colors.push(value);
      }
    });

    return colors.slice(0, 6);
  };

  const appearanceOptions = [
    {
      id: "light" as AppearanceMode,
      name: "Light",
      description: "Light appearance",
      icon: Sun,
    },
    {
      id: "dark" as AppearanceMode, 
      name: "Dark",
      description: "Dark appearance",
      icon: Moon,
    },
    {
      id: "system" as AppearanceMode,
      name: "System",
      description: "Follow system preference",
      icon: Monitor,
    },
  ];

  // Built-in themes
  const builtInThemes = [
    {
      id: "gruvbox",
      name: "Gruvbox",
      description: "Warm and retro color scheme",
    },
  ];

  // All available themes
  const allThemes = [...builtInThemes, ...customThemes];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Theme Settings</h2>
          <p className="text-muted-foreground">
            Choose your theme and appearance mode
          </p>
        </div>
        <Button onClick={handleCreateTheme} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Theme
        </Button>
      </div>

      {/* Appearance Mode Toggle */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Monitor className="h-5 w-5" />
          Appearance Mode
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {appearanceOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = appearanceMode === option.id;
            
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "ring-primary ring-2" : ""
                }`}
                onClick={() => setAppearanceMode(option.id)}
              >
                <CardContent className="flex flex-col items-center gap-2 p-4">
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <p className="font-medium">{option.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Palette className="h-5 w-5" />
          Theme Selection
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Built-in themes */}
          {builtInThemes.map((theme) => (
            <Card
              key={theme.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTheme === theme.id ? "ring-primary ring-2" : ""
              }`}
              onClick={() => setSelectedTheme(theme.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{theme.name}</CardTitle>
                  <Badge variant="secondary">Built-in</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {theme.description}
                </p>
                {/* Theme preview would go here */}
              </CardContent>
            </Card>
          ))}

          {/* Custom themes */}
          {customThemes.map((customTheme) => (
            <Card
              key={customTheme.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTheme === customTheme.id ? "ring-primary ring-2" : ""
              }`}
              onClick={() => setSelectedTheme(customTheme.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {customTheme.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Custom</Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTheme(customTheme);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCustomTheme(customTheme.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Light theme preview */}
                  <div className="flex items-center gap-2">
                    <Sun className="text-muted-foreground h-3 w-3" />
                    <div className="flex gap-1">
                      {extractColorsFromTheme(
                        customTheme.lightTheme,
                        false,
                      ).map((color, index) => (
                        <div
                          key={`light-${index}`}
                          className="border-border h-3 w-3 rounded-full border"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Dark theme preview */}
                  <div className="flex items-center gap-2">
                    <Moon className="text-muted-foreground h-3 w-3" />
                    <div className="flex gap-1">
                      {extractColorsFromTheme(
                        customTheme.darkTheme,
                        true,
                      ).map((color, index) => (
                        <div
                          key={`dark-${index}`}
                          className="border-border h-3 w-3 rounded-full border"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CustomThemeEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveTheme}
        editingTheme={editingTheme}
      />
    </div>
  );
};

export default ThemeSettings;