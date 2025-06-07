import { DashboardConfig } from "@/types/dashboard";

const defaultWorkLinks = [
  {
    id: "work-1",
    name: "Project Board",
    url: "https://yourcompany.atlassian.net/jira/software/projects/ABC/list",
    icon: "Trello",
  },
  {
    id: "work-2",
    name: "Repository",
    url: "https://bitbucket.org/yourcompany/repository/branch/branch-name",
    icon: "CodeXml",
  },
];

const defaultSocialLinks = [
  {
    id: "social-1",
    name: "YouTube",
    url: "https://youtube.com",
    icon: "Youtube",
  },
  {
    id: "social-2",
    name: "Twitter / X",
    url: "https://twitter.com",
    icon: "Twitter",
  },
  {
    id: "social-3",
    name: "GitHub",
    url: "https://github.com",
    icon: "Github",
  },
];

const defaultToolsLinks = [
  {
    id: "tools-1",
    name: "Excalidraw",
    url: "https://excalidraw.com",
    icon: "PenTool",
  },
  {
    id: "tools-2",
    name: "ChatGPT",
    url: "https://chat.openai.com",
    icon: "MessageSquare",
  },
  {
    id: "tools-3",
    name: "Gemini",
    url: "https://gemini.google.com",
    icon: "Sparkles",
  },
  {
    id: "tools-4",
    name: "Arch Wiki",
    url: "https://wiki.archlinux.org/title/Installation_guide",
    icon: "FileText",
  },
];

export const defaultDashboardConfig: DashboardConfig = {
  sections: [
    {
      id: "section-1",
      title: "Quick Access",
      rows: [
        [
          {
            id: "board-1",
            title: "Work",
            type: "links",
            links: defaultWorkLinks,
          },
        ],
        [
          {
            id: "board-2",
            title: "Social",
            type: "links",
            links: defaultSocialLinks,
          },
          {
            id: "board-3",
            title: "Tools",
            type: "links",
            links: defaultToolsLinks,
          },
        ],
      ],
    },
    {
      id: "section-2",
      title: "My Tasks",
      rows: [
        [
          {
            id: "board-4",
            title: "Assigned Issue",
            type: "jira",
            links: [],
            jqlQuery:
              "assignee = currentUser() AND status != Done ORDER BY priority DESC",
          },
        ],
      ],
    },
  ],
};
