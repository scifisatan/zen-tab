import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

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
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Save className="mr-2 h-4 w-4" />
        {children}
      </Button>
    </div>
  );
};
