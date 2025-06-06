import React from "react";

interface HeaderProps {
  greeting: string;
  currentTime: Date;
  formatTime: (date: Date) => string;
}

export const Header: React.FC<HeaderProps> = ({
  greeting,
  currentTime,
  formatTime,
}) => {
  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="text-gruvbox-fg mb-2 text-5xl font-medium">
          {greeting}
        </h1>
        <p className="mb-4 text-2xl opacity-80">Ready to be productive?</p>
        <div className="text-xl opacity-70">{formatTime(currentTime)}</div>
      </div>
    </>
  );
};
