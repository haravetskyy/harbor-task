import {
  IsNotEmpty,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { IsEmoji } from '../../../validators/is-emoji.validator';
import { CreateProjectDto } from './create-project.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProjectDto extends PartialType(
  CreateProjectDto,
) {
  @ValidateIf((obj) => obj.name !== undefined)
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @IsEmoji({
    message:
      'Emoji must be a valid emoji character',
  })
  @IsOptional()
  emoji?: string;
}
