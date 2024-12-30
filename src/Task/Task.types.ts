import { Project } from "../Project/Project.types.ts";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  progress?: number;
  priority?: number;
  projectId?: string;
}

export interface TaskProps {
  task: Task;
  project?: Project;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export interface TaskState {
  mounted: boolean;
  isDescriptionExpanded: boolean;
}

export type progressBadge = {
  badgeColor: string;
  badgeText: string;
};
