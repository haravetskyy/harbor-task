import { TodoItemProps } from "../TodoItem/TodoItem.types";

export interface TodoListProps {
  todos: TodoItemProps[];
}

export interface TodoListState {
  todos: TodoItemProps[];
  isModalOpen: boolean;
  currentTodo: number | null;
  newTitle: string;
  newDeadline: string;
  newProgress: number;
}
