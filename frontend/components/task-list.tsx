'use client';

import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { useUser } from '@/hooks/use-user';
import { CalendarClock, Flag, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { formatDate } from '../lib/format-date';
import { useFilter } from './filter-context';
import { TaskForm } from './task-form';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SidebarMenuAction, useSidebar } from './ui/sidebar';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const getFlagColor = (priority: number | undefined): string | undefined => {
  if (typeof priority === undefined) {
    return;
  }

  const priorityColors: Record<number, string> = {
    1: '#00c951', // green-500
    2: '#efb100', // yellow-500
    3: '#fd9a00', // amber-500
    4: '#fb2c36', // red-500
  };
  return priority ? priorityColors[priority] : 'gray';
};

const TaskList = () => {
  const { isMobile } = useSidebar();
  const { selectedFilter } = useFilter();
  const { data: user } = useUser();
  const { data: projects = [] } = useProjects(user?.id);
  const { data: tasks = [], isLoading } = useTasks(user?.id, selectedFilter.value);

  if (isLoading) {
    return (
      <section className="flex flex-col w-full max-w-screen-lg">
        <Button variant="link" className="mr-0 mt-2 w-min group">
          <Plus className="group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-[50%] transition-all duration-300 " />
          Add task
        </Button>
        <div className="flex flex-col gap-4 w-full p-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <div className="flex items-center gap-2 w-full">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-3 w-full" />
              </div>
              <div className="ml-7 flex flex-col gap-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="ml-7 flex flex-row gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col max-w-screen-lg gap-2">
      <TaskForm />

      {tasks.map(task => {
        const project = projects.find(project => project.id === task.projectId);

        return (
          <div
            className="p-4 flex gap-2 items-start dark:bg-neutral-900 dark:rounded-xl border-gray-200 dark:border-neutral-900 border-solid border-b-[1px] w-full"
            key={task.id}>
            <Checkbox className="rounded-[50%] mt-1" />

            <div className="flex flex-col items-start justify-start gap-1">
              <h2 className="text-md">{task.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
              <div className="flex flex-row items-center gap-2 text-red-400">
                {task.deadline && (
                  <Badge variant="outline" className="flex flex-row items-center py-1 gap-2 bg-background">
                    <CalendarClock size={18} />
                    <p className="text-xs">{formatDate(task.deadline)}</p>
                  </Badge>
                )}
                {task.progress && (
                  <Badge variant="outline" className="py-[0.325rem] bg-background">
                    {task.progress}%
                  </Badge>
                )}
                {project && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="circle" color={project.color}>
                        {project.emoji}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{project.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {task.priority && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Flag
                        className="w-5"
                        style={{
                          fill: getFlagColor(task.priority),
                          stroke: getFlagColor(task.priority),
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Priority: {task.priority}/4</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction className="relative" showOnHover>
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
                  <span>Change Task</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="text-neutral-500 dark:text-neutral-400" />
                  <span>Delete Task</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </section>
  );
};

export default TaskList;
