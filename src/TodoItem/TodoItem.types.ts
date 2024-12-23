export interface TodoItemProps {
  id: number;
  title: string;
  deadline: string;
  progress: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
