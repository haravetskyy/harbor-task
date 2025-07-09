'use client';

import { Accordion, Badge, Button, Checkbox, Skeleton, Tooltip } from '@/components/ui';
import { useDeleteTask, useProjects, useTasks, useUser } from '@/hooks';
import { formatDate, getPriorityColor, getPriorityText, groupTasksByDeadline } from '@/lib';
import { useFilter } from '@/providers';
import parse from 'html-react-parser';
import { CalendarClock, Flag, Plus } from 'lucide-react';
import React from 'react';
import { TaskModal } from './task-modal';
import { TaskWindow } from './task-window';

const TaskList = () => {
  const { selectedFilter } = useFilter();
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects = [] } = useProjects(user?.id);
  const { data: tasks = [], isLoading: isTasksLoading } = useTasks(user?.id, selectedFilter.value);
  const deleteTaskMutation = useDeleteTask();
  const [deletingTaskId, setDeletingTaskId] = React.useState<string | null>(null);

  if (!user || isUserLoading || isTasksLoading) {
    return (
      <section className="flex w-full max-w-screen-lg flex-col gap-2">
        <Button variant="link" disabled className="group mr-0 mt-2 w-min">
          <Plus className="rounded-full transition-all duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black" />
          Add task
        </Button>

        <div className="flex w-full flex-col gap-4">
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

  const taskGroups = groupTasksByDeadline(tasks);

  return (
    <section className="flex w-full max-w-screen-lg flex-col gap-2">
      <TaskModal />

      <Accordion type="multiple" defaultValue={taskGroups.map(group => group.label)}>
        {taskGroups.map(group => (
          <Accordion.Item key={group.label} value={group.label}>
            <Accordion.Trigger>{group.label}</Accordion.Trigger>
            <Accordion.Content className="flex flex-col gap-2">
              {group.tasks.map(task => {
                const project =
                  projects.find(project => project.id === task.projectId) || undefined;
                const isDeleting = deletingTaskId === task.id;

                return (
                  <TaskWindow task={task} project={project} key={task.id}>
                    <div
                      className={`border-border bg-sidebar flex w-full items-start gap-2 rounded-xl border border-solid p-4 dark:bg-neutral-900 ${
                        isDeleting && 'animate-slide-fade-left'
                      }`}>
                      <Checkbox
                        className="mt-1 rounded-[50%]"
                        onClick={e => {
                          e.preventDefault();
                          handleDelete(task.id);
                        }}
                      />

                      <div className="flex flex-col items-start justify-start gap-1">
                        <h2 className="cursor-pointer text-sm">{task.title}</h2>

                        {task.description && (
                          <div className="prose dark:prose-invert text-muted-foreground line-clamp-3 text-xs">
                            {parse(task.description)}
                          </div>
                        )}

                        <div className="flex flex-row items-center gap-2">
                          {task.deadline && (
                            <Badge
                              variant="outline"
                              className="bg-background flex flex-row items-center gap-2 py-1">
                              <CalendarClock size={18} />
                              <p className="text-xs">{formatDate(task.deadline)}</p>
                            </Badge>
                          )}

                          {task.progress !== undefined && (
                            <Badge variant="outline" className="bg-background py-[0.325rem]">
                              {task.progress}%
                            </Badge>
                          )}

                          {project && (
                            <Tooltip>
                              <Tooltip.Trigger>
                                <Badge variant="circle" color={project.color}>
                                  {project.emoji}
                                </Badge>
                              </Tooltip.Trigger>

                              <Tooltip.Content>
                                <p>{project.name}</p>
                              </Tooltip.Content>
                            </Tooltip>
                          )}

                          {task.priority && (
                            <Tooltip>
                              <Tooltip.Trigger>
                                <Flag
                                  className="w-5"
                                  style={{
                                    stroke: getPriorityColor(task.priority),
                                    fill: getPriorityColor(task.priority),
                                  }}
                                />
                              </Tooltip.Trigger>

                              <Tooltip.Content>
                                <p>{getPriorityText(task.priority)}</p>
                              </Tooltip.Content>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  </TaskWindow>
                );
              })}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
};

export { TaskList };
