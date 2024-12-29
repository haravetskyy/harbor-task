export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
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
