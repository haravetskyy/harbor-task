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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  addProjectSchema,
  AddProjectValues,
  MAX_PROJECT_NAME_LENGTH,
  Project,
} from '@harbor-task/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from '../hooks/use-media-query';
import { useAddProject, useProjects } from '../hooks/use-projects';
import { useUser } from '../hooks/use-user';
import { cn } from '../lib/utils';
import { ColorInput } from './ui/color-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

export function AddProject() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
            Add project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add project</DialogTitle>
          </DialogHeader>
          <ProjectForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add project
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader className="px-0">
          <DrawerTitle>Add project</DrawerTitle>
        </DrawerHeader>
        <ProjectForm />
      </DrawerContent>
    </Drawer>
  );
}

const ProjectForm = () => {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects } = useProjects(user?.id);
  const addProjectMutation = useAddProject();

  const form = useForm<AddProjectValues>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: '',
      emoji: '',
      color: '#ffffff',
    },
    mode: 'onChange',
  });

  if (!user || !projects || isUserLoading) {
    return <Skeleton className="h-6 w-6 rounded-full" />;
  }

  const onSubmit = (values: AddProjectValues) => {
    const newProject: Omit<Project, 'id'> = {
      ...values,
      userId: user.id,
    };

    addProjectMutation.mutate(newProject);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  'flex flex-row justify-between',
                  form.formState.errors.name && 'text-red-500 dark:text-red-800',
                )}>
                <div className="flex flex-row gap-1">
                  Name
                  <span className="text-red-500 dark:text-red-800">*</span>
                </div>
                {field.value.length}/{MAX_PROJECT_NAME_LENGTH}
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
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emoji</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="🛠️">Tools 🛠️</SelectItem>
                  <SelectItem value="💻">Laptop 💻</SelectItem>
                  <SelectItem value="📷">Camera 📷</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <ColorInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <DrawerClose asChild>
              <Button disabled={!form.formState.isValid} type="submit">
                Save changes
              </Button>
            </DrawerClose>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};
