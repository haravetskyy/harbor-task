import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export class UpdateTaskDto extends PartialType(
  CreateTaskDto,
) {
  @ValidateIf((obj) => obj.title !== undefined)
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  title?: string;
}
