import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
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
