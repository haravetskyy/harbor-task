'use client';

import { Button, ColorInput, Credenza, Form, Input, Skeleton } from '@/components/ui';
import { useAddProject, useEditProject, useProjects, useUser } from '@/hooks';
import { cn } from '@/lib';
import { EmojiPicker } from '@ferrucc-io/emoji-picker';
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

const useProjectModal = () => {
  return useQuery({
    queryKey: ['projectModalState'],
    queryFn: () => defaultModalState,
    initialData: defaultModalState,
  });
};

const useUpdateProjectModal = () => {
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

const ProjectModal = () => {
  const { data: modalState } = useProjectModal();
  const updateModalState = useUpdateProjectModal();

  return (
    <Credenza
      open={modalState.isOpen}
      onOpenChange={() => updateModalState.mutate({ isOpen: !modalState.isOpen })}>
      <Credenza.Content>
        <Credenza.Header>
          <Credenza.Title>{modalState.mode} project</Credenza.Title>
        </Credenza.Header>
        <Credenza.Body>
          <ProjectForm mode={modalState.mode} project={modalState.project} />
        </Credenza.Body>
      </Credenza.Content>
    </Credenza>
  );
};

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
        <Form.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.Item>
              <Form.Label
                className={cn(
                  'flex flex-row justify-between',
                  form.formState.errors.name && 'text-red-500 dark:text-red-800',
                )}>
                <div className="flex flex-row gap-1">
                  Name
                  <span className="text-red-500 dark:text-red-800">*</span>
                </div>
                {(field.value || '').length}/{MAX_PROJECT_NAME_LENGTH}
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
          name="emoji"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>
                <div className="flex flex-row gap-1">
                  Emoji
                  <span className="text-red-500 dark:text-red-800">*</span>
                </div>
              </Form.Label>

              <EmojiPicker onEmojiSelect={field.onChange} className="max-h-56 w-full">
                <EmojiPicker.Header>
                  <EmojiPicker.Input placeholder="Search emoji" />
                </EmojiPicker.Header>
                <EmojiPicker.Group>
                  <EmojiPicker.List />
                </EmojiPicker.Group>
              </EmojiPicker>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="color"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>
                <div className="flex flex-row gap-1">
                  Color
                  <span className="text-red-500 dark:text-red-800">*</span>
                </div>
              </Form.Label>
              <ColorInput {...field} value={field.value || '#ffffff'} />
              <Form.Message />
            </Form.Item>
          )}
        />
        <Credenza.Footer>
          <Credenza.Close asChild>
            <Button disabled={!form.formState.isValid} type="submit">
              Save changes
            </Button>
          </Credenza.Close>
        </Credenza.Footer>
      </form>
    </Form>
  );
};

export { ProjectForm, ProjectModal, useProjectModal, useUpdateProjectModal };
