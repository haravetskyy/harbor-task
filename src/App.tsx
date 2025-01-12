import { Task } from "./components/Task/Task.types.ts";
import SideBar from "./components/SideBar/SideBar";
import TaskList from "./components/TaskList/TaskList";
import React, { useState, useEffect } from "react";
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
import { Project } from "./components/Project/Project.types";
import { createProject } from "../lib/createProject";
import { Section } from "./components/SideBar/SideBar.types";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import "@fontsource/lexend-exa/300.css";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Data Analytics",
      emoji: "📚",
      color: "#55e6ba",
    },
  ]);
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);
  const [selectedSection, setSelectedSection] = useState<Section>({
    type: "section",
    value: "All",
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const toggleSidebar = () => {
    setSidebarOpened((prev) => !prev);
  };

  const handleSectionChange = (section: Section) => {
    setSelectedSection(section);
  };

  const updateList = (key: "projects" | "tasks", newItem: Project | Task) => {
    if (key === "projects") {
      setProjects((prev) => [...prev, newItem as Project]);
    } else {
      setTasks((prev) => [...prev, newItem as Task]);
    }
  };

  const handleAddProject = (name: string, emoji: string, color: string) => {
    const project = createProject(name, emoji, color);
    updateList("projects", project as Project);
  };

  const handleEditProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const handleDeleteProject = (projectId: string) => {
    const isDeletedProjectSelected =
      selectedSection.type === "project" &&
      selectedSection.value.id === projectId;

    setProjects((prev) => prev.filter((project) => project.id !== projectId));

    if (isDeletedProjectSelected) {
      setSelectedSection({ type: "section", value: "All" });
    }
  };

  const handleAddTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: uuid() };
    updateList("tasks", newTask);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MantineProvider forceColorScheme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: "22rem",
          breakpoint: "sm",
          collapsed: { mobile: !sidebarOpened },
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
                onClick={toggleSidebar}
                size="sm"
                color={theme === "dark" ? "white" : "black"}
              />
            ) : (
              <Group gap={12}>
                <Image src="harbor-task.svg" h={40} w="auto" />
                <Text
                  tt="uppercase"
                  className="font-lexend tracking-tight"
                  fw={300}
                >
                  Harbor Task
                </Text>
              </Group>
            )}

            <Switch
              checked={theme === "dark"}
              size="md"
              color="dark.4"
              onChange={toggleTheme}
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
              onAddProject={handleAddProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onSectionChange={handleSectionChange}
            />
          </Collapse>
        </AppShell.Navbar>

        <AppShell.Main>
          <Container className="w-full md:w-3/4" p={isMobile && 0}>
            <TaskList
              tasks={tasks}
              projects={projects}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              selectedSection={selectedSection}
            />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
