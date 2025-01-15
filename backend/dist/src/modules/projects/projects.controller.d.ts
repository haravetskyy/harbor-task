import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(routeUserId: string, createProjectDto: CreateProjectDto): Promise<{
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
    update(userId: string, id: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        emoji: string;
        color: string;
        userId: string;
    }>;
    remove(userId: string, id: string): Promise<void>;
}
