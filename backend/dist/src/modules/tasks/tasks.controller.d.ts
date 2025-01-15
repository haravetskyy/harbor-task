import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(userId: string, createTaskDto: CreateTaskDto): Promise<{
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
    getTasks(userId: string, section?: string, projectId?: string): Promise<({
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
    update(userId: string, id: string, updateTaskDto: UpdateTaskDto): Promise<{
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
    remove(userId: string, id: string): Promise<void>;
}
