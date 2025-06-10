import { CustomTheme } from "@/types/theme";

export const gruvboxTheme: CustomTheme = {
  id: "gruvbox",
  name: "Gruvbox",
  isBuiltIn: true,
  lightTheme: `:root {
   --background: oklch(0.9655 0.0394 100.8622);
  --foreground: oklch(0.3441 0.0066 48.5229);
  --card: oklch(0.9555 0.0555 96.1549);
  --card-foreground: oklch(0.3441 0.0066 48.5229);
  --popover: oklch(0.9555 0.0555 96.1549);
  --popover-foreground: oklch(0.3441 0.0066 48.5229);
  --primary: oklch(0.5126 0.1616 39.2968);
  --primary-foreground: oklch(0.9655 0.0394 100.8622);
  --secondary: oklch(0.9220 0.0553 92.5258);
  --secondary-foreground: oklch(0.3441 0.0066 48.5229);
  --muted: oklch(0.9220 0.0553 92.5258);
  --muted-foreground: oklch(0.4818 0.0181 61.0421);
  --accent: oklch(0.8941 0.0566 89.2405);
  --accent-foreground: oklch(0.3441 0.0066 48.5229);
  --destructive: oklch(0.5458 0.2030 28.6624);
  --destructive-foreground: oklch(0.9655 0.0394 100.8622);
  --border: oklch(0.8255 0.0507 85.1158);
  --input: oklch(0.8255 0.0507 85.1158);
  --ring: oklch(0.5126 0.1616 39.2968);
  --chart-1: oklch(0.6927 0.0420 169.7681);
  --chart-2: oklch(0.7652 0.1581 110.8346);
  --chart-3: oklch(0.8325 0.1595 82.9866);
  --chart-4: oklch(0.7311 0.1820 51.6932);
  --chart-5: oklch(0.7054 0.0976 2.1895);
  --sidebar: oklch(0.9220 0.0553 92.5258);
  --sidebar-foreground: oklch(0.3441 0.0066 48.5229);
  --sidebar-primary: oklch(0.5126 0.1616 39.2968);
  --sidebar-primary-foreground: oklch(0.9655 0.0394 100.8622);
  --sidebar-accent: oklch(0.8941 0.0566 89.2405);
  --sidebar-accent-foreground: oklch(0.3441 0.0066 48.5229);
  --sidebar-border: oklch(0.8255 0.0507 85.1158);
  --sidebar-ring: oklch(0.5126 0.1616 39.2968);
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  }`,
  darkTheme: `.dark {
  --background: oklch(0.2408 0.0049 219.6723);
  --foreground: oklch(0.8941 0.0566 89.2405);
  --card: oklch(0.2768 0 0);
  --card-foreground: oklch(0.8941 0.0566 89.2405);
  --popover: oklch(0.3109 0.0034 48.6190);
  --popover-foreground: oklch(0.8941 0.0566 89.2405);
  --primary: oklch(0.8325 0.1595 82.9866);
  --primary-foreground: oklch(0.2408 0.0049 219.6723);
  --secondary: oklch(0.3441 0.0066 48.5229);
  --secondary-foreground: oklch(0.8941 0.0566 89.2405);
  --muted: oklch(0.3441 0.0066 48.5229);
  --muted-foreground: oklch(0.6903 0.0346 76.3067);
  --accent: oklch(0.4110 0.0115 51.8658);
  --accent-foreground: oklch(0.8941 0.0566 89.2405);
  --destructive: oklch(0.6597 0.2175 30.3917);
  --destructive-foreground: oklch(0.8941 0.0566 89.2405);
  --border: oklch(0.4110 0.0115 51.8658);
  --input: oklch(0.3441 0.0066 48.5229);
  --ring: oklch(0.8325 0.1595 82.9866);
  --chart-1: oklch(0.6927 0.0420 169.7681);
  --chart-2: oklch(0.7652 0.1581 110.8346);
  --chart-3: oklch(0.8325 0.1595 82.9866);
  --chart-4: oklch(0.7311 0.1820 51.6932);
  --chart-5: oklch(0.7054 0.0976 2.1895);
  --sidebar: oklch(0.2768 0 0);
  --sidebar-foreground: oklch(0.8941 0.0566 89.2405);
  --sidebar-primary: oklch(0.8325 0.1595 82.9866);
  --sidebar-primary-foreground: oklch(0.2408 0.0049 219.6723);
  --sidebar-accent: oklch(0.3441 0.0066 48.5229);
  --sidebar-accent-foreground: oklch(0.8941 0.0566 89.2405);
  --sidebar-border: oklch(0.4110 0.0115 51.8658);
  --sidebar-ring: oklch(0.6192 0.0286 67.2575);
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  }`,
};
