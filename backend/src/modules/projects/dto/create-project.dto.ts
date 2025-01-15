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
  @Matches(
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]+/u,
    { message: 'Emoji must be a valid emoji' },
  )
  emoji: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
