import React from "react";
import { Link } from "@/types";

interface AddLinkModalProps {
  showModal: boolean;
  linkName: string;
  linkUrl: string;
  editingLink?: Link | null;
  onLinkNameChange: (value: string) => void;
  onLinkUrlChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const AddLinkModal: React.FC<AddLinkModalProps> = ({
  showModal,
  linkName,
  linkUrl,
  editingLink,
  onLinkNameChange,
  onLinkUrlChange,
  onSubmit,
  onClose,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  if (!showModal) return null;

  const isEditing = !!editingLink;
  const modalTitle = isEditing ? "Edit Link" : "Add New Link";
  const submitButtonText = isEditing ? "Update Link" : "Add Link";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="border-gruvbox-bg4 bg-gruvbox-bg1 m-4 w-full max-w-md rounded-2xl border p-6 shadow-2xl">
          <h3 className="text-gruvbox-fg mb-6 text-xl font-semibold">
            {modalTitle}
          </h3>
          <div className="flex flex-col space-y-5">
            <div>
              <label className="text-gruvbox-fg2 mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                value={linkName}
                onChange={(e) => onLinkNameChange(e.target.value)}
                className="border-gruvbox-bg4 bg-gruvbox-bg2 text-gruvbox-fg placeholder-gruvbox-gray focus:border-gruvbox-blue focus:bg-gruvbox-bg3 focus:ring-gruvbox-blue/20 w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:outline-none"
                placeholder="Enter link name"
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <label className="text-gruvbox-fg2 mb-2 block text-sm font-medium">
                URL
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => onLinkUrlChange(e.target.value)}
                className="border-gruvbox-bg4 bg-gruvbox-bg2 text-gruvbox-fg placeholder-gruvbox-gray focus:border-gruvbox-blue focus:bg-gruvbox-bg3 focus:ring-gruvbox-blue/20 w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:outline-none"
                placeholder="https://example.com"
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={onSubmit}
                className="bg-gruvbox-blue text-gruvbox-bg0 hover:bg-gruvbox-aqua flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                disabled={!linkName.trim() || !linkUrl.trim()}
              >
                {submitButtonText}
              </button>
              <button
                onClick={onClose}
                className="border-gruvbox-bg4 text-gruvbox-fg hover:bg-gruvbox-bg3 hover:border-gruvbox-gray rounded-lg border bg-transparent px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
