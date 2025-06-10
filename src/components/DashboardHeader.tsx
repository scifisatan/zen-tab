import { useState } from "react";
import { useTime } from "@/hooks/useTime";

export const Header = () => {
  const [showCurrentTime, setShowCurrentTime] = useState(true);
  const { greeting, formatCurrentTime, customMessage, currentTime } = useTime();

  const toggleShowCurentTime = () => {
    setShowCurrentTime(!showCurrentTime);
  };

  return (
    <>
      <div className="no-select mb-12 shrink-0 text-center">
        <h1 className="mb-2 text-5xl font-bold">{greeting}</h1>
        <div
          className="cursor-pointer text-xl opacity-70 transition-opacity select-none hover:opacity-100"
          onClick={toggleShowCurentTime}
        >
          {showCurrentTime ? formatCurrentTime(currentTime) : customMessage}
        </div>
      </div>
    </>
  );
};
