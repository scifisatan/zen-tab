import { GruvboxColors, Link, Task } from "@src/types";

export const gruvboxColors: GruvboxColors = {
  bg0: "#1d2021",
  bg1: "#282828",
  bg2: "#32302f",
  bg3: "#3c3836",
  bg4: "#504945",
  fg: "#ebdbb2",
  fg2: "#d5c4a1",
  fg3: "#bdae93",
  fg4: "#a89984",
  red: "#fb4934",
  green: "#b8bb26",
  yellow: "#fabd2f",
  blue: "#83a598",
  purple: "#d3869b",
  aqua: "#8ec07c",
  orange: "#fe8019",
  gray: "#928374",
};

export const defaultWorkLinks: Link[] = [
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

export const defaultSocialLinks: Link[] = [
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

export const defaultToolsLinks: Link[] = [
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
