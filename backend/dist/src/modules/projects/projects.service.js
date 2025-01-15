"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProjectService = class ProjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createProjectDto) {
        const { name, emoji, color } = createProjectDto;
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${userId}" does not exist.`);
        }
        const existingProject = await this.prisma.projects.findFirst({
            where: {
                userId,
                OR: [{ name }, { emoji, color }],
            },
        });
        if (existingProject) {
            throw new common_1.ConflictException(`A project with similar properties already exists.`);
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
    async findAll(userId) {
        return this.prisma.projects.findMany({
            where: { userId },
            include: { tasks: true },
        });
    }
    async findOne(userId, id) {
        const project = await this.prisma.projects.findFirst({
            where: { id, userId },
            include: { tasks: true },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID "${id}" not found.`);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const project = await this.prisma.projects.findUnique({
            where: { id },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID "${id}" not found`);
        }
        return this.prisma.projects.update({
            where: { id },
            data: updateProjectDto,
        });
    }
    async remove(id) {
        const project = await this.prisma.projects.findUnique({
            where: { id },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID "${id}" not found`);
        }
        return this.prisma.projects.delete({
            where: { id },
        });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectService);
//# sourceMappingURL=projects.service.js.map