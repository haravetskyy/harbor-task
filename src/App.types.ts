import { TodoItemProps } from "./TodoItem/TodoItem.types.ts";

export interface AppState {
  todos: TodoItemProps[];
  isModalOpen: boolean;
  currentTodo: number | null;
  newTitle: string;
  newDeadline: string;
  newProgress: number;
}
