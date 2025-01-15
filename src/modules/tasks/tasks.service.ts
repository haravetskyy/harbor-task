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
    const { userId, projectId, ...data } =
      createTaskDto;

    if (projectId) {
      const project =
        await this.prisma.projects.findFirst({
          where: { id: projectId, userId },
        });
      if (!project) {
        throw new NotFoundException(
          `Project with ID "${projectId}" does not exist for this user.`,
        );
      }
    }

    return this.prisma.tasks.create({
      data: {
        ...data,
        projectId,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.tasks.findMany({
      where: { userId },
      include: { project: true },
    });
  }

  async findOne(userId: string, id: string) {
    const task =
      await this.prisma.tasks.findFirst({
        where: { id, userId },
        include: { project: true },
      });

    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found for this user.`,
      );
    }

    return task;
  }

  async update(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const { projectId, ...data } = updateTaskDto;

    const task =
      await this.prisma.tasks.findFirst({
        where: { id, userId },
      });
    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found for this user.`,
      );
    }

    if (projectId) {
      const project =
        await this.prisma.projects.findFirst({
          where: { id: projectId, userId },
        });
      if (!project) {
        throw new NotFoundException(
          `Project with ID "${projectId}" does not exist for this user.`,
        );
      }
    }

    return this.prisma.tasks.update({
      where: { id },
      data: {
        ...data,
        projectId,
      },
    });
  }

  async remove(userId: string, id: string) {
    const task =
      await this.prisma.tasks.findFirst({
        where: { id, userId },
      });

    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found for this user.`,
      );
    }

    return this.prisma.tasks.delete({
      where: { id },
    });
  }
}
