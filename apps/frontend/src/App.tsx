import { FilterProvider } from "@/components/FilterContext";
import { Searcher } from "@/components/Searcher";
import SideBar from "@/components/SideBar";
import TaskList from "@/components/TaskList";
import { TopBar } from "@/components/TopBar";
import { AppShell, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const App: React.FC = () => {
  const [opened, handlers] = useDisclosure();

  return (
    <MantineProvider defaultColorScheme="auto">
      <FilterProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: "22rem",
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}>
          <AppShell.Header>
            <TopBar toggleSidebar={handlers.toggle} isCollapsed={!opened} />
          </AppShell.Header>

          <AppShell.Navbar>
            <SideBar />
          </AppShell.Navbar>

          <AppShell.Main>
            <TaskList />
            <Searcher />
          </AppShell.Main>
        </AppShell>
      </FilterProvider>
    </MantineProvider>
  );
};

export default App;
