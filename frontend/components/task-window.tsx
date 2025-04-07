import { useProjects } from '@/hooks/use-projects';
import { useEditTask } from '@/hooks/use-tasks';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import { editTaskSchema, EditTaskValues, Project, Task } from '@harbor-task/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Flag } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { getFlagColor } from './task-list';
import { Badge } from './ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaTitle,
  CredenzaTrigger,
} from './ui/credenza';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Skeleton } from './ui/skeleton';
import { Textarea } from './ui/textarea';

export const getPriorityText = (priority: number | undefined): string | undefined => {
  if (!priority) {
    return;
  }

  const priorityTexts: Record<number, string> = {
    1: 'Minor',
    2: 'Optional',
    3: 'Important',
    4: 'Critical',
  } as const;

  return priorityTexts[priority];
};

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
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <Form {...form}>
        <CredenzaContent className="p-4 h-[90%] md:min-h-[50%] md:h-min md:min-w-[50%] max-h-[90%]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row w-full justify-center md:justify-between gap-4">
            <section className="flex flex-col md:gap-2 w-full">
              <CredenzaTitle className="py-2 md:py-0 px-0">
                <Breadcrumb>
                  <BreadcrumbList>
                    {task.projectId ? (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink>{project?.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                      </>
                    ) : (
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">All Tasks</BreadcrumbLink>
                      </BreadcrumbItem>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </CredenzaTitle>

              <section className="flex flex-col items-center gap-2 w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full flex justify-center">
                      <FormControl>
                        <Textarea
                          className="md:!text-lg font-semibold !leading-none tracking-tight resize-none md:w-full w-[99%]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {task.description && (
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full flex justify-center">
                        <FormControl>
                          <Textarea className="text-sm resize-none md:w-full w-[99%]" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </section>
            </section>

            <section className="flex flex-col gap-2 justify-between md:mt-6 md:w-max md:max-w-[33%] md:border-l md:border-border md:pl-4">
              <div className="flex flex-col gap-2 items-center">
                {task.projectId && (
                  <FormField
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                      <FormItem className="w-[99%] md:w-full">
                        <FormLabel htmlFor="project">Project</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="project">
                              <SelectValue placeholder="No project chosen" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map(project => (
                                <SelectItem key={project.id} value={project.id}>
                                  <Badge variant="circle" color={project.color} className="mr-2">
                                    {project.emoji}
                                  </Badge>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {task.deadline && (
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel>Deadline</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}>
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={date => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                )}

                {task.progress !== undefined && (
                  <FormField
                    control={form.control}
                    name="progress"
                    render={({ field }) => (
                      <FormItem className="grid w-[99%] md:w-full items-center">
                        <FormLabel htmlFor="progress">Progress</FormLabel>
                        <div className="relative">
                          <div className="absolute left-4 top-1.5  text-muted-foreground">%</div>
                          <Input
                            type="number"
                            id="progress"
                            min={0}
                            max={100}
                            step={1}
                            className="w-full rounded-lg bg-background pl-10"
                            {...field}
                            value={field.value ?? ''}
                            onChange={e => {
                              const value = e.target.value;
                              field.onChange(value === '' ? undefined : Number(value));
                            }}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {task.priority && (
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className="grid w-[99%] md:w-full items-center">
                        <FormLabel htmlFor="priority">Priority</FormLabel>
                        <div className="relative">
                          <div className="absolute left-4 top-1.5  text-muted-foreground">
                            <Flag
                              className="w-4"
                              style={{
                                fill: getFlagColor(task.priority),
                                stroke: getFlagColor(task.priority),
                              }}
                            />
                          </div>

                          <Input
                            type="number"
                            id="priority"
                            min={1}
                            max={4}
                            step={1}
                            className="w-full rounded-lg bg-background pl-10"
                            {...field}
                            value={field.value ?? ''}
                            onChange={e => {
                              const value = e.target.value;
                              field.onChange(value === '' ? undefined : Number(value));
                            }}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <CredenzaClose asChild>
                <Button disabled={!form.formState.isValid} type="submit">
                  Save
                </Button>
              </CredenzaClose>
            </section>
          </form>
        </CredenzaContent>
      </Form>
    </Credenza>
  );
};

export default TaskWindow;
