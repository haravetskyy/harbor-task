import * as React from "react";
import { Component } from "react";
import TodoList from "./TodoList/TodoList";
import {
  Button,
  Container,
  Grid,
  MantineProvider,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { AppState } from "./App.types";
import { TodoItemProps } from "./TodoItem/TodoItem.types";
import SideBar from "./SideBar/SideBar.tsx";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

class App extends Component<{}, AppState> {
  state: AppState = {
    todos: [
      {
        id: 1,
        title: "Finish the course",
        deadline: "2025-01-01",
        progress: 0,
      },
    ],
    isModalOpen: false,
    currentTodo: null,
    newTitle: "",
    newDeadline: "",
    newProgress: 0,
  };

  openModal = (todo?: TodoItemProps) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: true,
      currentTodo: todo ? todo.id : null,
      newTitle: todo?.title || "",
      newDeadline: todo?.deadline || "",
      newProgress: todo?.progress || 0,
    }));
  };

  closeModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: false,
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
    this.setState(
      (prevState: Readonly<AppState>): Pick<AppState, "todos"> => ({
        todos: prevState.todos.filter((todo) => todo.id !== id),
      }),
    );
  };

  mantineTheme = {};

  render() {
    const { todos, isModalOpen, newTitle, newDeadline, newProgress } =
      this.state;

    return (
      <MantineProvider theme={this.mantineTheme} forceColorScheme="dark">
        <Grid>
          <Grid.Col span={2}>
            <SideBar></SideBar>
          </Grid.Col>
          <Grid.Col span={4}>
            <Container>
              <Button onClick={() => this.openModal()} mb="md">
                Add Task
              </Button>
              <TodoList
                todos={todos}
                onEdit={(id) => this.openModal(todos.find((t) => t.id === id))}
                onDelete={this.handleDelete}
              />
              <Modal
                opened={isModalOpen}
                onClose={this.closeModal}
                title="Task"
              >
                <TextInput
                  label="Title"
                  value={newTitle}
                  onChange={(event) => {
                    const value = event.target.value;
                    this.setState((prevState) => ({
                      ...prevState,
                      newTitle: value || "",
                    }));
                  }}
                />
                <TextInput
                  label="Deadline"
                  value={newDeadline}
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      newDeadline: event.currentTarget.value,
                    }))
                  }
                />
                <NumberInput
                  label="Progress"
                  value={newProgress}
                  onChange={(value) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      newProgress: value || 0,
                    }))
                  }
                  min={0}
                  max={100}
                />
                <Button onClick={this.handleSave} mt="md">
                  Save
                </Button>
              </Modal>
            </Container>
          </Grid.Col>
        </Grid>
      </MantineProvider>
    );
  }
}

export default App;
