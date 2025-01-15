import {
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async search(@Query() searchDto: SearchDto) {
    return this.searchService.search(searchDto);
  }
}
