import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto, EditProjectDto } from './projects.dto';
import { NotFoundError } from 'rxjs';
import { ZodValidationPipe } from '@abitia/zod-dto';

@Controller('users/:userId/projects')
@UsePipes(ZodValidationPipe)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('userId', new ParseUUIDPipe())
    routeUserId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const userId = routeUserId || createProjectDto.userId;
    return this.projectService.create(userId, createProjectDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
  ) {
    return this.projectService.findAll(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!userId) {
      throw NotFoundError;
    }
    return this.projectService.findOne(userId, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async edit(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() editProjectDto: EditProjectDto,
  ) {
    if (!userId) {
      throw NotFoundError;
    }

    return this.projectService.edit(id, editProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!userId) {
      throw NotFoundError;
    }
    await this.projectService.remove(id);
  }
}
