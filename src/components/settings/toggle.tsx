import { Settings, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

export function SettingsDialogToggle({
  openSettingsDialog,
  openImportDialog,
}: {
  openSettingsDialog: Dispatch<SetStateAction<boolean>>;
  openImportDialog: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed right-4 bottom-4">
      <Button
        className="bg-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg4 flex h-12 w-12 items-center justify-center rounded-full p-0"
        onClick={() => openSettingsDialog(true)}
      >
        <Settings className="h-6 w-6" />
      </Button>

      <Button
        className="bg-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg4 flex h-12 w-12 items-center justify-center rounded-full p-0"
        onClick={() => openImportDialog(true)}
      >
        <Import className="h-6 w-6" />
      </Button>
    </div>
  );
}
