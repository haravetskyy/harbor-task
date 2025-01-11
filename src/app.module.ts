import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    TasksModule,
    ProjectsModule,
  ],
})
export class AppModule {}
