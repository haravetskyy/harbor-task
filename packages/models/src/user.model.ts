import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(2).max(25),
  lastName: z.string().min(2).max(25),
  avatarUrl: z.string().url().optional(),
});

export type User = z.infer<typeof UserSchema>;
