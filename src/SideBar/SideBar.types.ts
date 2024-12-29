import { Project } from "../Project/Project.types.ts";

export type SideBarProps = {
  userName: string;
  userProfileImg: string;
  projects: Project[];
  onAddProject: (name: string, emoji: string, color: string) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onSectionChange: (section: Section) => void;
};

export type SideBarState = {
  isModalOpen: boolean;
  projectToEdit: Project | null;
};

export interface Section {
  type: "section" | "project";
  value: string | Project;
}
