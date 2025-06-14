export function BoardTitle({ title }: { title: string }) {
  return (
    <div className="align-center m-0 flex gap-3 text-2xl font-bold">
      {title}
    </div>
  );
}
