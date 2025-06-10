import { Save } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";

export const SaveButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}> = ({ onClick, disabled, children }) => {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="disabled:not-allowed disabled:opacity-50"
      >
        <Save className="mr-1 h-4 w-4" />
        {children}
      </Button>
    </div>
  );
};
