import { z } from 'zod';
import { projectSchema } from './project.model';

export const MAX_TASK_TITLE_LENGTH = 100;
export const MAX_TASK_DESCRIPTION_LENGTH = 250;

export const getPlainText = (html: string): string => {
  if (!html || typeof html !== 'string') return '';
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&\w+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
};

export const getPlainTextLength = (html: string): number => getPlainText(html).length;

export const taskSchema = z.object({
  id: z.string().uuid({ message: 'Task ID must be a valid UUID' }),
  title: z
    .string()
    .max(MAX_TASK_TITLE_LENGTH, {
      message: `Title cannot exceed ${MAX_TASK_TITLE_LENGTH} characters`,
    })
    .nonempty({ message: 'Title is required' }),
  deadline: z.coerce.date({ invalid_type_error: 'Deadline must be a valid date' }).optional(),
  description: z
    .string()
    .optional()
    .refine(val => !val || getPlainTextLength(val) <= MAX_TASK_DESCRIPTION_LENGTH, {
      message: `Description text cannot exceed ${MAX_TASK_DESCRIPTION_LENGTH} characters`,
    }),
  progress: z
    .number({ invalid_type_error: 'Progress must be a number' })
    .min(0, { message: 'Progress cannot be less than 0' })
    .max(100, { message: 'Progress cannot exceed 100' })
    .optional(),
  priority: z
    .number({ invalid_type_error: 'Priority must be a number' })
    .min(1, { message: 'Priority must be at least 1' })
    .max(4, { message: 'Priority cannot exceed 4' })
    .optional(),
  projectId: projectSchema.shape.id.optional().nullable(),
  userId: z.string().uuid({ message: 'User ID must be a valid UUID' }),
});

export const addTaskSchema = taskSchema.omit({ id: true, userId: true });

export const editTaskSchema = addTaskSchema.partial();

export type Task = z.infer<typeof taskSchema>;

export type AddTaskValues = z.infer<typeof addTaskSchema>;

export type EditTaskValues = z.infer<typeof editTaskSchema>;
