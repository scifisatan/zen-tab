import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JiraInputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const JiraInputField: React.FC<JiraInputFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base font-semibold">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
