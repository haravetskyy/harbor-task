import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        deadline: Date | null;
        progress: number | null;
        priority: number | null;
        projectId: string | null;
    }>;
    getFilteredTasks(userId: string, section?: string, projectId?: string): Promise<({
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            emoji: string;
            color: string;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        deadline: Date | null;
        progress: number | null;
        priority: number | null;
        projectId: string | null;
    })[]>;
    findAll(userId: string): Promise<({
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            emoji: string;
            color: string;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        deadline: Date | null;
        progress: number | null;
        priority: number | null;
        projectId: string | null;
    })[]>;
    findOne(userId: string, id: string): Promise<{
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            emoji: string;
            color: string;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        deadline: Date | null;
        progress: number | null;
        priority: number | null;
        projectId: string | null;
    }>;
    update(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        deadline: Date | null;
        progress: number | null;
        priority: number | null;
        projectId: string | null;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        description: string | null;
        deadline: Date | null;
        progress: number | null;
        priority: number | null;
        projectId: string | null;
    }>;
}
