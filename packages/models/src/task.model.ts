import { z } from 'zod';
import { projectSchema } from './project.model';

export const MAX_TASK_TITLE_LENGTH = 100;
export const MAX_TASK_DESCRIPTION_LENGTH = 250;

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(MAX_TASK_TITLE_LENGTH).nonempty(),
  description: z.string().max(MAX_TASK_DESCRIPTION_LENGTH).optional(),
  deadline: z.coerce.date().optional(),
  progress: z.number().min(0).max(100).optional(),
  priority: z.number().min(1).max(4).optional(),
  projectId: projectSchema.shape.id.optional(),
  userId: z.string().uuid(),
});

export const addTaskSchema = taskSchema.omit({ id: true, userId: true });

export type Task = z.infer<typeof taskSchema>;

export type AddTaskValues = z.infer<typeof addTaskSchema>;
