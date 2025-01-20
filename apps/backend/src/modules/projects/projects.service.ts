import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    createProjectDto: CreateProjectDto,
  ) {
    const { name, emoji, color } =
      createProjectDto;

    const user =
      await this.prisma.users.findUnique({
        where: { id: userId },
      });

    if (!user) {
      throw new NotFoundException(
        `User with ID "${userId}" does not exist.`,
      );
    }

    const existingProject =
      await this.prisma.projects.findFirst({
        where: {
          userId,
          OR: [{ name }, { emoji, color }],
        },
      });

    if (existingProject) {
      throw new ConflictException(
        `A project with similar properties already exists.`,
      );
    }

    return this.prisma.projects.create({
      data: {
        name,
        emoji,
        color,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.projects.findMany({
      where: { userId },
      include: { tasks: true },
    });
  }

  async findOne(userId: string, id: string) {
    const project =
      await this.prisma.projects.findFirst({
        where: { id, userId },
        include: { tasks: true },
      });

    if (!project) {
      throw new NotFoundException(
        `Project with ID "${id}" not found.`,
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
