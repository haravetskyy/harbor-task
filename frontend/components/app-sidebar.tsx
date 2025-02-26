'use client';

import { Frame, Map, PieChart } from 'lucide-react';
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
    avatar: '/avatars/shadcn.jpg',
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
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
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
