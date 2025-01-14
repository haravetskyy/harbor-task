import React, { useEffect, useState } from "react";
import {
  AppShell,
  Burger,
  Collapse,
  Container,
  Group,
  Image,
  MantineProvider,
  Switch,
  Text,
  rem,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import SideBar from "./components/SideBar/SideBar";
import TaskList from "./components/TaskList/TaskList";
import { Task } from "./components/Task/Task.types";
import { Project } from "./components/Project/Project.types";
import { Section } from "./components/SideBar/SideBar.types";
import useApi from "./hooks/useApi";

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("dark");
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section>({
    type: "section",
    value: "All",
  });

  const [debouncedIsMobile] = useDebouncedValue(isMobile, 200);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { fetchData, postData, patchData, deleteData } = useApi(apiUrl);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      const [tasksData, projectsData] = await Promise.all([
        fetchData<Task[]>("tasks"),
        fetchData<Project[]>("projects"),
      ]);
      if (tasksData) setTasks(tasksData);
      if (projectsData) setProjects(projectsData);
    })();
  }, []);

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleAddTask = async (task: Omit<Task, "id">) => {
    const newTask = await postData<Task>("tasks", task);
    if (newTask) setTasks((prev) => [...prev, newTask]);
  };

  const handleEditTask = async (updatedTask: Task) => {
    const editedTask = await patchData<Task>(
      `tasks/${updatedTask.id}`,
      updatedTask
    );
    if (editedTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? editedTask : task))
      );
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (await deleteData(`tasks/${id}`)) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const handleAddProject = async (
    name: string,
    emoji?: string,
    color?: string
  ) => {
    const projectData = { name };

    if (emoji) projectData["emoji"] = emoji;
    if (color) projectData["color"] = color;

    console.log("Adding project payload:", projectData);

    const project = await postData<Project>("projects", projectData);
    if (project) {
      console.log("Project added successfully:", project);
      setProjects((prev) => [...prev, project]);
    } else {
      console.error("Failed to add project");
    }
  };

  const handleEditProject = async (updatedProject: Partial<Project>) => {
    const editedProject = await patchData<Project>(
      `projects/${updatedProject.id}`,
      updatedProject
    );
    if (editedProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === updatedProject.id ? editedProject : project
        )
      );
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (await deleteData(`projects/${projectId}`)) {
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      if (
        selectedSection.type === "project" &&
        selectedSection.value.id === projectId
      ) {
        setSelectedSection({ type: "section", value: "All" });
      }
    }
  };

  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: "22rem",
          breakpoint: "sm",
          collapsed: { mobile: !debouncedIsMobile || !sidebarOpened },
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
            {debouncedIsMobile ? (
              <Burger
                opened={sidebarOpened}
                onClick={() => setSidebarOpened((prev) => !prev)}
                size="sm"
                color={colorScheme === "dark" ? "white" : "black"}
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
              checked={colorScheme === "dark"}
              size="md"
              color="dark.4"
              onChange={toggleColorScheme}
              onLabel={<IconSun size={rem(16)} stroke={2.5} color="#ffd43b" />}
              offLabel={
                <IconMoonStars size={rem(16)} stroke={2.5} color="#228be6" />
              }
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <Collapse in={debouncedIsMobile ? sidebarOpened : true}>
            <SideBar
              userName="John Doe"
              userProfileImg="https://avatars.githubusercontent.com/u/56477764?v=4"
              projects={projects}
              onAddProject={handleAddProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onSectionChange={setSelectedSection}
            />
          </Collapse>
        </AppShell.Navbar>

        <AppShell.Main>
          <Container className="w-full md:w-3/4" p={debouncedIsMobile && 0}>
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
