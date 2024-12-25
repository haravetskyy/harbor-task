import React, { Component } from "react";
import { AppState } from "./App.types";
import { Task } from "./Task/Task.types.ts";
import SideBar from "./SideBar/SideBar";
import TaskList from "./TaskList/TaskList";
import { Grid, MantineProvider } from "@mantine/core";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

class App extends Component<{}, AppState> {
  state: AppState = {
    projects: [],
    tasks: [],
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

  render() {
    const { Tasks, projects } = this.state;

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
              onAddProject={this.handleAddProject}
              onHideSidebar={() => console.log("Sidebar hidden")}
              onSearch={(query) => console.log(`Search: ${query}`)}
            />
          </Grid.Col>
          <Grid.Col span={9}>
            <TaskList
              tasks={this.state.tasks}
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
