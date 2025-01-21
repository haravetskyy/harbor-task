import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().nonempty().uuid(),
  firstName: z.string().nonempty().min(2).max(25),
  lastName: z.string().nonempty().min(2).max(25),
  avatarUrl: z.string().url().optional(),
});

export type User = z.infer<typeof UserSchema>;
