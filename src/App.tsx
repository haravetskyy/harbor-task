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
import { Project } from "./ProjectForm/ProjectForm.types.ts";
import { createProject } from "../lib/createProject.ts";

class App extends Component<{}, AppState> {
  state: AppState = {
    projects: [],
    tasks: [],
    isSideBarOpened: true,
    selectedSection: { type: "section", value: "All" },
  };

  toggleSideBar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSideBarOpened: !prevState.isSideBarOpened,
    }));
  };

  handleSectionChange = (section: string) => {
    this.setState((prevState) => ({ ...prevState, selectedSection: section }));
  };

  updateList = (key: "projects" | "tasks", newItem: Project | Task) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], newItem],
    }));
  };

  handleAddProject = (name: string, emoji: string) => {
    const project = createProject(name, emoji);
    this.updateList("projects", project as Project);
  };

  handleEditProject = (updatedProject) => {
    this.setState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    }));
  };

  handleDeleteProject = (projectId) => {
    this.setState((prevState) => {
      const isDeletedProjectSelected =
        prevState.selectedSection.type === "project" &&
        prevState.selectedSection.value.id === projectId;

      const updatedProjects = prevState.projects.filter(
        (project) => project.id !== projectId,
      );

      const updatedSection = isDeletedProjectSelected
        ? { type: "section", value: "All" }
        : prevState.selectedSection;

      return {
        ...prevState,
        projects: updatedProjects,
        selectedSection: updatedSection,
      };
    });
  };

  handleAddTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: uuid() };
    this.updateList("tasks", newTask);
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
      tasks: prevState.tasks.filter((Task) => Task.id !== id),
    }));
  };

  render() {
    const { tasks, projects, selectedSection } = this.state;

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
                onEditProject={this.handleEditProject}
                onDeleteProject={this.handleDeleteProject}
                onHideSidebar={this.toggleSideBar}
                onSectionChange={this.handleSectionChange}
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
              projects={projects}
              onAddTask={this.handleAddTask}
              onEditTask={this.handleEditTask}
              onDeleteTask={this.handleDeleteTask}
              selectedSection={selectedSection}
            />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    );
  }
}

export default App;
