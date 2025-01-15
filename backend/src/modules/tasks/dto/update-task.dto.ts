import { OmitType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export class UpdateTaskDto extends OmitType(
  CreateTaskDto,
  ['userId', 'title'],
) {
  @ValidateIf((obj) => obj.title !== undefined)
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  title?: string;
}
