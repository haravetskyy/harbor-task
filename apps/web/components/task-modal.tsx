'use client';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Select } from '@/components/ui/select';
import { useAddTask, useProjects, useUser } from '@/hooks';
import { cn } from '@/lib';
import {
  addTaskSchema,
  AddTaskValues,
  getPlainTextLengthFromHTML,
  MAX_TASK_DESCRIPTION_LENGTH,
  MAX_TASK_TITLE_LENGTH,
  Task,
} from '@harbor-task/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import {
  Credenza,
} from './ui/credenza';
import { Form } from './ui/form';
import { Input } from './ui/input';
import { Popover } from './ui/popover';
import { Skeleton } from './ui/skeleton';
import { Tiptap } from './ui/tiptap';

const TaskModal = () => {
  return (
    <Credenza>
      <Credenza.Trigger asChild>
        <Button variant="link" className="group mr-0 mt-2 w-min">
          <Plus className="rounded-[50%] transition-all duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black" />
          Add task
        </Button>
      </Credenza.Trigger>
      <Credenza.Content className="h-min max-h-[90%]">
        <Credenza.Header>
          <Credenza.Title>Add task</Credenza.Title>
        </Credenza.Header>
        <Credenza.Body>
          <TaskForm />
        </Credenza.Body>
      </Credenza.Content>
    </Credenza>
  );
}

const TaskForm = () => {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects } = useProjects(user?.id);
  const addTaskMutation = useAddTask();

  const form = useForm<AddTaskValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      deadline: new Date(),
      priority: 1,
      progress: 0,
      projectId: undefined,
    },
    mode: 'onChange',
  });

  if (!user || !projects || isUserLoading) {
    return <Skeleton className="h-6 w-6 rounded-full" />;
  }

  const onSubmit = (values: AddTaskValues) => {
    const newTask: Omit<Task, 'id'> = {
      ...values,
      userId: user.id,
    };

    addTaskMutation.mutate(newTask);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Form.Field
          control={form.control}
          name="title"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-1">
                    Title
                    <span className="text-red-500 dark:text-red-800">*</span>
                  </div>
                  <span>
                    {field.value.length}/{MAX_TASK_TITLE_LENGTH}
                  </span>
                </div>
              </Form.Label>
              <Form.Control>
                <Input type="text" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => (
            <Form.Item>
              <Form.Label
                className={cn(
                  form.formState.errors.description && 'text-red-500 dark:text-red-800',
                )}>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-1">
                    Description
                    <span className="text-red-500 dark:text-red-800">*</span>
                  </div>
                  <span>
                    {getPlainTextLengthFromHTML(field.value || '')}/{MAX_TASK_DESCRIPTION_LENGTH}
                  </span>
                </div>
              </Form.Label>
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

        <Form.Field
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <Form.Item className="flex flex-col">
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
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </Form.Control>
                </Popover.Trigger>
                <Popover.Content className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date => date < new Date()}
                  />
                </Popover.Content>
              </Popover>
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="priority"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Priority</Form.Label>
              <Form.Control>
                <Input
                  type="number"
                  min={1}
                  max={4}
                  step={1}
                  {...field}
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="progress"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Progress</Form.Label>
              <Form.Control>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  {...field}
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Project</Form.Label>
              <Form.Control>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <Select.Trigger>
                    <Select.Value placeholder="No project chosen" />
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

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button disabled={!form.formState.isValid} type="submit">
              Save changes
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </form>
    </Form>
  );
};

export { TaskModal, TaskForm }
