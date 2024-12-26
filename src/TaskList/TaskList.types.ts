import { Task } from "../Task/Task.types";
import { Project } from "../SideBar/SideBar.tsx";

export interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  onAddTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export interface TaskListState {
  isModalOpen: boolean;
  currentTask: Task | null;
}
