import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "@/config";
import App from "@/pages/newtab/App";
import "@pages/newtab/index.css";
import "@/tailwind.css";

const rootElement = document.getElementById("__root");
if (!rootElement) {
  throw new Error(
    "Root element not found. Check that your HTML file contains an element with id '__root'",
  );
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <App />
    </PersistQueryClientProvider>
  </StrictMode>,
);
