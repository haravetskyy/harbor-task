import { Task } from "./components/Task/Task.types";
import SideBar from "./components/SideBar/SideBar";
import TaskList from "./components/TaskList/TaskList";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Project } from "./components/Project/Project.types";
import { Section } from "./components/SideBar/SideBar.types";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section>({
    type: "section",
    value: "All",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const toggleSidebar = () => {
    setSidebarOpened((prev) => !prev);
  };

  const handleSectionChange = (section: Section) => {
    setSelectedSection(section);
  };

  const handleAddTask = async (task: Omit<Task, "id">) => {
    try {
      const response = await axios.post(`${apiUrl}/tasks`, task);
      setTasks((prev) => [...prev, response.data]);
      console.log(apiUrl);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (updatedTask: Task) => {
    try {
      await axios.patch(`${apiUrl}/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddProject = async (
    name: string,
    emoji?: string,
    color?: string
  ) => {
    try {
      const projectData: Partial<Project> = { name };
      if (emoji) projectData.emoji = emoji;
      if (color) projectData.color = color;

      const response = await axios.post(`${apiUrl}/projects`, projectData);
      setProjects((prev) => [...prev, response.data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error adding project:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleEditProject = async (updatedProject: Partial<Project>) => {
    try {
      const { id, ...projectData } = updatedProject;
      const response = await axios.patch(
        `${apiUrl}/projects/${id}`,
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProjects((prev) =>
        prev.map((project) => (project.id === id ? response.data : project))
      );
    } catch (error) {
      console.error(
        "Error editing project:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await axios.delete(`${apiUrl}/projects/${projectId}`);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));

      if (
        selectedSection.type === "project" &&
        selectedSection.value.id === projectId
      ) {
        setSelectedSection({ type: "section", value: "All" });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

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
