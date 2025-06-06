import { ReactNode } from "react";

export default function BoardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-between">{children}</div>
  );
}
