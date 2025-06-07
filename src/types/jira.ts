export interface JiraConfig {
  domain: string;
  apiToken: string;
  email: string;
}

export interface JiraTask {
  key: string;
  title: string;
  status: string;
  priority: string;
  url: string;
}
