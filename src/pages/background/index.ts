import { JiraConfig } from "@/types";

import { getMyJiraTasks } from "@/api";
import { readStorage } from "@/hooks/useStorage";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Debug endpoint to check storage
  if (request.action === "debugStorage") {
    (async () => {
      try {
        const allItems = await chrome.storage.local.get(null);
        sendResponse({ success: true, storage: allItems });
      } catch (err: any) {
        console.error("Debug: Storage error:", err);
        sendResponse({ success: false, error: err.message });
      }
    })();
    return true;
  }

  if (request.action === "getJiraTasks") {
    // Handle async operation properly
    (async () => {
      try {
        // First let's check if storage is available
        if (!chrome.storage.local) {
          throw new Error("Chrome storage API not available");
        }

        // Check if the Jira config key actually exists in storage
        const config = await readStorage<JiraConfig>("zen_tab_jira_config");

        if (!config) {
          throw new Error("Jira isn't configured yet. Please set up your Jira configuration first.");
        }

        const tasks = await getMyJiraTasks(config, request.jqlQuery || "");
        sendResponse({ success: true, tasks: tasks });
      } catch (err: any) {
        sendResponse({ success: false, error: err.message });
      }
    })();

    return true; // Keep the message channel open for async response
  }
});
