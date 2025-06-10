import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className }) => (
  <section className={cn("space-y-4", className)}>{children}</section>
);

export const SectionHeader: React.FC<SectionProps> = ({
  children,
  className,
}) => <div className={cn("space-y-1", className)}>{children}</div>;

export const SectionContent: React.FC<SectionProps> = ({
  children,
  className,
}) => <div className={cn("space-y-4", className)}>{children}</div>;
