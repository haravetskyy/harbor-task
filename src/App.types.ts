import { Project } from "./ProjectForm/ProjectForm.types.ts";
import { Task } from "./Task/Task.types.ts";
import { Section } from "./SideBar/SideBar.types.ts";

export interface AppState {
  projects: Project[];
  tasks: Task[];
  isSideBarOpened: boolean;
  selectedSection: Section;
}
