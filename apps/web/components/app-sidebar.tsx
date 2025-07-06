'use client';

import { Sidebar } from '@/components/ui/sidebar';
import * as React from 'react';
import { AppSidebarMain } from './app-sidebar-main';
import { AppSidebarProjects } from './app-sidebar-projects';
import { AppSidebarUser } from './app-sidebar-user';

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <Sidebar.Header>
        <AppSidebarUser />
      </Sidebar.Header>

      <Sidebar.Content>
        <AppSidebarMain />

        <AppSidebarProjects />
      </Sidebar.Content>

      <Sidebar.Rail />
    </Sidebar>
  );
}

export { AppSidebar };
