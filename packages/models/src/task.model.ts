import { z } from 'zod';
import { projectSchema } from './project.model';

const MAX_TASK_TITLE_LENGTH = 100;
const MAX_TASK_DESCRIPTION_LENGTH = 250;

const getPlainTextFromHTML = (html: string): string => {
  if (!html || typeof html !== 'string') return '';
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&\w+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
};

const getPlainTextLengthFromHTML = (html: string): number => getPlainTextFromHTML(html).length;

const taskSchema = z.object({
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
    .refine(val => !val || getPlainTextLengthFromHTML(val) <= MAX_TASK_DESCRIPTION_LENGTH, {
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

const addTaskSchema = taskSchema.omit({ id: true, userId: true });

const editTaskSchema = addTaskSchema.partial();

type Task = z.infer<typeof taskSchema>;

type AddTaskValues = z.infer<typeof addTaskSchema>;

type EditTaskValues = z.infer<typeof editTaskSchema>;

export {
  MAX_TASK_TITLE_LENGTH, MAX_TASK_DESCRIPTION_LENGTH, getPlainTextFromHTML, getPlainTextLengthFromHTML, taskSchema, addTaskSchema, editTaskSchema, type Task, type AddTaskValues, type EditTaskValues
}
