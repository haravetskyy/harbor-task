import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async search(
    userId: string,
    searchDto: SearchDto,
  ) {
    const { query } = searchDto;

    if (!query) {
      throw new NotFoundException(
        'Query parameter is required for searching.',
      );
    }

    const tasks =
      await this.prisma.tasks.findMany({
        where: {
          userId,
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

    const projects =
      await this.prisma.projects.findMany({
        where: {
          userId, // Filter by userId
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              emoji: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

    return { tasks, projects };
  }
}
