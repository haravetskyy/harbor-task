import { Task } from "../Task/Task.types.ts";

export interface TaskListProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id">) => void;
  onEditTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export interface TaskListState {
  isModalOpen: boolean;
  currentTask: Task | null;
  newTitle: string;
  newDescription: string;
  newDeadline: string;
  newProgress: number;
  newPriority: number;
}
