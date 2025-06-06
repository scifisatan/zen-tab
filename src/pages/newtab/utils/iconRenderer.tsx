import React from "react";
import {
  Trello,
  Youtube,
  Twitter,
  Github,
  CodeXml,
  PenTool,
  MessageSquare,
  Sparkles,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

const iconMap = {
  Trello,
  Youtube,
  Twitter,
  Github,
  CodeXml,
  PenTool,
  MessageSquare,
  Sparkles,
  FileText,
  LinkIcon,
};

export const renderIcon = (iconName: string, className = "w-5 h-5") => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap];

  if (IconComponent) {
    return React.createElement(IconComponent, { className });
  }

  // Fallback icon if the specified icon is not found
  return React.createElement(LinkIcon, { className });
};
