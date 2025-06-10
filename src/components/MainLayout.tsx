import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col overflow-clip p-6 font-sans">
      {children}
    </div>
  );
};
