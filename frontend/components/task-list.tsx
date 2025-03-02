'use client';

import { useProjects } from '@/hooks/use-projects';
import { useTasks } from '@/hooks/use-tasks';
import { useUser } from '@/hooks/use-user';
import { CalendarClock, Flag, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '../lib/format-date';
import { useFilter } from './filter-context';
import { TaskForm } from './task-form';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SidebarMenuAction, useSidebar } from './ui/sidebar';
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
  const { data: tasks = [] } = useTasks(user?.id, selectedFilter.value);

  return (
    <section className="flex flex-col  max-w-screen-lg">
      <TaskForm />

      {tasks.map(task => {
        const project = projects.find(proj => proj.id === task.projectId);

        return (
          <div
            className="p-4 flex gap-2 items-start border-gray-200 dark:border-gray-400 border-solid border-b-[1px] w-full"
            key={task.id}>
            <Checkbox className="rounded-[50%] mt-1" />

            <div className="flex flex-col items-start justify-start gap-1">
              <h2 className="text-md">{task.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
              <div className="flex flex-row items-center gap-2 text-red-400">
                {task.deadline && (
                  <Badge variant="outline" className="flex flex-row items-center py-1 gap-2">
                    <CalendarClock size={18} />
                    <p className="text-xs">{formatDate(task.deadline)}</p>
                  </Badge>
                )}
                {task.progress && (
                  <Badge variant="outline" className="py-[0.325rem]">
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
