import { useState, useEffect } from "react";
import { useGeneralConfig } from "@/hooks/useGeneralConfig";
import { formatMessage as formatMsg, formatCurrentTime } from "@/lib/format";

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const { generalConfig } = useGeneralConfig();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      const hour = now.getHours();
      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  function formatMessage(currentTime: Date) {
    const result = formatMsg(currentTime, generalConfig);
    return result;
  }

  return { currentTime, greeting, formatMessage, formatCurrentTime };
};
