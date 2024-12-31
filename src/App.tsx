import React, { Component } from "react";
import { AppState } from "./App.types";
import { Task } from "./Task/Task.types.ts";
import SideBar from "./SideBar/SideBar";
import TaskList from "./TaskList/TaskList";
import {
  AppShell,
  Burger,
  Collapse,
  Container,
  Group,
  Image,
  MantineProvider,
  rem,
  Switch,
  Text,
} from "@mantine/core";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import { Project } from "./Project/Project.types.ts";
import { createProject } from "../lib/createProject.ts";
import { Section } from "./SideBar/SideBar.types.ts";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import "@fontsource/lexend-exa";

class App extends Component<{}, AppState> {
  state: AppState = {
    theme: "dark",
    sidebarOpened: false,
    isMobile: window.innerWidth <= 768,
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

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState((prevState) => ({
      ...prevState,
      isMobile: window.innerWidth <= 768,
    }));
  };

  toggleTheme = () => {
    this.setState((prevState) => ({
      ...prevState,
      theme: prevState.theme === "dark" ? "light" : "dark",
    }));
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({
      ...prevState,
      sidebarOpened: !prevState.sidebarOpened,
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
    const { tasks, projects, selectedSection, theme, sidebarOpened, isMobile } =
      this.state;

    return (
      <MantineProvider
        forceColorScheme={theme}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: isMobile ? (sidebarOpened ? "22rem" : 0) : "22rem",
            breakpoint: "sm",
          }}
        >
          <AppShell.Header>
            <Group
              justify="space-between"
              align="center"
              py="xs"
              px="md"
              className="h-full"
            >
              {isMobile ? (
                <Burger
                  opened={sidebarOpened}
                  onClick={this.toggleSidebar}
                  size="sm"
                  color={theme === "dark" ? "white" : "black"}
                />
              ) : (
                <Group gap={12}>
                  <Image src="harbor-task.svg" h={40} w="auto" />
                  <Text tt="uppercase" className="font-lexend" fw={400}>
                    Harbor Task
                  </Text>
                </Group>
              )}

              <Switch
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
            </Group>
          </AppShell.Header>
          <AppShell.Navbar>
            <Collapse in={isMobile ? sidebarOpened : true}>
              <SideBar
                userName="John Doe"
                userProfileImg="https://avatars.githubusercontent.com/u/56477764?v=4"
                projects={projects}
                onAddProject={this.handleAddProject}
                onEditProject={this.handleEditProject}
                onDeleteProject={this.handleDeleteProject}
                onSectionChange={this.handleSectionChange}
              />
            </Collapse>
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
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    );
  }
}

export default App;
