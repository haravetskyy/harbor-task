import { createZodDto } from '@abitia/zod-dto';
import { TaskSchema } from '@harbor-task/models';

export const CreateTaskSchema = TaskSchema.omit({ id: true });

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}

export const EditTaskSchema = CreateTaskSchema.omit({
  userId: true,
}).partial();

export class EditTaskDto extends createZodDto(EditTaskSchema) {}
