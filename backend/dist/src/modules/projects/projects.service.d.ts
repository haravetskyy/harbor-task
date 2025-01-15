import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createProjectDto: CreateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emoji: string;
        color: string;
        userId: string;
    }>;
    findAll(userId: string): Promise<({
        tasks: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emoji: string;
        color: string;
        userId: string;
    })[]>;
    findOne(userId: string, id: string): Promise<{
        tasks: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emoji: string;
        color: string;
        userId: string;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emoji: string;
        color: string;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emoji: string;
        color: string;
        userId: string;
    }>;
}
