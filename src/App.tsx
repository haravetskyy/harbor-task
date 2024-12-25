import React, { Component } from "react";
import { AppState } from "./App.types";
import { Task } from "./Task/Task.types.ts";
import SideBar from "./SideBar/SideBar";
import TaskList from "./TaskList/TaskList";
import {
  Button,
  Collapse,
  Divider,
  Grid,
  MantineProvider,
} from "@mantine/core";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import { IconLayoutSidebar } from "@tabler/icons-react";

class App extends Component<{}, AppState> {
  state: AppState = {
    projects: [],
    tasks: [],
    isSideBarOpened: true,
  };

  handleAddTask = (task: Omit<Task, "id">) => {
    this.setState((prevState) => ({
      ...prevState,
      tasks: [...prevState.tasks, { ...task, id: uuid() }],
    }));
  };

  handleAddProject = (name: string, emoji: string) => {
    this.setState((prevState) => ({
      ...prevState,
      projects: [
        ...prevState.projects,
        { id: Date.now().toString(), name, emoji },
      ],
    }));
  };

  handleEditTask = (updatedTask: Task) => {
    this.setState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    }));
  };

  handleDeleteTask = (id: string) => {
    this.setState((prevState) => ({
      ...prevState,
      Tasks: prevState.Tasks.filter((Task) => Task.id !== id),
    }));
  };

  handleDeleteProject = (projectId: string) => {
    this.setState((prevState) => ({
      ...prevState,
      projects: prevState.projects.filter(
        (project) => project.id !== projectId,
      ),
    }));
  };

  toggleSideBar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSideBarOpened: !prevState.isSideBarOpened,
    }));
  };

  render() {
    const { tasks, projects } = this.state;

    return (
      <MantineProvider
        forceColorScheme="dark"
        withGlobalStyles
        withNormalizeCSS
      >
        <Grid>
          <Grid.Col span={this.state.isSideBarOpened ? 3 : 0}>
            <Button
              size="xs"
              mt="md"
              variant="subtle"
              onClick={this.toggleSideBar}
              className={this.state.isSideBarOpened ? "!hidden" : "block"}
            >
              <IconLayoutSidebar />
            </Button>
            <Collapse transitionDuration={0} in={this.state.isSideBarOpened}>
              <SideBar
                userName="John Doe"
                userProfileImg="https://avatars.githubusercontent.com/u/56477764?v=4"
                projects={projects}
                onAddProject={this.handleAddProject}
                onHideSidebar={this.toggleSideBar}
                onSearch={(query) => console.log(`Search: ${query}`)}
              />
            </Collapse>
          </Grid.Col>
          <Divider
            orientation="vertical"
            className={this.state.isSideBarOpened ? "block" : "!hidden"}
          />
          <Grid.Col span={this.state.isSideBarOpened ? 8 : 12}>
            <TaskList
              tasks={tasks}
              onAddTask={this.handleAddTask}
              onEditTask={this.handleEditTask}
              onDeleteTask={this.handleDeleteTask}
            />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    );
  }
}

export default App;
