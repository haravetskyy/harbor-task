import { z } from 'zod';

export const MAX_PROJECT_NAME_LENGTH = 60;

export const projectSchema = z.object({
  id: z.string().uuid({ message: 'Project ID must be a valid UUID' }),
  name: z
    .string()
    .max(MAX_PROJECT_NAME_LENGTH, {
      message: `Project name cannot exceed ${MAX_PROJECT_NAME_LENGTH} characters`,
    })
    .nonempty({ message: 'Project name is required' }),
  emoji: z.string().emoji({ message: 'Please use a valid emoji' }),
  color: z
    .string()
    .nonempty({ message: 'Color is required' })
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
      message: 'Please use a valid hex color code (e.g., #000000)',
    }),
  userId: z.string().uuid({ message: 'User ID must be a valid UUID' }),
});

export const addProjectSchema = projectSchema.omit({ id: true, userId: true });

export type Project = z.infer<typeof projectSchema>;

export type AddProjectValues = z.infer<typeof addProjectSchema>;
