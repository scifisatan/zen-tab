export interface Link {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export type BoardType = "links" | "jira";

export interface Board {
  id: string;
  title: string;
  type: BoardType;
  links: Link[];
  jqlQuery?: string;
}

export interface Section {
  id: string;
  title: string;
  rows: Board[][]; // Each row is an array of boards
}

export interface DashboardConfig {
  sections: Section[];
}
