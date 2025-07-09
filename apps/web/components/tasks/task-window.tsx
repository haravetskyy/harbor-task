'use client';

import {
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Credenza,
  Form,
  Input,
  Popover,
  Select,
  Skeleton,
  Textarea,
  Tiptap,
} from '@/components/ui';
import { useEditTask, useProjects, useUser } from '@/hooks';
import { cn, getPriorityColor } from '@/lib';
import { editTaskSchema, EditTaskValues, Project, Task } from '@harbor-task/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Flag } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface TaskWindowProps {
  children?: React.ReactNode;
  task: Task;
  project?: Project;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TaskWindow = ({ children, task, project, open, onOpenChange }: TaskWindowProps) => {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects } = useProjects(user?.id);
  const editTaskMutation = useEditTask();

  const form = useForm<EditTaskValues>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      progress: task.progress,
      projectId: task.projectId,
    },
    mode: 'onChange',
  });

  if (!user || !projects || isUserLoading) {
    return <Skeleton className="h-6 w-6 rounded-full" />;
  }

  const onSubmit = (values: EditTaskValues) => {
    const updatedTask: Partial<Task> = {
      ...values,
      id: task.id,
      userId: user.id,
    };

    editTaskMutation.mutate(updatedTask, {
      onSuccess: updatedTask => {
        form.reset({
          title: updatedTask.title,
          description: updatedTask.description,
          deadline: updatedTask.deadline,
          priority: updatedTask.priority,
          progress: updatedTask.progress,
          projectId: updatedTask.projectId,
        });
      },
    });
  };

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <Credenza.Trigger asChild>{children}</Credenza.Trigger>
      <Form {...form}>
        <Credenza.Content className="h-min max-h-[90%] p-4 md:h-min md:min-h-[50%] md:min-w-[50%]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center gap-4 md:flex-row md:justify-between">
            <section className="flex w-full flex-col md:gap-2">
              <Credenza.Title className="px-0 py-2 md:py-0">
                <Breadcrumb>
                  <Breadcrumb.List>
                    {task.projectId ? (
                      <>
                        <Breadcrumb.Item>
                          <Breadcrumb.Link href="#">Projects</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                          <Breadcrumb.Link>{project?.name}</Breadcrumb.Link>
                        </Breadcrumb.Item>
                      </>
                    ) : (
                      <Breadcrumb.Item>
                        <Breadcrumb.Link href="#">All Tasks</Breadcrumb.Link>
                      </Breadcrumb.Item>
                    )}
                  </Breadcrumb.List>
                </Breadcrumb>
              </Credenza.Title>

              <section className="flex w-full flex-col items-center gap-2">
                <Form.Field
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <Form.Item className="flex w-full justify-center">
                      <Form.Control>
                        <Textarea
                          className="w-[99%] resize-none font-semibold !leading-none tracking-tight md:w-full md:!text-lg"
                          {...field}
                        />
                      </Form.Control>
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <Form.Item className="flex w-full justify-center">
                      <Form.Control>
                        <Tiptap
                          className="w-[99%] md:w-full"
                          content={field.value || ''}
                          onChange={field.onChange}
                        />
                      </Form.Control>
                    </Form.Item>
                  )}
                />
              </section>
            </section>

            <section className="md:border-border flex flex-col justify-between gap-2 md:mt-6 md:w-max md:max-w-[33%] md:border-l md:pl-4">
              <div className="flex flex-col items-center gap-2">
                <Form.Field
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <Form.Item className="w-[99%] md:w-full">
                      <Form.Label>Project</Form.Label>
                      <Form.Control>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                          <Select.Trigger>
                            <Select.Value placeholder="No project chosen" className="min-w-max" />
                          </Select.Trigger>
                          <Select.Content>
                            {projects.map(project => (
                              <Select.Item key={project.id} value={project.id}>
                                <Badge variant="circle" color={project.color} className="mr-2">
                                  {project.emoji}
                                </Badge>
                                {project.name}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )}
                />

                {task.deadline && (
                  <Form.Field
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <Form.Item className="flex w-full flex-col">
                        <Form.Label>Deadline</Form.Label>
                        <Popover>
                          <Popover.Trigger asChild>
                            <Form.Control>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}>
                                {field.value ? (
                                  format(new Date(field.value), 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </Form.Control>
                          </Popover.Trigger>
                          <Popover.Content className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={field.onChange}
                              disabled={date => date < new Date()}
                            />
                          </Popover.Content>
                        </Popover>
                      </Form.Item>
                    )}
                  />
                )}

                {task.progress !== undefined && (
                  <Form.Field
                    control={form.control}
                    name="progress"
                    render={({ field }) => (
                      <Form.Item className="grid w-[99%] items-center md:w-full">
                        <Form.Label>Progress</Form.Label>
                        <div className="relative">
                          <div className="text-muted-foreground absolute left-4 top-1.5">%</div>
                          <Form.Control>
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              step={1}
                              className="bg-background w-full rounded-lg pl-10"
                              {...field}
                              value={field.value ?? ''}
                              onChange={e => {
                                const value = e.target.value;
                                field.onChange(value === '' ? undefined : Number(value));
                              }}
                            />
                          </Form.Control>
                        </div>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />
                )}

                {task.priority && (
                  <Form.Field
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <Form.Item className="grid w-[99%] items-center md:w-full">
                        <Form.Label>Priority</Form.Label>
                        <div className="relative">
                          <div className="text-muted-foreground absolute left-4 top-1.5">
                            <Flag
                              className="w-4"
                              style={{
                                fill: getPriorityColor(field.value ?? 0),
                                stroke: getPriorityColor(field.value ?? 0),
                              }}
                            />
                          </div>
                          <Form.Control>
                            <Input
                              type="number"
                              min={1}
                              max={4}
                              step={1}
                              className="bg-background w-full rounded-lg pl-10"
                              {...field}
                              value={field.value ?? ''}
                              onChange={e => {
                                const value = e.target.value;
                                field.onChange(value === '' ? undefined : Number(value));
                              }}
                            />
                          </Form.Control>
                        </div>
                        <Form.Message />
                      </Form.Item>
                    )}
                  />
                )}
              </div>
              <Credenza.Close asChild>
                <Button disabled={!form.formState.isValid} type="submit">
                  Save
                </Button>
              </Credenza.Close>
            </section>
          </form>
        </Credenza.Content>
      </Form>
    </Credenza>
  );
};

export { TaskWindow };
