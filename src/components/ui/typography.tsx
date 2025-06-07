import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

// Page Title - Largest heading
export const TypographyH1: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <h1
    className={cn("scroll-m-20 text-2xl font-bold tracking-tight", className)}
  >
    {children}
  </h1>
);

// Section Title - Major sections
export const TypographyH2: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <h2
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className,
    )}
  >
    {children}
  </h2>
);

// Subsection Title - Minor sections
export const TypographyH3: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <h3
    className={cn("scroll-m-20 text-lg font-medium tracking-tight", className)}
  >
    {children}
  </h3>
);

// Component/Field Title
export const TypographyH4: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <h4
    className={cn(
      "scroll-m-20 text-base font-medium tracking-tight",
      className,
    )}
  >
    {children}
  </h4>
);

// Body text
export const TypographyP: React.FC<TypographyProps> = ({
  children,
  className,
}) => <p className={cn("text-sm leading-6", className)}>{children}</p>;

// Muted text for descriptions
export const TypographyMuted: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <p className={cn("text-muted-foreground text-xs", className)}>{children}</p>
);

// Large text for emphasis
export const TypographyLarge: React.FC<TypographyProps> = ({
  children,
  className,
}) => <div className={cn("text-lg font-semibold", className)}>{children}</div>;

// Small text
export const TypographySmall: React.FC<TypographyProps> = ({
  children,
  className,
}) => (
  <small className={cn("text-xs leading-none font-medium", className)}>
    {children}
  </small>
);
