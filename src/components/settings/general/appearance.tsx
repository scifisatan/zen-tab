import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";

export const AppearanceSettings: React.FC<{}> = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full justify-between">
      <p className="my-auto ml-1 text-sm font-medium">Toggle theme</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-background/80 border-border/50 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl"
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
            {/* making first letter capital */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
