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
import { Calendar1, CalendarDays, House, Tag } from 'lucide-react';
import { useUser } from '../hooks/use-user';

const data = {
  user: {
    name: 'Yuriy Haravetskyy',
    email: 'johndoe@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/56477764?v=4',
  },

  navMain: [
    {
      title: 'All',
      url: '#',
      icon: House,
    },
    {
      title: 'Today',
      url: '#',
      icon: Calendar1,
    },
    {
      title: 'Upcoming',
      url: '#',
      icon: CalendarDays,
    },
    {
      title: 'Tags',
      url: '#',
      icon: Tag,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: '🛠️',
      color: '#000000',
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: '💻',
      color: '#000000',
    },
    {
      name: 'Travel',
      url: '#',
      icon: '📷',
      color: '#000000',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <NavUser
          user={{
            name: `${user?.firstName} ${user?.lastName}`,
            email: 'johndoe@example.com',
            avatar: 'https://avatars.githubusercontent.com/u/56477764?v=4',
          }}
        />
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
