import { createZodDto } from '@abitia/zod-dto';
import { taskSchema } from '@harbor-task/models';

export const CreateTaskSchema = taskSchema.omit({ id: true });

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}

export const EditTaskSchema = CreateTaskSchema.omit({
  userId: true,
}).partial();

export class EditTaskDto extends createZodDto(EditTaskSchema) {}
