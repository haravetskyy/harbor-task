import { Project } from "./SideBar/SideBar.types.ts";
import { TodoItemProps } from "./TodoItem/TodoItem.types.ts";

export interface AppState {
  projects: Project[];
  todos: TodoItemProps[];
}
