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
  Query,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto, EditTaskDto } from './tasks.dto';

@Controller('users/:userId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create({
      ...createTaskDto,
      userId,
    });
  }

  @Get()
  async getTasks(
    @Param('userId') userId: string,
    @Query('section') section?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.taskService.getFilteredTasks(userId, section, projectId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
  ) {
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.taskService.findOne(userId, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async edit(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() editTaskDto: EditTaskDto,
  ) {
    return this.taskService.edit(id, userId, editTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.taskService.remove(userId, id);
  }
}
