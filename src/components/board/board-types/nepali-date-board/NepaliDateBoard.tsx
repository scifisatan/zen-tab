import { useState, useEffect } from "react";
import NepaliDate from "nepali-datetime";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const NepaliDateBoard = () => {
  const [nepaliDate, setNepaliDate] = useState<any>(null);
  const [isHorizontal, setIsHorizontal] = useState(true);

  // Nepali months in Devanagari
  const nepaliMonths = [
    "बैशाख",
    "जेठ",
    "आषाढ",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुन",
    "चैत्र",
  ];

  // Nepali weekdays in Devanagari
  const nepaliWeekdays = [
    "आइतबार",
    "सोमबार",
    "मंगलबार",
    "बुधबार",
    "बिहिबार",
    "शुक्रबार",
    "शनिबार",
  ];

  useEffect(() => {
    const updateDate = () => {
      const now = new NepaliDate();
      setNepaliDate({
        year: now.getYear(),
        month: now.getMonth() + 1, // NepaliDate months are 0-indexed
        day: now.getDate(),
        weekday: now.getDay(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        formattedDay: now.formatNepali("DD"),
        formattedMonth: nepaliMonths[now.getMonth()],
        formattedYear: now.formatNepali("YYYY"),
        formattedTime: now.formatNepali("HH:mm"),
      });
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [nepaliMonths]);

  useEffect(() => {
    const handleResize = () => {
      const element = document.getElementById("nepali-widget");
      if (element) {
        const { width, height } = element.getBoundingClientRect();
        setIsHorizontal(width > height * 1.5); // Use horizontal layout if width is 1.5x height
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!nepaliDate) {
    return (
      <Card className="h-full w-full">
        <CardContent className="flex h-full items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </CardContent>
      </Card>
    );
  }

  const renderHorizontalLayout = () => (
    <div className="flex h-full items-center justify-center p-6">
      {/* Large date on the left */}
      <div className="text-primary flex-shrink-0 text-6xl font-bold">
        {nepaliDate.formattedDay}
      </div>

      {/* Month, year, day info on the right */}
      <div className="ml-8 flex flex-col justify-center space-y-3">
        <div className="text-foreground text-xl font-semibold">
          {nepaliDate.formattedMonth} {nepaliDate.formattedYear}
        </div>
        <div className="text-muted-foreground text-base">
          {nepaliWeekdays[nepaliDate.weekday]}
        </div>
      </div>
    </div>
  );

  const renderSquareLayout = () => (
    <div className="flex h-full flex-col justify-center p-4 text-center">
      {/* Date in center */}
      <div className="text-primary mb-4 text-5xl font-bold">
        {nepaliDate.formattedDay}
      </div>

      {/* Month and year below */}
      <div className="flex flex-col justify-center">
        <div className="text-foreground text-xl font-semibold">
          {nepaliDate.formattedMonth} {nepaliDate.formattedYear}
        </div>
      </div>
    </div>
  );

  return (
    <Card id="nepali-widget" className="h-full w-full overflow-hidden py-0">
      <CardContent className="h-full p-0">
        {isHorizontal ? renderHorizontalLayout() : renderSquareLayout()}
      </CardContent>
    </Card>
  );
};
