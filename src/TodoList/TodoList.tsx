import { Component } from "react";
import { TodoListProps } from "./TodoList.types";
import { List, ThemeIcon } from "@mantine/core";
import TodoItem from "../TodoItem/TodoItem";
import { IconCircleCheck } from "@tabler/icons-react";

class TodoList extends Component<TodoListProps, {}> {
  render() {
    const { todos, onEdit, onDelete } = this.props;

    return (
      <List
        spacing="xs"
        size="sm"
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck />
          </ThemeIcon>
        }
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </List>
    );
  }
}

export default TodoList;
