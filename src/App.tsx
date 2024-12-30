import React, { Component } from "react";
import { AppState } from "./App.types";
import { Task } from "./Task/Task.types.ts";
import SideBar from "./SideBar/SideBar";
import TaskList from "./TaskList/TaskList";
import {
  AppShell,
  Container,
  MantineProvider,
  rem,
  Switch,
} from "@mantine/core";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import { Project } from "./ProjectForm/ProjectForm.types.ts";
import { createProject } from "../lib/createProject.ts";
import { Section } from "./SideBar/SideBar.types.ts";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

class App extends Component<{}, AppState> {
  state: AppState = {
    theme: "dark",
    projects: [
      {
        id: "1",
        name: "Data Analytics",
        emoji: "📚",
        color: "#55e6ba",
      },
    ],
    tasks: [
      {
        id: uuid(),
        title: "Finish IBM Course",
        deadline: new Date("2025-01-01"),
        description:
          "Finishing a course is a journey filled with determination and growth, marked by overcoming challenges and celebrating small victories along the way. It's a process of acquiring knowledge, adapting to new ideas, and staying committed despite moments of struggle or doubt. Ultimately, it’s a transformative experience that leaves you with a sense of accomplishment and readiness to tackle the next challenge.",
        progress: 75,
        projectId: "1",
        priority: 4,
      },
    ],
    selectedSection: { type: "section", value: "All" },
  };

  toggleTheme = () => {
    this.setState((prevState) => ({
      ...prevState,
      theme: prevState.theme === "dark" ? "light" : "dark",
    }));
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
    const { tasks, projects, selectedSection, theme } = this.state;

    return (
      <MantineProvider
        forceColorScheme={theme}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          navbar={{
            width: "22rem",
            breakpoint: "sm",
          }}
        >
          <AppShell.Navbar>
            <SideBar
              userName="John Doe"
              userProfileImg="https://avatars.githubusercontent.com/u/56477764?v=4"
              projects={projects}
              onAddProject={this.handleAddProject}
              onEditProject={this.handleEditProject}
              onDeleteProject={this.handleDeleteProject}
              onSectionChange={this.handleSectionChange}
            />
          </AppShell.Navbar>
          <AppShell.Main>
            <Container className="w-3/4">
              <TaskList
                tasks={tasks}
                projects={projects}
                onAddTask={this.handleAddTask}
                onEditTask={this.handleEditTask}
                onDeleteTask={this.handleDeleteTask}
                selectedSection={selectedSection}
              />
            </Container>
            <Container className="absolute top-4 right-4">
              <Switch
                className="absolute "
                checked={theme === "dark"}
                size="md"
                color="dark.4"
                onChange={this.toggleTheme}
                onLabel={
                  <IconSun
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={2.5}
                    color="#ffd43b"
                  />
                }
                offLabel={
                  <IconMoonStars
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={2.5}
                    color="#228be6"
                  />
                }
              />
            </Container>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    );
  }
}

export default App;
