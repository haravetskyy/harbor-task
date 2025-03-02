import { z } from 'zod';

export const MAX_PROJECT_NAME_LENGTH = 60;

export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(MAX_PROJECT_NAME_LENGTH).nonempty(),
  emoji: z.string().emoji(),
  color: z
    .string()
    .nonempty()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
      message: 'Invalid hex color',
    }),
});

export type Project = z.infer<typeof projectSchema>;
