export interface JiraConfig {
  domain: string;
  apiToken: string;
  email: string;
}

export interface JiraTask {
  key: string;
  summary: string;
  status: string;
  priority?: string;
}
