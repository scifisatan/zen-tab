import { ReactNode } from "react";

export default function BoardTitle({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="align-center text-gruvbox-fg m-0 flex gap-3 text-2xl font-bold">
      <div className="item-center flex flex-col justify-center">{icon}</div>
      {title}
    </div>
  );
}
