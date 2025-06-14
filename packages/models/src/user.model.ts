import { z } from 'zod';
import { projectSchema } from './project.model';
import { taskSchema } from './task.model';

export const userSchema = z.object({
  id: z
    .string({ invalid_type_error: 'User ID must be a string' })
    .uuid({ message: 'User ID must be a valid UUID' }),
  magicHutId: z.string().uuid().nonempty(),
  projects: z.array(projectSchema),
  tasks: z.array(taskSchema),
});

export type User = z.infer<typeof userSchema> & {
  email: string;
  name: string;
  image?: string;
};
