import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="border-gruvbox-gray/30 rounded-2xl border p-6 backdrop-blur-[10px]"
      style={{ backgroundColor: "rgba(40, 40, 40, 0.8)" }}
    >
      {children}
    </div>
  );
}
