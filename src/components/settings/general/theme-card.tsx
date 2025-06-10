import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Sun, Moon } from "lucide-react";
import { CustomTheme } from "@/types/theme";
import { extractColorsFromTheme } from "@/lib/css";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface Props {
  theme: CustomTheme;
  handleEditTheme: (theme: CustomTheme) => void;
}

const ThemeCard = ({ handleEditTheme, theme }: Props) => {
  const {
    selectedTheme,
    setSelectedTheme,

    removeCustomTheme,
  } = useTheme();

  const isSelected = selectedTheme === theme.id;
  const isBuiltIn = theme.isBuiltIn;

  return (
    <Card
      key={theme.id}
      className={cn("cursor-pointer transition-all hover:shadow-md", {
        "ring-primary ring-2": isSelected,
      })}
      onClick={() => setSelectedTheme(theme.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{theme.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isBuiltIn ? "secondary" : "outline"}>
              {isBuiltIn ? "Built-in" : "Custom"}
            </Badge>
            {!isBuiltIn && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTheme(theme);
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
                    removeCustomTheme(theme.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Light theme preview */}
          <div className="flex items-center gap-2">
            <Sun className="text-muted-foreground h-3 w-3" />
            <div className="flex gap-1">
              {extractColorsFromTheme(theme.lightTheme, false).map(
                (color, index) => (
                  <div
                    key={`light-${index}`}
                    className="border-border h-3 w-3 rounded-full border"
                    style={{ background: color }}
                    title={color}
                  />
                ),
              )}
            </div>
          </div>
          {/* Dark theme preview */}
          <div className="flex items-center gap-2">
            <Moon className="text-muted-foreground h-3 w-3" />
            <div className="flex gap-1">
              {extractColorsFromTheme(theme.darkTheme, true).map(
                (color, index) => (
                  <div
                    key={`dark-${index}`}
                    className="border-border h-3 w-3 rounded-full border"
                    style={{ background: color }}
                    title={color}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCard;
