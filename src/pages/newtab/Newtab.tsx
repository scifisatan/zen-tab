import {
  Header,
  AddLinkModal,
  MainLayout,
  DashboardContent,
} from "@pages/newtab/components";
import { useTime } from "@pages/newtab/hooks/useTime";
import { useLinks } from "@pages/newtab/hooks/useLinks";
import { useModal } from "@pages/newtab/hooks/useModal";
import { SectionType, Link } from "@src/types";

const NewTabDashboard = () => {
  const { currentTime, greeting, formatTime } = useTime();
  const { workLinks, socialLinks, toolsLinks, addLink, editLink, deleteLink } =
    useLinks();

  const {
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
  } = useModal();

  const handleAddLink = (section: SectionType) => {
    openModal(section);
  };

  const handleEditLink = (section: SectionType, link: Link) => {
    openEditModal(section, link);
  };

  const handleDeleteLink = (section: SectionType, linkId: string) => {
    deleteLink(section, linkId);
  };

  const handleSubmitLink = () => {
    const newLink = createLink();
    if (newLink && currentSection) {
      if (editingLink) {
        editLink(currentSection as SectionType, editingLink.id, newLink);
      } else {
        addLink(currentSection as SectionType, newLink);
      }
      closeModal();
    }
  };

  return (
    <MainLayout>
      <Header
        greeting={greeting}
        currentTime={currentTime}
        formatTime={formatTime}
      />

      <DashboardContent
        workLinks={workLinks}
        socialLinks={socialLinks}
        toolsLinks={toolsLinks}
        onAddLink={handleAddLink}
        onEditLink={handleEditLink}
        onDeleteLink={handleDeleteLink}
      />

      <AddLinkModal
        showModal={showModal}
        linkName={linkName}
        linkUrl={linkUrl}
        editingLink={editingLink}
        onLinkNameChange={setLinkName}
        onLinkUrlChange={setLinkUrl}
        onSubmit={handleSubmitLink}
        onClose={closeModal}
      />
    </MainLayout>
  );
};

export default NewTabDashboard;
