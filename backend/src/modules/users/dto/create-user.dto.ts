import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  lastName: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;
}
