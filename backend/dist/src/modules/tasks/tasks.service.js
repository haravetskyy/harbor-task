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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TaskService = class TaskService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto) {
        const { userId, projectId } = createTaskDto, data = __rest(createTaskDto, ["userId", "projectId"]);
        if (projectId) {
            const project = await this.prisma.projects.findFirst({
                where: { id: projectId, userId },
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID "${projectId}" does not exist for this user.`);
            }
        }
        return this.prisma.tasks.create({
            data: Object.assign(Object.assign({}, data), { projectId,
                userId }),
        });
    }
    async getFilteredTasks(userId, section, projectId) {
        const where = { userId };
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
        }
        else if (section === 'Upcoming') {
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
    async findAll(userId) {
        return this.prisma.tasks.findMany({
            where: { userId },
            include: { project: true },
            orderBy: {
                deadline: 'asc',
            },
        });
    }
    async findOne(userId, id) {
        const task = await this.prisma.tasks.findFirst({
            where: { id, userId },
            include: { project: true },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found for this user.`);
        }
        return task;
    }
    async update(id, userId, updateTaskDto) {
        const { projectId } = updateTaskDto, data = __rest(updateTaskDto, ["projectId"]);
        const task = await this.prisma.tasks.findFirst({
            where: { id, userId },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found for this user.`);
        }
        if (projectId) {
            const project = await this.prisma.projects.findFirst({
                where: { id: projectId, userId },
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID "${projectId}" does not exist for this user.`);
            }
        }
        return this.prisma.tasks.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), { projectId }),
        });
    }
    async remove(userId, id) {
        const task = await this.prisma.tasks.findFirst({
            where: { id, userId },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found for this user.`);
        }
        return this.prisma.tasks.delete({
            where: { id },
        });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=tasks.service.js.map