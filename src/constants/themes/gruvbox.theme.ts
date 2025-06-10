import { CustomTheme } from "@/types/theme";

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
