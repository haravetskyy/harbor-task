'use client';

import { useProjects } from '@/hooks/use-projects';
import { useDeleteTask, useTasks } from '@/hooks/use-tasks';
import { useUser } from '@/hooks/use-user';
import { formatDate } from '@/lib/format-date';
import { CalendarClock, Flag, Plus } from 'lucide-react';
import React from 'react';
import { useFilter } from './contexts/filter-context';
import { TaskModal } from './task-modal';
import TaskWindow from './task-window';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { useSidebar } from './ui/sidebar';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const getFlagColor = (priority: number | undefined): string | undefined => {
  if (typeof priority === undefined) {
    return;
  }

  const priorityColors: Record<number, string> = {
    1: '#00c951', // green-500
    2: '#efb100', // yellow-500
    3: '#fd9a00', // amber-500
    4: '#c10007', // red-700
  };
  return priority ? priorityColors[priority] : 'gray';
};

const TaskList = () => {
  const { isMobile } = useSidebar();
  const { selectedFilter } = useFilter();
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects = [] } = useProjects(user?.id);
  const { data: tasks = [], isLoading: isTasksLoading } = useTasks(user?.id, selectedFilter.value);
  const deleteTaskMutation = useDeleteTask();
  const [deletingTaskId, setDeletingTaskId] = React.useState<string | null>(null);

  if (!user || isUserLoading || isTasksLoading) {
    return (
      <section className="flex flex-col w-full gap-2 max-w-screen-lg">
        <Button variant="link" disabled className="mr-0 mt-2 w-min group">
          <Plus className="group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-[50%] transition-all duration-300 " />
          Add task
        </Button>
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-24 w-full rounded-xl" key={index} />
          ))}
        </div>
      </section>
    );
  }

  const handleDelete = (taskId: string) => {
    setDeletingTaskId(taskId);
    setTimeout(() => {
      deleteTaskMutation.mutate(
        { taskId, userId: user.id },
        {
          onError: () => {
            setDeletingTaskId(null);
          },
          onSettled: () => {
            setDeletingTaskId(null);
          },
        },
      );
    }, 500);
  };
  1;
  return (
    <section className="flex flex-col w-full max-w-screen-lg gap-2">
      <TaskModal />

      {tasks.map(task => {
        const project = projects.find(project => project.id === task.projectId) || undefined;
        const isDeleting = deletingTaskId === task.id;

        return (
          <TaskWindow task={task} project={project} key={task.id}>
            <div
              className={`flex w-full items-start gap-2 rounded-xl border border-solid border-border p-4 dark:bg-neutral-900 ${
                isDeleting && 'animate-slide-fade-left'
              }`}>
              <Checkbox
                className="rounded-[50%] mt-1"
                onClick={e => {
                  e.preventDefault();
                  handleDelete(task.id);
                }}
              />

              <div className="flex flex-col items-start justify-start gap-1">
                <h2 className="text-sm cursor-pointer">{task.title}</h2>
                <p className="text-xs text-muted-foreground line-clamp-3">{task.description}</p>
                <div className="flex flex-row items-center gap-2">
                  {task.deadline && (
                    <Badge
                      variant="outline"
                      className="flex flex-row items-center py-1 gap-2 bg-background">
                      <CalendarClock size={18} />
                      <p className="text-xs">{formatDate(task.deadline)}</p>
                    </Badge>
                  )}
                  {task.progress !== undefined && (
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
            </div>
          </TaskWindow>
        );
      })}
    </section>
  );
};

export default TaskList;
