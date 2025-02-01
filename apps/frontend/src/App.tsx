import { FilterProvider } from "@/components/FilterContext";
import { Searcher, searcherSpotlight } from "@/components/Searcher";
import SideBar from "@/components/SideBar";
import TaskList from "@/components/TaskList";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  AppShell,
  Badge,
  Burger,
  Button,
  Container,
  Group,
  MantineProvider,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";

const App: React.FC = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const isMobile = useIsMobile();

  return (
    <MantineProvider defaultColorScheme="auto">
      <FilterProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: "22rem",
            breakpoint: "sm",
            collapsed: { mobile: !sidebarOpened },
          }}>
          <AppShell.Header>
            <Group justify="space-between" align="center" py="xs" px="md" className="h-full">
              <Group align="center">
                {isMobile && (
                  <Burger
                    opened={sidebarOpened}
                    onClick={() => setSidebarOpened((prev) => !prev)}
                    size="sm"
                  />
                )}
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
                    <Badge size="md" variant="light">
                      ⌘ + K
                    </Badge>
                  }
                  onClick={searcherSpotlight.open}
                  justify="space-between"
                  variant="default"
                />
              </Group>
              <ThemeSwitch />
            </Group>
          </AppShell.Header>

          <AppShell.Navbar>
            <SideBar />
          </AppShell.Navbar>

          <AppShell.Main>
            <Container className="w-full md:w-3/4" p={isMobile && 0}>
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
