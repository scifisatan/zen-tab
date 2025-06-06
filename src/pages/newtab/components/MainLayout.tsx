import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="bg-gruvbox-bg0 text-gruvbox-fg min-h-screen p-6 font-mono"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace, system-ui",
      }}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
};
