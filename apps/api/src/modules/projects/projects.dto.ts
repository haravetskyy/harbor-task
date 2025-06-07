import { createZodDto } from '@abitia/zod-dto';
import { addProjectSchema, editProjectSchema, userSchema } from '@harbor-task/models';

export const CreateProjectSchema = addProjectSchema.extend({
  userId: userSchema.shape.id,
});

export class CreateProjectDto extends createZodDto(CreateProjectSchema) {}

export class EditProjectDto extends createZodDto(editProjectSchema) {}
