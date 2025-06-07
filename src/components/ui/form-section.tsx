import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  showSeparator?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  showSeparator = true,
}) => {
  return (
    <>
      <div className={cn("space-y-4", className)}>
        <div className="space-y-1">
          <h3 className="text-lg leading-none font-semibold tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        <div className="space-y-4">{children}</div>
      </div>
      {showSeparator && <Separator className="my-6" />}
    </>
  );
};

interface FormFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      {children}
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </div>
  );
};
