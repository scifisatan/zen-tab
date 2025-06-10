import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Palette, Sun, Moon, Monitor } from "lucide-react";
import { CustomThemeEditor } from "@/components/settings/general/custom-theme-editor";
import { CustomTheme, AppearanceMode } from "@/constants/theme-presets";
import { useTheme } from "@/hooks/useTheme";
import ThemeCard from "./general/theme-card";

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

const ThemeSettings: React.FC = () => {
  const {
    appearanceMode,
    setAppearanceMode,

    addCustomTheme,
    updateCustomTheme,
    getAllThemes,
  } = useTheme();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<CustomTheme | undefined>();

  const handleCreateTheme = () => {
    setEditingTheme(undefined);
    setIsEditorOpen(true);
  };

  const handleEditTheme = (theme: CustomTheme) => {
    setEditingTheme(theme);
    setIsEditorOpen(true);
  };

  const handleSaveTheme = (newTheme: CustomTheme) => {
    if (editingTheme) {
      updateCustomTheme(newTheme);
    } else {
      addCustomTheme(newTheme);
    }
  };

  const allThemes = getAllThemes();

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
                  <Icon className="h-8 w-8" />
                  <div className="text-center">
                    <p className="text-lg font-medium">{option.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Palette className="h-5 w-5" />
          Theme Selection
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {allThemes.map((theme) => (
            <ThemeCard handleEditTheme={handleEditTheme} theme={theme} />
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
