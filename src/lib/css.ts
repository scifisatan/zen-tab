export const parseThemeCSS = (css: string, isDark: boolean) => {
  const variables: { [key: string]: string } = {};

  // Remove comments, normalize whitespace
  const cleanCSS = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ");

  // Find the appropriate selector content
  let content = "";
  if (isDark) {
    // Look for .dark selector
    const darkMatch = cleanCSS.match(/\.dark\s*\{([^}]+)\}/);
    content = darkMatch ? darkMatch[1] : "";
  } else {
    // Look for :root selector
    const rootMatch = cleanCSS.match(/:root\s*\{([^}]+)\}/);
    content = rootMatch ? rootMatch[1] : "";
  }

  // If no selector found, treat the entire string as variable declarations
  if (!content && css.includes("--")) {
    content = css;
  }

  // Extract CSS variables
  const variableRegex = /--([\w-]+)\s*:\s*([^;]+);?/g;
  let match;

  while ((match = variableRegex.exec(content)) !== null) {
    const property = `--${match[1]}`;
    const value = match[2].trim();
    variables[property] = value;
  }

  return variables;
};

export const parseCSSForTheme = (css: string) => {
  const cleanCSS = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ");

  // Extract :root content
  const rootMatch = cleanCSS.match(/:root\s*\{([^}]+)\}/);
  const lightTheme = rootMatch ? `:root {${rootMatch[1]}}` : "";

  // Extract .dark content
  const darkMatch = cleanCSS.match(/\.dark\s*\{([^}]+)\}/);
  const darkTheme = darkMatch ? `.dark {${darkMatch[1]}}` : "";

  return { lightTheme, darkTheme };
};

export const extractColorsFromTheme = (
  themeCSS: string,
  isDark: boolean = false,
) => {
  const colors: string[] = [];

  // Parse CSS content
  const parseCSS = (css: string, selector: string) => {
    const cleanCSS = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ");
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
