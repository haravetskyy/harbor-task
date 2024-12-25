import { Project } from "./SideBar/SideBar.types.ts";
import { Task } from "./Task/Task.types.ts";

export interface AppState {
  projects: Project[];
  tasks: Task[];
  isSideBarOpened: boolean;
}
