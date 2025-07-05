import { z } from 'zod';

const MAX_PROJECT_NAME_LENGTH = 60;

const projectSchema = z.object({
  id: z
    .string({ invalid_type_error: 'Project ID must be a string' })
    .uuid({ message: 'Project ID must be a valid UUID' }),

  name: z
    .string({ invalid_type_error: 'Project name must be a string' })
    .nonempty({ message: 'Project name is required' })
    .max(MAX_PROJECT_NAME_LENGTH, {
      message: `Project name cannot exceed ${MAX_PROJECT_NAME_LENGTH} characters`,
    }),

  emoji: z
    .string({ invalid_type_error: 'Emoji must be a string' })
    .nonempty({ message: 'Emoji is required' })
    .emoji({ message: 'Please use a valid emoji' }),

  color: z
    .string({ invalid_type_error: 'Color must be a string' })
    .nonempty({ message: 'Color is required' })
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
      message: 'Please use a valid hex color code (e.g., #000000)',
    }),

  userId: z
    .string({ invalid_type_error: 'User ID must be a string' })
    .uuid({ message: 'User ID must be a valid UUID' }),
});

const addProjectSchema = projectSchema.omit({ id: true, userId: true });

const editProjectSchema = addProjectSchema.partial();

type Project = z.infer<typeof projectSchema>;

type AddProjectValues = z.infer<typeof addProjectSchema>;

type EditProjectValues = z.infer<typeof editProjectSchema>;

export {
  MAX_PROJECT_NAME_LENGTH, projectSchema, addProjectSchema, editProjectSchema, type Project, type AddProjectValues, type EditProjectValues
}
