import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto, EditTaskDto } from './tasks.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { userId, projectId, ...data } = createTaskDto;

    if (projectId) {
      const project = await this.prisma.projects.findFirst({
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

  async getFilteredTasks(userId: string, section?: string, projectId?: string) {
    const where: any = { userId };

    if (projectId) {
      where.projectId = projectId;
    }

    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const endOfToday = new Date(now.setHours(23, 59, 59, 999));

    if (section === 'Today') {
      where.deadline = {
        gte: startOfToday,
        lte: endOfToday,
      };
    } else if (section === 'Upcoming') {
      const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      where.deadline = {
        gte: startOfToday,
        lte: oneWeekFromNow,
      };
    }

    return this.prisma.tasks.findMany({
      where,
      orderBy: { deadline: 'asc' },
      include: { project: true },
    });
  }

  async findAll(userId: string) {
    return this.prisma.tasks.findMany({
      where: { userId },
      include: { project: true },
      orderBy: {
        deadline: 'asc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const task = await this.prisma.tasks.findFirst({
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

  async edit(id: string, userId: string, editTaskDto: EditTaskDto) {
    const { projectId, ...data } = editTaskDto;

    const task = await this.prisma.tasks.findFirst({
      where: { id, userId },
    });
    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found for this user.`,
      );
    }

    if (projectId) {
      const project = await this.prisma.projects.findFirst({
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
    const task = await this.prisma.tasks.findFirst({
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
