import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsUUID,
  Min,
  Max,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  deadline?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  priority?: number;

  @IsUUID()
  @IsOptional()
  projectId?: string;
}
