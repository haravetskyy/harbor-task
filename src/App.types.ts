import { Project } from "./Project/Project.types.ts";
import { Task } from "./Task/Task.types.ts";
import { Section } from "./SideBar/SideBar.types.ts";

export interface AppState {
  projects: Project[];
  tasks: Task[];
  selectedSection: Section;
}
