'use client';

import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useProjects } from '../hooks/use-projects';
import { useUser } from '../hooks/use-user';
import { ProjectForm } from './project-form';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export function NavProjects() {
  const { isMobile } = useSidebar();
  const { data: user } = useUser();
  const { data: projects = [], isLoading } = useProjects(user?.id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-2">
        <Button variant="outline">
          <Plus />
          Add project
        </Button>
        <div className="flex flex-col gap-2 w-full p-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <ProjectForm />

      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(project => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild>
              <a href="#">
                <Badge variant="circle" color={project.color}>
                  {project.emoji}
                </Badge>
                <span>{project.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}>
                <DropdownMenuItem>
                  <Pencil className="text-neutral-500 dark:text-neutral-400" />
                  <span>Change Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="text-neutral-500 dark:text-neutral-400" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
