import { Component } from "react";
import { TodoListProps, TodoListState } from "./TodoList.types";
import {
  Button,
  List,
  Modal,
  NumberInput,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import TodoItem from "../TodoItem/TodoItem";
import { IconCircleCheck } from "@tabler/icons-react";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import { TodoItemProps } from "../TodoItem/TodoItem.types.ts";
import { DateInput } from "@mantine/dates";

class TodoList extends Component<TodoListProps, TodoListState> {
  state: TodoListState = {
    todos: this.props.todos,
    isModalOpen: false,
    currentTodo: null,
    newTitle: "",
    newDeadline: "",
    newProgress: 0,
  };

  handleOpenModal = (todo?: TodoItemProps) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      currentTodo: todo ? todo.id : null,
      newTitle: todo?.title || "",
      newDeadline: todo?.deadline || "",
      newProgress: todo?.progress || 0,
    }));
  };

  handleCloseModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
      currentTodo: null,
      newTitle: "",
      newDeadline: "",
      newProgress: 0,
    }));
  };

  handleSave = () => {
    const { currentTodo, newTitle, newDeadline, newProgress, todos } =
      this.state;

    const updatedTodos = currentTodo
      ? todos.map((todo) =>
          todo.id === currentTodo
            ? {
                ...todo,
                title: newTitle,
                deadline: newDeadline,
                progress: newProgress,
              }
            : todo,
        )
      : [
          ...todos,
          {
            id: uuid(),
            title: newTitle,
            deadline: newDeadline,
            progress: newProgress,
          },
        ];

    this.setState((prevState) => ({
      ...prevState,
      todos: updatedTodos,
      isModalOpen: false,
    }));
  };

  handleDelete = (id: number) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.filter((todo) => todo.id !== id);

      if (updatedTodos.length === prevState.todos.length) {
        console.warn(`Todo with ID ${id} not found.`);
      }

      return { ...prevState, todos: updatedTodos };
    });
  };

  handleDeadlineChange = (date: Date | null) => {
    this.setState((prevState) => ({ ...prevState, newDeadline: date }));
  };

  handleProgressChange = (progress: string) => {
    this.setState((prevState) => ({
      ...prevState,
      newProgress: progress,
    }));
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      newTitle: value || "",
    }));
  };

  render() {
    const { todos, isModalOpen, newTitle, newDeadline, newProgress } =
      this.state;

    return (
      <div>
        <Button onClick={() => this.handleOpenModal()} mb="md">
          Add Task
        </Button>
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
              onEdit={() => this.handleOpenModal(todo)}
              onDelete={() => this.handleDelete(todo.id)}
            />
          ))}
        </List>

        <Modal
          opened={isModalOpen}
          onClose={this.handleCloseModal}
          title="Task"
        >
          <TextInput
            label="Title"
            value={newTitle}
            onChange={this.handleTitleChange}
          />
          <DateInput
            label="Deadline"
            placeholder="Select a deadline"
            value={newDeadline}
            onChange={this.handleDeadlineChange}
            clearable
          />
          <NumberInput
            label="Progress"
            value={newProgress}
            suffix="%"
            step={25}
            allowNegative={false}
            allowDecimal={false}
            onChange={this.handleProgressChange}
            clampBehavior="strict"
            min={0}
            max={100}
          />
          <Button fullWidth mt="md" onClick={this.handleSave}>
            Save
          </Button>
        </Modal>
      </div>
    );
  }
}

export default TodoList;
