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
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('users/:userId/tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

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
  async update(
    @Param('userId', new ParseUUIDPipe())
    userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(
      id,
      userId,
      updateTaskDto,
    );
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
