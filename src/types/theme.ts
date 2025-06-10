export type CustomTheme = {
  id: string;
  name: string;
  lightTheme: string;
  darkTheme: string;
  isBuiltIn?: boolean;
};

export type AppearanceMode = "light" | "dark" | "system";
