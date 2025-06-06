export default function AddLink({
  clickHandler,
}: {
  clickHandler: () => void;
}) {
  return (
    <button
      className="bg-gruvbox-blue text-gruvbox-bg1 b-0 hover:bg-gruvbox-aqua cursor-pointer rounded-lg px-3 py-2 text-xl font-medium whitespace-nowrap transition-all duration-200 ease-in-out hover:scale-105"
      onClick={clickHandler}
    >
      + Add
    </button>
  );
}
