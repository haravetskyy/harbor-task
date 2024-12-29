export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  progress?: number;
  priority?: number;
}

export interface TaskProps extends Task {
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
