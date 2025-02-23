import { createZodDto } from '@abitia/zod-dto';
import { UserSchema } from '@harbor-task/models';

export const CreateUserSchema = UserSchema.omit({ id: true });

export class CreateUserDto extends createZodDto(CreateUserSchema) {}

export const EditUserSchema = CreateUserSchema.partial();

export class EditUserDto extends createZodDto(EditUserSchema) {}
