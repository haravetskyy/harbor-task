import { Task } from "../Task/Task.types";
import { Project } from "../ProjectForm/ProjectForm.types.ts";

export interface TaskFormProps {
  initialTask?: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
  projects: Project[];
}

export interface TaskFormState {
  title: string;
  description: string;
  deadline: Date;
  priority: number;
  progress: number;
  projectId: string;
}
