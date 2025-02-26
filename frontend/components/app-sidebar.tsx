'use client';

import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { IconCalendarEventFilled, IconCalendarWeek, IconHome, IconTag } from '@tabler/icons-react';

const data = {
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/56477764?v=4',
  },

  navMain: [
    {
      title: 'All',
      url: '#',
      icon: IconHome,
    },
    {
      title: 'Today',
      url: '#',
      icon: IconCalendarEventFilled,
    },
    {
      title: 'Upcoming',
      url: '#',
      icon: IconCalendarWeek,
    },
    {
      title: 'Tags',
      url: '#',
      icon: IconTag,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: '🤬',
      color: '#000000',
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: '🤬',
      color: '#000000',
    },
    {
      name: 'Travel',
      url: '#',
      icon: '🤬',
      color: '#000000',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
