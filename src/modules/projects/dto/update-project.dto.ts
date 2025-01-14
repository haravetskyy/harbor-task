import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { CreateProjectDto } from './create-project.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProjectDto extends PartialType(
  CreateProjectDto,
) {
  @ValidateIf((obj) => obj.name !== undefined)
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @MaxLength(1)
  @IsOptional()
  emoji?: string;
}
