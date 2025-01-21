import { z } from 'zod';

export const MAX_PROJECT_NAME_LENGTH = 60;

export const ProjectSchema = z.object({
  id: z.string().nonempty().uuid(),
  name: z.string().nonempty().max(MAX_PROJECT_NAME_LENGTH),
  emoji: z.string().nonempty().max(1).emoji(),
  color: z
    .string()
    .nonempty()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
      message: 'Invalid hex color',
    }),
});

export type Project = z.infer<typeof ProjectSchema>;
