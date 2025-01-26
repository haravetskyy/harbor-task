import { z } from 'zod';
import { ProjectSchema } from './project.model';

export const MAX_TASK_TITLE_LENGTH = 100;
export const MAX_TASK_DESCRIPTION_LENGTH = 250;

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(MAX_TASK_TITLE_LENGTH),
  description: z.string().max(MAX_TASK_DESCRIPTION_LENGTH).optional(),
  deadline: z.date().optional(),
  progress: z.number().min(0).max(100).optional(),
  priority: z.number().min(1).max(4).optional(),
  projectId: ProjectSchema.shape.id.optional(),
  userId: z.string().uuid(),
});

export type Task = z.infer<typeof TaskSchema>;
