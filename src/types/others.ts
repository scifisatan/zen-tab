export interface JiraConfig {
  jiraDomain: string;
  email: string;
  apiToken: string;
  jql?: string;
}

export interface Link {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Task {
  key: string;
  title: string;
  status: string;
  priority: string;
  url: string;
}

export interface GruvboxColors {
  bg0: string;
  bg1: string;
  bg2: string;
  bg3: string;
  bg4: string;
  fg: string;
  fg2: string;
  fg3: string;
  fg4: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  purple: string;
  aqua: string;
  orange: string;
  gray: string;
}

export type SectionType = "work" | "social" | "tools";
