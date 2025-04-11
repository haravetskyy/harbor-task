import { z } from 'zod';
import { projectSchema } from './project.model';
import { taskSchema } from './task.model';

export const userSchema = z.object({
  id: z.string().uuid().nonempty(),
  magicHutId: z.string().uuid().nonempty(),
  projects: z.array(projectSchema),
  tasks: z.array(taskSchema),
});

export type User = z.infer<typeof userSchema>;
