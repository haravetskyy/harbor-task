import { Task } from "../Task/Task.types";
import { Project } from "../ProjectForm/ProjectForm.types.ts";
import { Section } from "../SideBar/SideBar.types.ts";

export interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  onAddTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  selectedSection: Section;
}

export interface TaskListState {
  isModalOpen: boolean;
  currentTask: Task | null;
}
