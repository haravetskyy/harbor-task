import * as React from "react";
import { Component } from "react";
import TodoList from "./TodoList/TodoList";
import { Container, Grid, MantineProvider } from "@mantine/core";
import { AppState } from "./App.types";
import SideBar from "./SideBar/SideBar.tsx";

class App extends Component<object, AppState> {
  state: AppState = {
    todos: [],
    projects: [],
  };

  handleAddProject = (name: string, emoji: string) => {
    this.setState((prevState) => ({
      ...prevState,
      projects: [
        ...prevState.projects,
        { id: String(Date.now()), name, emoji },
      ],
    }));
  };

  render() {
    const { todos, projects } = this.state;

    return (
      <MantineProvider
        forceColorScheme="dark"
        withGlobalStyles
        withNormalizeCSS
      >
        <Grid>
          <Grid.Col span={3}>
            <SideBar
              userName="John Doe"
              userProfileImg="https://avatars.githubusercontent.com/u/56477764?v=4"
              projects={projects}
              onAddTask={() => console.log("Add Task")}
              onHideSidebar={() => console.log("Hide Sidebar")}
              onSearch={(query) => console.log("Search:", query)}
              onAddProject={this.handleAddProject}
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <Container>
              <TodoList todos={todos} />
            </Container>
          </Grid.Col>
        </Grid>
      </MantineProvider>
    );
  }
}

export default App;
