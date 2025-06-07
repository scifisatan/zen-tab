import { JiraTask, JiraConfig } from "@/types";

console.log("background script loaded");

import { getMyJiraTasks } from "@//api";
import { readStorage } from "@/hooks/useStorage";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getJiraTasks") {
    readStorage<JiraConfig>("jiraConfig", "sync")
      .then((config) => {
        if (!config || !config.apiToken || !config.domain || !config.email) {
          throw new Error(
            "Jira configuration not found. Please configure your settings in the extension popup.",
          );
        }
        return getMyJiraTasks(config);
      })
      .then((tasks: JiraTask[]) => {
        sendResponse({ success: true, tasks: tasks });
      })
      .catch((err: Error) => {
        console.error("Failed to fetch tasks:", err);
        sendResponse({ success: false, error: err.message });
      });

    return true;
  }
});
