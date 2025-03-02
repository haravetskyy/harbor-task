import { createZodDto } from '@abitia/zod-dto';
import { projectSchema } from '@harbor-task/models';
import { z } from 'zod';

export const CreateProjectSchema = projectSchema.omit({ id: true }).extend({
  userId: z.string().uuid(),
});

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}

export const EditProjectSchema = CreateProjectSchema.omit({
  userId: true,
}).partial();

export class EditProjectDto extends createZodDto(EditProjectSchema) {}
