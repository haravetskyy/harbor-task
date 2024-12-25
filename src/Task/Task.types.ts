export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  progress: number;
  priority?: number;
}
