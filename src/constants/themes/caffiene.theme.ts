import { CustomTheme } from "@/types/theme";

export const caffieneTheme: CustomTheme = {
  id: "caffiene",
  name: "Caffiene",
  isBuiltIn: true,
  lightTheme: `:root {
  --background: oklch(0.9821 0 0);
  --foreground: oklch(0.2435 0 0);
  --card: oklch(0.9911 0 0);
  --card-foreground: oklch(0.2435 0 0);
  --popover: oklch(0.9911 0 0);
  --popover-foreground: oklch(0.2435 0 0);
  --primary: oklch(0.4341 0.0392 41.9938);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.9200 0.0651 74.3695);
  --secondary-foreground: oklch(0.3499 0.0685 40.8288);
  --muted: oklch(0.9521 0 0);
  --muted-foreground: oklch(0.5032 0 0);
  --accent: oklch(0.9310 0 0);
  --accent-foreground: oklch(0.2435 0 0);
  --destructive: oklch(0.6271 0.1936 33.3390);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.8822 0 0);
  --input: oklch(0.8822 0 0);
  --ring: oklch(0.4341 0.0392 41.9938);
  --chart-1: oklch(0.4341 0.0392 41.9938);
  --chart-2: oklch(0.9200 0.0651 74.3695);
  --chart-3: oklch(0.9310 0 0);
  --chart-4: oklch(0.9367 0.0523 75.5009);
  --chart-5: oklch(0.4338 0.0437 41.6746);
  --sidebar: oklch(0.9881 0 0);
  --sidebar-foreground: oklch(0.2645 0 0);
  --sidebar-primary: oklch(0.3250 0 0);
  --sidebar-primary-foreground: oklch(0.9881 0 0);
  --sidebar-accent: oklch(0.9761 0 0);
  --sidebar-accent-foreground: oklch(0.3250 0 0);
  --sidebar-border: oklch(0.9401 0 0);
  --sidebar-ring: oklch(0.7731 0 0);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.5rem;
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
  --background: oklch(0.1776 0 0);
  --foreground: oklch(0.9491 0 0);
  --card: oklch(0.2134 0 0);
  --card-foreground: oklch(0.9491 0 0);
  --popover: oklch(0.2134 0 0);
  --popover-foreground: oklch(0.9491 0 0);
  --primary: oklch(0.9247 0.0524 66.1732);
  --primary-foreground: oklch(0.2029 0.0240 200.1962);
  --secondary: oklch(0.3163 0.0190 63.6992);
  --secondary-foreground: oklch(0.9247 0.0524 66.1732);
  --muted: oklch(0.2520 0 0);
  --muted-foreground: oklch(0.7699 0 0);
  --accent: oklch(0.2850 0 0);
  --accent-foreground: oklch(0.9491 0 0);
  --destructive: oklch(0.6271 0.1936 33.3390);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.2351 0.0115 91.7467);
  --input: oklch(0.4017 0 0);
  --ring: oklch(0.9247 0.0524 66.1732);
  --chart-1: oklch(0.9247 0.0524 66.1732);
  --chart-2: oklch(0.3163 0.0190 63.6992);
  --chart-3: oklch(0.2850 0 0);
  --chart-4: oklch(0.3481 0.0219 67.0001);
  --chart-5: oklch(0.9245 0.0533 67.0855);
  --sidebar: oklch(0.2103 0.0059 285.8852);
  --sidebar-foreground: oklch(0.9674 0.0013 286.3752);
  --sidebar-primary: oklch(0.4882 0.2172 264.3763);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.2739 0.0055 286.0326);
  --sidebar-accent-foreground: oklch(0.9674 0.0013 286.3752);
  --sidebar-border: oklch(0.2739 0.0055 286.0326);
  --sidebar-ring: oklch(0.8711 0.0055 286.2860);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.5rem;
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
