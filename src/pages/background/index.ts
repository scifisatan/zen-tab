<<<<<<< Updated upstream
import { JiraConfig } from "@/types";

=======
>>>>>>> Stashed changes
import { getMyJiraTasks } from "@/api";
import { asyncStorage } from "@/services/storage/async-storage";
import { defaultJiraConfig } from "@/config/jira.config";
import { JiraConfig } from "@/types/jira";

// Function to get Jira config from TanStack Query persistence
const getJiraConfigFromCache = async (): Promise<JiraConfig> => {
  try {
    // TanStack Query stores all cache data under the main cache key
    const cacheData = await asyncStorage.getItem("TANSTACK_QUERY_CACHE");

    if (cacheData) {
      const parsedCache = JSON.parse(cacheData);

      // Access the jira_config query data from the cache
      const jiraConfigData = parsedCache.clientState?.queries?.find(
        (query: any) =>
          JSON.stringify(query.queryKey) === JSON.stringify(["jira_config"]),
      );

      if (jiraConfigData?.state?.data) {
        return jiraConfigData.state.data;
      }
    }
    return defaultJiraConfig;
  } catch (error) {
    return defaultJiraConfig;
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getJiraTasks") {
    (async () => {
      try {
        // First let's check if storage is available
        if (!chrome.storage.local) {
          throw new Error("Chrome storage API not available");
        }

        // Check if the Jira config key actually exists in storage
        const config = await getJiraConfigFromCache();

<<<<<<< Updated upstream
        if (!config) {
          throw new Error("Jira isn't configured yet. Please set up your Jira configuration first.");
=======
        if (!config || !config.domain || !config.apiToken || !config.email) {
          throw new Error("Jira configuration is incomplete");
>>>>>>> Stashed changes
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
