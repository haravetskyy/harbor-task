import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@Controller('users/:userId/search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async search(
    @Param('userId') userId: string,
    @Query() searchDto: SearchDto,
  ) {
    return this.searchService.search(
      userId,
      searchDto,
    );
  }
}
