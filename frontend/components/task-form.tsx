'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Task } from '@harbor-task/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useProjects } from '../hooks/use-projects';
import { useAddTask } from '../hooks/use-tasks';
import { useUser } from '../hooks/use-user';
import { Badge } from './ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';
import { Textarea } from './ui/textarea';

export function TaskForm() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const addTaskMutation = useAddTask();
  const { data: projects } = useProjects(user?.id);

  if (!user || !projects || isUserLoading) {
    return <Skeleton className="h-6 w-6 rounded-full" />;
  }

  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.string().optional(),
    progress: z.string().optional(),
    projectId: z.string().optional(),
    deadline: z.string().optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      deadline: 'October 13, 2014 11:13:00',
      priority: '1',
      progress: '0',
      projectId: '',
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log('Form submitted with values:', values);

    const { title, description, deadline, priority, progress, projectId } = values;

    const newTask: Omit<Task, 'id'> = {
      title,
      description,
      deadline: new Date(deadline),
      priority: parseInt(priority),
      progress: parseInt(progress),
      userId: user.id,
    };

    addTaskMutation.mutate(newTask);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="mr-0 mt-2 w-min group">
          <Plus className="group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-[50%] transition-all duration-300 " />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Description</FormLabel>
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
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
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
                  <FormLabel>No project chosen</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Theme" />
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
