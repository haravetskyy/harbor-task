import {
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchTasksDto {
  @IsOptional()
  @IsString()
  query?: string;
}
