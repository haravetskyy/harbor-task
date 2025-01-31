import { Filter, Project, Task, User } from "@harbor-task/models";
import {
  AppShell,
  Badge,
  Burger,
  Button,
  Collapse,
  Container,
  Group,
  MantineProvider,
  rem,
  Switch,
  Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconMoonStars, IconSearch, IconSun } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Searcher, searcherSpotlight } from "./components/Searcher";
import SideBar from "./components/SideBar";
import TaskList from "./components/TaskList";
import useApi from "./hooks/useApi";

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("dark");
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [debouncedIsMobile] = useDebouncedValue(isMobile, 200);

  // const [user, setUser] = useState<User | undefined>(undefined);
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedSection, setSelectedSection] = useState<Filter>({
    type: "section",
    value: "All",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  // const { fetchData, fetchFilteredTasks, postData, patchData, deleteData, searchData } =
  //   useApi(apiUrl);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const fetchedUser = await fetchData<User>("users");
  //     if (fetchedUser) {
  //       setUser(fetchedUser);
  //       fetchUserData(fetchedUser.id);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // const fetchUserData = async (userId: string) => {
  //   const [tasksData, projectsData] = await Promise.all([
  //     fetchData<Task[]>(`users/${userId}/tasks`),
  //     fetchData<Project[]>(`users/${userId}/projects`),
  //   ]);
  //   if (tasksData) setTasks(tasksData);
  //   if (projectsData) setProjects(projectsData);
  // };

  const getFilteredTasks = async (section?: string, projectId?: string) => {
    if (!user?.id) return;
    const filteredTasks = await fetchFilteredTasks<Task[]>(user.id, section, projectId);
    if (filteredTasks) {
      setTasks(filteredTasks);
    }
  };

  const handleSectionChange = (section: Filter) => {
    if (section.type === "section") {
      getFilteredTasks(section.value);
    } else if (section.type === "project") {
      getFilteredTasks(undefined, section.value.id);
    }
  };

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: "22rem",
          breakpoint: "sm",
          collapsed: { mobile: !debouncedIsMobile || !sidebarOpened },
        }}>
        <AppShell.Header>
          <Group justify="space-between" align="center" py="xs" px="md" className="h-full">
            {debouncedIsMobile ? (
              <Group align="center">
                <Burger
                  opened={sidebarOpened}
                  onClick={() => setSidebarOpened((prev) => !prev)}
                  size="sm"
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Button
                  leftSection={
                    <>
                      <Group align="center">
                        <IconSearch size="1rem" stroke={1.5} />

                        <Text fw={400} size="sm" c="dimmed">
                          Search
                        </Text>
                      </Group>
                    </>
                  }
                  onClick={searcherSpotlight.open}
                  justify="space-between"
                  variant="default">
                  <Group justify="space-between" className="w-full"></Group>
                </Button>
              </Group>
            ) : (
              <Button
                leftSection={
                  <>
                    <Group align="center">
                      <IconSearch size="1rem" stroke={1.5} />

                      <Text fw={400} size="sm" c="dimmed">
                        Search
                      </Text>
                    </Group>
                  </>
                }
                rightSection={
                  <Badge
                    color={colorScheme === "dark" ? "dark" : ""}
                    size="md"
                    variant="light"
                    c={colorScheme === "dark" ? "white" : ""}>
                    ⌘ + K
                  </Badge>
                }
                onClick={searcherSpotlight.open}
                justify="space-between"
                variant="default">
                <Group justify="space-between" className="w-full"></Group>
              </Button>
            )}
            <Switch
              checked={colorScheme === "dark"}
              size="md"
              color="dark.4"
              onChange={toggleColorScheme}
              onLabel={<IconSun size={rem(16)} stroke={2.5} color="#ffd43b" />}
              offLabel={<IconMoonStars size={rem(16)} stroke={2.5} color="#228be6" />}
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <Collapse in={debouncedIsMobile ? sidebarOpened : true}>
            <SideBar onSectionChange={handleSectionChange} />
          </Collapse>
        </AppShell.Navbar>

        <AppShell.Main>
          <Container className="w-full md:w-3/4" p={debouncedIsMobile && 0}>
            <TaskList selectedSection={selectedSection} />
          </Container>
          <Searcher />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
