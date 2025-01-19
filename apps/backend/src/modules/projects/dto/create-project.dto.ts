import {
  IsString,
  IsHexColor,
  IsNotEmpty,
  MaxLength,
  Matches,
  IsUUID,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MaxLength(1)
  @IsString()
  emoji: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
