import { createZodDto } from '@abitia/zod-dto';
import { ProjectSchema } from '@harbor-task/models';
import { z } from 'zod';

export const CreateProjectSchema = ProjectSchema.omit({ id: true }).extend({
  userId: z.string().uuid(),
});

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}

export const EditProjectSchema = CreateProjectSchema.omit({
  userId: true,
}).partial();

export class EditProjectDto extends createZodDto(EditProjectSchema) {}
