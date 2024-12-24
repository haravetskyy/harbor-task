export type Project = {
  id: string;
  name: string;
  emoji?: string;
};

export type SideBarProps = {
  userName: string;
  userProfileImg: string;
  projects: Project[];
  onHideSidebar: () => void;
  onSearch: (query: string) => void;
  onAddProject: (name: string, emoji: string) => void;
};

export type SideBarState = {
  searchQuery: string;
  isModalOpen: boolean;
  newProjectName: string;
  selectedEmoji: string;
};
