export type CustomTheme = {
  id: string;
  name: string;
  lightTheme: string;
  darkTheme: string;
  isBuiltIn?: boolean;
};

export type AppearanceMode = "light" | "dark" | "system";

export const gruvboxTheme: CustomTheme = {
  id: "gruvbox",
  name: "Gruvbox",
  isBuiltIn: true,
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

export const BUILT_IN_THEMES = [gruvboxTheme];

export const customProps = [
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
