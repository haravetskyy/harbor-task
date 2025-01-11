import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { projectId, ...data } = createTaskDto;

    if (projectId) {
      const project =
        await this.prisma.projects.findUnique({
          where: { id: projectId },
        });
      if (!project) {
        throw new NotFoundException(
          `Project with ID "${projectId}" not found`,
        );
      }
    }

    return this.prisma.tasks.create({
      data: {
        ...data,
        projectId,
      },
    });
  }

  async findAll() {
    return this.prisma.tasks.findMany({
      include: { project: true },
    });
  }

  async findOne(id: string) {
    const task =
      await this.prisma.tasks.findUnique({
        where: { id },
        include: { project: true },
      });

    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found`,
      );
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const { projectId, ...data } = updateTaskDto;

    if (projectId) {
      const project =
        await this.prisma.projects.findUnique({
          where: { id: projectId },
        });
      if (!project) {
        throw new NotFoundException(
          `Project with ID "${projectId}" not found`,
        );
      }
    }

    const task =
      await this.prisma.tasks.findUnique({
        where: { id },
      });
    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found`,
      );
    }

    return this.prisma.tasks.update({
      where: { id },
      data: {
        ...data,
        projectId,
      },
    });
  }

  async search(query: string) {
    return this.prisma.tasks.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            project: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: { project: true },
    });
  }

  async remove(id: string) {
    const task =
      await this.prisma.tasks.findUnique({
        where: { id },
      });
    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found`,
      );
    }

    return this.prisma.tasks.delete({
      where: { id },
    });
  }
}
