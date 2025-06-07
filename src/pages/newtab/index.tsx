import { createRoot } from "react-dom/client";
import App from "@/pages/newtab/App";
import "@pages/newtab/index.css";
import "@/tailwind.css";

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Newtab root element");
  const root = createRoot(rootContainer);
  root.render(<App />);
}

init();
