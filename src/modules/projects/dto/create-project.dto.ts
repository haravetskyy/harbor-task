import {
  IsString,
  IsOptional,
  IsHexColor,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { IsEmoji } from 'src/validators/is-emoji.validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmoji({
    message:
      'Emoji must be a valid emoji character',
  })
  @MaxLength(1)
  @IsOptional()
  emoji?: string;

  @IsHexColor()
  @IsOptional()
  color?: string;
}
