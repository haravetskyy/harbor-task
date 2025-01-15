import { PrismaService } from '../../prisma/prisma.service';
import { SearchDto } from './dto/search.dto';
export declare class SearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(userId: string, searchDto: SearchDto): Promise<{
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
        projects: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            emoji: string;
            color: string;
            userId: string;
        }[];
    }>;
}
