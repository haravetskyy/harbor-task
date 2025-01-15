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
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('users/:userId/projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('userId', new ParseUUIDPipe())
    routeUserId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const userId =
      routeUserId || createProjectDto.userId;
    return this.projectService.create(
      userId,
      createProjectDto,
    );
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
    return this.projectService.findOne(
      userId,
      id,
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(
      id,
      updateProjectDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.projectService.remove(id);
  }
}
