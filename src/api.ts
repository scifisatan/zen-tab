import { JiraConfig, JiraTask } from "@/types";

export async function getMyJiraTasks(config: JiraConfig, jql: string) {
  let domain = config.domain;
  if (!domain.startsWith("https://")) {
    domain = `https://${domain}`;
  }
  if (!domain.endsWith("/")) {
    domain += "/";
  }

  const url = `${domain}rest/api/3/search?jql=${encodeURIComponent(jql ?? "")}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(`${config.email}:${config.apiToken}`),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(
      `Error fetching tasks: ${response.status} ${response.statusText}. ${errorText}`,
    );
  }

  const data: { issues: any[] } = await response.json();

  const tasks: JiraTask[] = data.issues.map((issue) => {
    return {
      key: issue.key,
      title: issue.fields.summary,
      status: issue.fields.status.name,
      priority: issue.fields.priority.id,
      url: `${domain}browse/${issue.key}`,
    };
  });

  return tasks;
}

// Function to communicate with background script for JIRA tasks
export async function getJiraTasksFromBackground(
  jqlQuery: string,
): Promise<JiraTask[]> {
  return new Promise((resolve, reject) => {
    // Add timeout for the message
    const timeout = setTimeout(() => {
      reject(new Error("Request timeout - background script not responding"));
    }, 10000); // 10 second timeout

    chrome.runtime.sendMessage(
      { action: "getJiraTasks", jqlQuery },
      (response) => {
        clearTimeout(timeout);

        if (chrome.runtime.lastError) {
          console.error("Chrome runtime error:", chrome.runtime.lastError);
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        if (!response) {
          reject(new Error("No response from background script"));
          return;
        }

        if (response.success) {
          resolve(response.tasks);
        } else {
          console.error("Background script error:", response.error);
          reject(new Error(response.error));
        }
      },
    );
  });
}
