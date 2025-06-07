import { JiraConfig, JiraTask } from "@/types";

export async function getMyJiraTasks(config: JiraConfig, jql: string) {
  let domain = config.domain;
  if (!domain.startsWith("https://")) {
    domain = `https://${domain}`;
  }
  if (!domain.endsWith("/")) {
    domain += "/";
  }

  const response = await fetch(
    `${domain}rest/api/3/search?jql=${encodeURIComponent(jql ?? "")}`,
    {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(`${config.email}:${config.apiToken}`),
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching tasks: ${response.status} ${response.statusText}`,
    );
  }

  const data: { issues: any[] } = await response.json();

  const tasks: JiraTask[] = data.issues.map((issue) => {
    return {
      key: issue.key,
      title: issue.fields.summary,
      status: issue.fields.status.name,
      priority: issue.fields.priority,
      url: `${domain}browse/${issue.key}`,
    };
  });

  return tasks;
}
