import { useStorage } from "@/hooks/useStorage";
import { Link, SectionType } from "@/types";

export const useLinks = () => {
  const [workLinks, setWorkLinks] = useStorage<Link[]>(
    "workLinks",
    defaultWorkLinks,
  );
  const [socialLinks, setSocialLinks] = useStorage<Link[]>(
    "socialLinks",
    defaultSocialLinks,
  );
  const [toolsLinks, setToolsLinks] = useStorage<Link[]>(
    "toolsLinks",
    defaultToolsLinks,
  );

  const addLink = (section: SectionType, newLink: Link) => {
    const linkWithId = { ...newLink, id: Date.now().toString() };

    switch (section) {
      case "work":
        setWorkLinks((prev) => [...prev, linkWithId]);
        break;
      case "social":
        setSocialLinks((prev) => [...prev, linkWithId]);
        break;
      case "tools":
        setToolsLinks((prev) => [...prev, linkWithId]);
        break;
    }
  };

  const editLink = (
    section: SectionType,
    linkId: string,
    updatedLink: Partial<Link>,
  ) => {
    const updateFunction = (prev: Link[]) =>
      prev.map((link) =>
        link.id === linkId ? { ...link, ...updatedLink } : link,
      );

    switch (section) {
      case "work":
        setWorkLinks(updateFunction);
        break;
      case "social":
        setSocialLinks(updateFunction);
        break;
      case "tools":
        setToolsLinks(updateFunction);
        break;
    }
  };

  const deleteLink = (section: SectionType, linkId: string) => {
    const filterFunction = (prev: Link[]) =>
      prev.filter((link) => link.id !== linkId);

    switch (section) {
      case "work":
        setWorkLinks(filterFunction);
        break;
      case "social":
        setSocialLinks(filterFunction);
        break;
      case "tools":
        setToolsLinks(filterFunction);
        break;
    }
  };

  return {
    workLinks,
    socialLinks,
    toolsLinks,
    addLink,
    editLink,
    deleteLink,
  };
};
