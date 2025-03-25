import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(4).max(80),
  email: z.string().email(),
  emailVerified: z.boolean().optional(),
  image: z.string().url().optional(),
});

export type User = z.infer<typeof userSchema>;
