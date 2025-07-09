'use client';

import { ProjectList } from '@/components/projects';
import { Sidebar } from '@/components/ui';
import * as React from 'react';
import { AppSidebarMain } from './app-sidebar-main';
import { AppSidebarUser } from './app-sidebar-user';

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <Sidebar.Header>
        <AppSidebarUser />
      </Sidebar.Header>

      <Sidebar.Content>
        <AppSidebarMain />

        <ProjectList />
      </Sidebar.Content>

      <Sidebar.Rail />
    </Sidebar>
  );
};

export { AppSidebar };
