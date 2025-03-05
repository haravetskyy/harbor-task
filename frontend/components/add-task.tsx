'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PopoverContent } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  addTaskSchema,
  AddTaskValues,
  MAX_TASK_DESCRIPTION_LENGTH,
  MAX_TASK_TITLE_LENGTH,
  Task,
} from '@harbor-task/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from '../hooks/use-media-query';
import { useProjects } from '../hooks/use-projects';
import { useAddTask } from '../hooks/use-tasks';
import { useUser } from '../hooks/use-user';
import { cn } from '../lib/utils';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverTrigger } from './ui/popover';
import { Skeleton } from './ui/skeleton';
import { Textarea } from './ui/textarea';

export function AddTask() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className="flex" asChild>
          <Button variant="link" className="mr-0 mt-2 w-min group">
            <Plus className="group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-[50%] transition-all duration-300 " />
            Add task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add project</DialogTitle>
          </DialogHeader>
          <TaskForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="link" className="mr-0 mt-2 w-min group">
          <Plus className="group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-[50%] transition-all duration-300 " />
          Add task
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="px-0">
          <DrawerTitle>Add project</DrawerTitle>
        </DrawerHeader>
        <TaskForm />
      </DrawerContent>
    </Drawer>
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  'flex flex-row justify-between',
                  form.formState.errors.description && 'text-red-500 dark:text-red-800',
                )}>
                <div className="flex flex-row gap-1">
                  Title
                  <span className="text-red-500 dark:text-red-800">*</span>
                </div>
                {field.value.length}/{MAX_TASK_TITLE_LENGTH}
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  'flex flex-row justify-between',
                  form.formState.errors.description && 'text-red-500 dark:text-red-800',
                )}>
                <div className="flex flex-row gap-1">
                  Description
                  <span className="text-red-500 dark:text-red-800">*</span>
                </div>
                {field.value?.length}/{MAX_TASK_DESCRIPTION_LENGTH}
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
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
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
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

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="progress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={25}
                  {...field}
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
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

        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={!form.formState.isValid} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};
