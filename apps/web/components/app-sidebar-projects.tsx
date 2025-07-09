'use client';

import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import { useDeleteProject, useProjects, useUser } from '@/hooks';
import { useFilter } from '@/providers';
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { ProjectModal, useUpdateProjectModal } from './project-modal';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

const AppSidebarProjects = () => {
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
          <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
        </div>
        <div className="flex w-full flex-col gap-2 p-2">
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
    <Sidebar.Group className="group-data-[collapsible=icon]:hidden">
      <Button
        variant="outline"
        onClick={() => {
          updateModalState.mutate({ isOpen: true, mode: 'Add', project: undefined });
        }}>
        <Plus />
        Add project
      </Button>
      <ProjectModal />

      {!projects.length || <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>}
      <Sidebar.Menu>
        {projects.map(project => (
          <Sidebar.MenuItem key={project.name}>
            <Sidebar.MenuButton
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
            </Sidebar.MenuButton>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Sidebar.MenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </Sidebar.MenuAction>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                className="w-48 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}>
                <DropdownMenu.Item
                  onClick={() => updateModalState.mutate({ isOpen: true, mode: 'Edit', project })}>
                  <Pencil className="text-neutral-500 dark:text-neutral-400" />
                  <span>Edit Project</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() =>
                    deleteProjectMutation.mutate({ userId: user.id, projectId: project.id })
                  }>
                  <Trash2 className="text-neutral-500 dark:text-neutral-400" />
                  <span>Delete Project</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Sidebar.MenuItem>
        ))}
      </Sidebar.Menu>
    </Sidebar.Group>
  );
};

export { AppSidebarProjects };
