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
import { FilterProvider } from "./components/FilterContext";
import { Searcher, searcherSpotlight } from "./components/Searcher";
import SideBar from "./components/SideBar";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("dark");
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [debouncedIsMobile] = useDebouncedValue(isMobile, 200);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <FilterProvider>
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
              <SideBar />
            </Collapse>
          </AppShell.Navbar>

          <AppShell.Main>
            <Container className="w-full md:w-3/4" p={debouncedIsMobile && 0}>
              <TaskList />
            </Container>
            <Searcher />
          </AppShell.Main>
        </AppShell>
      </FilterProvider>
    </MantineProvider>
  );
};

export default App;
