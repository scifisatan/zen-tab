import { CustomTheme } from "@/types/theme";

export const doom64Theme: CustomTheme = {
  id: "doom-64",
  name: "Doom 64",
  isBuiltIn: true,
  lightTheme: `:root {
  --background: oklch(0.8452 0 0);
  --foreground: oklch(0.2393 0 0);
  --card: oklch(0.7572 0 0);
  --card-foreground: oklch(0.2393 0 0);
  --popover: oklch(0.7572 0 0);
  --popover-foreground: oklch(0.2393 0 0);
  --primary: oklch(0.5016 0.1887 27.4816);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.4955 0.0896 126.1858);
  --secondary-foreground: oklch(1.0000 0 0);
  --muted: oklch(0.7826 0 0);
  --muted-foreground: oklch(0.4091 0 0);
  --accent: oklch(0.5880 0.0993 245.7394);
  --accent-foreground: oklch(1.0000 0 0);
  --destructive: oklch(0.7076 0.1975 46.4558);
  --destructive-foreground: oklch(0 0 0);
  --border: oklch(0.4313 0 0);
  --input: oklch(0.4313 0 0);
  --ring: oklch(0.5016 0.1887 27.4816);
  --chart-1: oklch(0.5016 0.1887 27.4816);
  --chart-2: oklch(0.4955 0.0896 126.1858);
  --chart-3: oklch(0.5880 0.0993 245.7394);
  --chart-4: oklch(0.7076 0.1975 46.4558);
  --chart-5: oklch(0.5656 0.0431 40.4319);
  --sidebar: oklch(0.7572 0 0);
  --sidebar-foreground: oklch(0.2393 0 0);
  --sidebar-primary: oklch(0.5016 0.1887 27.4816);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.5880 0.0993 245.7394);
  --sidebar-accent-foreground: oklch(1.0000 0 0);
  --sidebar-border: oklch(0.4313 0 0);
  --sidebar-ring: oklch(0.5016 0.1887 27.4816);
  --font-sans: "Oxanium", sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: "Source Code Pro", monospace;
  --radius: 0px;
  --shadow-2xs: 0px 2px 4px 0px hsl(0 0% 0% / 0.20);
  --shadow-xs: 0px 2px 4px 0px hsl(0 0% 0% / 0.20);
  --shadow-sm: 0px 2px 4px 0px hsl(0 0% 0% / 0.40), 0px 1px 2px -1px hsl(0 0% 0% / 0.40);
  --shadow: 0px 2px 4px 0px hsl(0 0% 0% / 0.40), 0px 1px 2px -1px hsl(0 0% 0% / 0.40);
  --shadow-md: 0px 2px 4px 0px hsl(0 0% 0% / 0.40), 0px 2px 4px -1px hsl(0 0% 0% / 0.40);
  --shadow-lg: 0px 2px 4px 0px hsl(0 0% 0% / 0.40), 0px 4px 6px -1px hsl(0 0% 0% / 0.40);
  --shadow-xl: 0px 2px 4px 0px hsl(0 0% 0% / 0.40), 0px 8px 10px -1px hsl(0 0% 0% / 0.40);
  --shadow-2xl: 0px 2px 4px 0px hsl(0 0% 0% / 1.00);
}`,
  darkTheme: `.dark{
  --background: oklch(0.2178 0 0);
  --foreground: oklch(0.9067 0 0);
  --card: oklch(0.2850 0 0);
  --card-foreground: oklch(0.9067 0 0);
  --popover: oklch(0.2850 0 0);
  --popover-foreground: oklch(0.9067 0 0);
  --primary: oklch(0.6083 0.2090 27.0276);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.6423 0.1467 133.0145);
  --secondary-foreground: oklch(0 0 0);
  --muted: oklch(0.2645 0 0);
  --muted-foreground: oklch(0.7058 0 0);
  --accent: oklch(0.7482 0.1235 244.7492);
  --accent-foreground: oklch(0 0 0);
  --destructive: oklch(0.7839 0.1719 68.0943);
  --destructive-foreground: oklch(0 0 0);
  --border: oklch(0.4091 0 0);
  --input: oklch(0.4091 0 0);
  --ring: oklch(0.6083 0.2090 27.0276);
  --chart-1: oklch(0.6083 0.2090 27.0276);
  --chart-2: oklch(0.6423 0.1467 133.0145);
  --chart-3: oklch(0.7482 0.1235 244.7492);
  --chart-4: oklch(0.7839 0.1719 68.0943);
  --chart-5: oklch(0.6471 0.0334 40.7963);
  --sidebar: oklch(0.1913 0 0);
  --sidebar-foreground: oklch(0.9067 0 0);
  --sidebar-primary: oklch(0.6083 0.2090 27.0276);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.7482 0.1235 244.7492);
  --sidebar-accent-foreground: oklch(0 0 0);
  --sidebar-border: oklch(0.4091 0 0);
  --sidebar-ring: oklch(0.6083 0.2090 27.0276);
  --font-sans: "Oxanium", sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: "Source Code Pro", monospace;
  --radius: 0px;
  --shadow-2xs: 0px 2px 5px 0px hsl(0 0% 0% / 0.30);
  --shadow-xs: 0px 2px 5px 0px hsl(0 0% 0% / 0.30);
  --shadow-sm: 0px 2px 5px 0px hsl(0 0% 0% / 0.60), 0px 1px 2px -1px hsl(0 0% 0% / 0.60);
  --shadow: 0px 2px 5px 0px hsl(0 0% 0% / 0.60), 0px 1px 2px -1px hsl(0 0% 0% / 0.60);
  --shadow-md: 0px 2px 5px 0px hsl(0 0% 0% / 0.60), 0px 2px 4px -1px hsl(0 0% 0% / 0.60);
  --shadow-lg: 0px 2px 5px 0px hsl(0 0% 0% / 0.60), 0px 4px 6px -1px hsl(0 0% 0% / 0.60);
  --shadow-xl: 0px 2px 5px 0px hsl(0 0% 0% / 0.60), 0px 8px 10px -1px hsl(0 0% 0% / 0.60);
  --shadow-2xl: 0px 2px 5px 0px hsl(0 0% 0% / 1.50);
}`,
};
