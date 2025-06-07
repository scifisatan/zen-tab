import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto h-screen max-w-7xl p-6 font-mono">{children}</div>
  );
};
