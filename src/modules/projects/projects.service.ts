import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
  ) {
    const { name, emoji, color } =
      createProjectDto;

    const existingByName =
      await this.prisma.projects.findUnique({
        where: { name },
      });
    if (existingByName) {
      throw new BadRequestException(
        `Project with name "${name}" already exists.`,
      );
    }

    const existingByEmojiAndColor =
      await this.prisma.projects.findFirst({
        where: { emoji, color },
      });
    if (existingByEmojiAndColor) {
      throw new BadRequestException(
        `Project with emoji "${emoji}" and color "${color}" already exists.`,
      );
    }

    return this.prisma.projects.create({
      data: createProjectDto,
    });
  }

  async findAll() {
    return this.prisma.projects.findMany({
      include: { tasks: true },
    });
  }

  async findOne(id: string) {
    const project =
      await this.prisma.projects.findUnique({
        where: { id },
        include: { tasks: true },
      });

    if (!project) {
      throw new NotFoundException(
        `Project with ID "${id}" not found`,
      );
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    const project =
      await this.prisma.projects.findUnique({
        where: { id },
      });
    if (!project) {
      throw new NotFoundException(
        `Project with ID "${id}" not found`,
      );
    }

    return this.prisma.projects.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: string) {
    const project =
      await this.prisma.projects.findUnique({
        where: { id },
      });
    if (!project) {
      throw new NotFoundException(
        `Project with ID "${id}" not found`,
      );
    }

    return this.prisma.projects.delete({
      where: { id },
    });
  }
}
