import { Project } from "../ProjectForm/ProjectForm.types.ts";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  progress?: number;
  priority?: number;
  projectId?: string;
}

export interface TaskProps extends Task {
  project: Project | null;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export interface TaskState {
  mounted: boolean;
}

export type progressBadge = {
  badgeColor: string;
  badgeText: string;
};
