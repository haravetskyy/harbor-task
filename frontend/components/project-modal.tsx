'use client';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { DrawerClose } from '@/components/ui/drawer';
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
  editProjectSchema,
  EditProjectValues,
  MAX_PROJECT_NAME_LENGTH,
  Project,
} from '@harbor-task/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useAddProject, useEditProject, useProjects } from '../hooks/use-projects';
import { useUser } from '../hooks/use-user';
import { cn } from '../lib/utils';
import { ColorInput } from './ui/color-input';
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from './ui/credenza';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

interface ProjectModalState {
  isOpen: boolean;
  mode: 'Add' | 'Edit';
  project?: Project;
}

const defaultModalState: ProjectModalState = {
  isOpen: false,
  mode: 'Add',
  project: undefined,
};

export const useProjectModal = () => {
  return useQuery({
    queryKey: ['projectModalState'],
    queryFn: () => defaultModalState,
    initialData: defaultModalState,
  });
};

export const useUpdateProjectModal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newState: Partial<ProjectModalState>) => {
      const currentState =
        queryClient.getQueryData<ProjectModalState>(['projectModalState']) || defaultModalState;
      return Promise.resolve({ ...currentState, ...newState });
    },
    onSuccess: updatedState => {
      queryClient.setQueryData(['projectModalState'], updatedState);
    },
  });
};

export function ProjectModal() {
  const { data: modalState } = useProjectModal();
  const updateModalState = useUpdateProjectModal();

  return (
    <Credenza
      open={modalState.isOpen}
      onOpenChange={() => updateModalState.mutate({ isOpen: !modalState.isOpen })}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>{modalState.mode} project</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <ProjectForm mode={modalState.mode} project={modalState.project} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

interface ProjectFormProps {
  project?: Project;
  mode: 'Add' | 'Edit';
}

const ProjectForm = ({ project, mode }: ProjectFormProps) => {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects } = useProjects(user?.id);
  const addProjectMutation = useAddProject();
  const editProjectMutation = useEditProject();

  const schema = mode === 'Edit' ? editProjectSchema : addProjectSchema;

  const form = useForm<AddProjectValues | EditProjectValues>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === 'Edit' && project
        ? {
            name: project.name,
            emoji: project.emoji,
            color: project.color,
          }
        : {
            name: '',
            emoji: '',
            color: '#ffffff',
          },
    mode: 'onChange',
  });

  if (!user || !projects || isUserLoading) {
    return <Skeleton className="h-6 w-6 rounded-full" />;
  }

  const onSubmit = (values: AddProjectValues | EditProjectValues) => {
    if (mode === 'Edit' && project) {
      const editedProject: Partial<Project> = {
        id: project.id,
        ...values,
        userId: user.id,
      };

      editProjectMutation.mutate(editedProject);
      form.reset();
    } else {
      const newProject: Omit<Project, 'id'> = {
        ...(values as AddProjectValues),
        userId: user.id,
      };

      addProjectMutation.mutate(newProject);
      form.reset();
    }
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
                {(field.value || '').length}/{MAX_PROJECT_NAME_LENGTH}
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
                    <SelectValue placeholder="Select emoji" />
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
              <ColorInput {...field} value={field.value || '#ffffff'} />
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
