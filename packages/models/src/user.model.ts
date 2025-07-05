import { z } from 'zod';
import { projectSchema } from './project.model';
import { taskSchema } from './task.model';

const userSchema = z.object({
  id: z
    .string({ invalid_type_error: 'User ID must be a string' })
    .uuid({ message: 'User ID must be a valid UUID' }),
  magicHutId: z.string().uuid().nonempty(),
  projects: z.array(projectSchema),
  tasks: z.array(taskSchema),
});

type User = z.infer<typeof userSchema>;

export { userSchema, type User };
