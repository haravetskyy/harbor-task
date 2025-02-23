import FilterProvider from "@/components/FilterContext";
import Searcher from "@/components/Searcher";
import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";
import Topbar from "@/components/Topbar";
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
            <Topbar toggleSidebar={handlers.toggle} isCollapsed={!opened} />
          </AppShell.Header>

          <AppShell.Navbar>
            <Sidebar />
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
