import React from "react";
import { Label } from "@/components/ui/label";
import { TypographyMuted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  description,
  className,
  required = false,
}) => (
  <div className={cn("space-y-2", className)}>
    {label && (
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
    )}
    {children}
    {description && <TypographyMuted>{description}</TypographyMuted>}
  </div>
);

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
}) => (
  <div className={cn("space-y-4", className)}>
    <div className="space-y-1">
      <h4 className="text-base font-medium">{title}</h4>
      {description && <TypographyMuted>{description}</TypographyMuted>}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);
