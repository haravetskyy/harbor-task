'use client';

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
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { useDeleteProject, useProjects } from '../hooks/use-projects';
import { useUser } from '../hooks/use-user';
import { useFilter } from './contexts/filter-context';
import { ProjectModal, useUpdateProjectModal } from './project-modal';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export function NavProjects() {
  const { isMobile } = useSidebar();
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects = [], isLoading: isProjectsLoading } = useProjects(user?.id);
  const { setSelectedFilter } = useFilter();
  const deleteProjectMutation = useDeleteProject();
  const updateModalState = useUpdateProjectModal();

  if (!user || isUserLoading || isProjectsLoading) {
    return (
      <div className="flex flex-col p-2">
        <div className="flex flex-col gap-0">
          <Button variant="outline" disabled className="w-full">
            <Plus />
            Add project
          </Button>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
        </div>
        <div className="flex flex-col gap-2 w-full p-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Button
        variant="outline"
        onClick={() => {
          updateModalState.mutate({ isOpen: true, mode: 'Add', project: undefined });
        }}>
        <Plus />
        Add project
      </Button>
      <ProjectModal />

      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(project => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton
              asChild
              onClick={() => {
                setSelectedFilter({ type: 'project', value: project.id });
              }}>
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
                <DropdownMenuItem
                  onClick={() => updateModalState.mutate({ isOpen: true, mode: 'Edit', project })}>
                  <Pencil className="text-neutral-500 dark:text-neutral-400" />
                  <span>Edit Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    deleteProjectMutation.mutate({ userId: user.id, projectId: project.id })
                  }>
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
