import { createZodDto } from '@abitia/zod-dto';
import { addTaskSchema, editTaskSchema, userSchema } from '@harbor-task/models';

export const CreateTaskSchema = addTaskSchema.extend({
  userId: userSchema.shape.id,
});

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}

export class EditTaskDto extends createZodDto(editTaskSchema) {}
