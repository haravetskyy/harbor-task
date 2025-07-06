'use client';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { Sidebar } from '@/components/ui/sidebar';
import * as React from 'react';

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <Sidebar.Header>
        <NavUser />
      </Sidebar.Header>
      <Sidebar.Content>
        <NavMain />
        <NavProjects />
      </Sidebar.Content>
      <Sidebar.Footer></Sidebar.Footer>
      <Sidebar.Rail />
    </Sidebar>
  );
}

export { AppSidebar }
