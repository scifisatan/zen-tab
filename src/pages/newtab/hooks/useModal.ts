import { useState } from "react";
import { Section, Link } from "@/types";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | "">("");
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const openModal = (section: Section) => {
    setCurrentSection(section);
    setShowModal(true);
  };

  const openEditModal = (section: Section, link: Link) => {
    setCurrentSection(section);
    setEditingLink(link);
    setLinkName(link.name);
    setLinkUrl(link.url);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setLinkName("");
    setLinkUrl("");
    setCurrentSection("");
    setEditingLink(null);
  };

  const createLink = (): Link | null => {
    if (linkName && linkUrl) {
      return {
        id: editingLink?.id || Date.now().toString(),
        name: linkName,
        url: linkUrl,
        icon: editingLink?.icon || "LinkIcon", // Use existing icon or default
      };
    }
    return null;
  };

  return {
    showModal,
    currentSection,
    linkName,
    linkUrl,
    editingLink,
    setLinkName,
    setLinkUrl,
    openModal,
    openEditModal,
    closeModal,
    createLink,
  };
};
