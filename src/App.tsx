import React, { Component } from "react";
import { AppState } from "./App.types";
import { Task } from "./Task/Task.types.ts";
import SideBar from "./SideBar/SideBar";
import TaskList from "./TaskList/TaskList";
import { Divider, Grid, MantineProvider } from "@mantine/core";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import { Project } from "./ProjectForm/ProjectForm.types.ts";
import { createProject } from "../lib/createProject.ts";
import { Section } from "./SideBar/SideBar.types.ts";

class App extends Component<{}, AppState> {
  state: AppState = {
    projects: [
      {
        id: uuid(),
        name: "Data Analytics",
      },
    ],
    tasks: [
      {
        id: uuid(),
        title: "Finish IBM Course",
        deadline: new Date(),
        progress: 75,
      },
    ],
    selectedSection: { type: "section", value: "All" },
  };

  handleSectionChange = (section: Section) => {
    this.setState((prevState) => ({ ...prevState, selectedSection: section }));
  };

  updateList = (key: "projects" | "tasks", newItem: Project | Task) => {
    this.setState((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], newItem],
    }));
  };

  handleAddProject = (name: string, emoji: string, color: string) => {
    const project = createProject(name, emoji, color);
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
          <Grid.Col span={3}>
            <SideBar
              userName="John Doe"
              userProfileImg="https://avatars.githubusercontent.com/u/56477764?v=4"
              projects={projects}
              onAddProject={this.handleAddProject}
              onEditProject={this.handleEditProject}
              onDeleteProject={this.handleDeleteProject}
              onSectionChange={this.handleSectionChange}
            />
          </Grid.Col>
          <Divider orientation="vertical" />
          <Grid.Col span={8}>
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
