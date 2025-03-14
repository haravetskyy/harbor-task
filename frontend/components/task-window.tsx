import { Project, Task } from '@harbor-task/models';
import { CalendarClock, Flag } from 'lucide-react';
import { formatDate } from '../lib/format-date';
import { getFlagColor } from './task-list';
import { Badge } from './ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from './ui/credenza';

export const getPriorityText = (priority: number | undefined): string | undefined => {
  if (typeof priority === undefined) {
    return;
  }

  const priorityTexts: Record<number, string> = {
    1: 'Minor',
    2: 'Optional',
    3: 'Important',
    4: 'Critical',
  } as const;

  return priority ? priorityTexts[priority] : 'Unknown';
};

const TaskWindow = ({
  children,
  task,
  project,
}: {
  children: React.ReactNode;
  task: Task;
  project?: Project;
}) => {
  return (
    <Credenza key={task.id}>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent className="p-4 flex md:justify-between gap-4 h-[90%] md:min-h-[50%] md:h-min md:min-w-[50%]">
        <div className="flex flex-col md:gap-2">
          <CredenzaHeader className="px-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{project?.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CredenzaHeader>
          <section className="flex flex-col gap-2">
            <CredenzaTitle>{task.title}</CredenzaTitle>
            <CredenzaDescription>{task.description}</CredenzaDescription>
          </section>
        </div>
        <section className="flex flex-col gap-2 md:mt-6 md:min-w-max md:max-w-[33%] md:border-l md:border-border md:pl-4">
          <section className="flex gap-1 flex-col">
            <p className="text-sm text-muted-foreground">Project</p>
            <div className="flex gap-2 items-center">
              <Badge className="w-min" variant="circle" color={project?.color}>
                {project?.emoji}
              </Badge>
              <p className="text-sm">{project?.name}</p>
            </div>
          </section>
          {task.deadline && (
            <section className="flex gap-1 flex-col">
              <p className="text-sm text-muted-foreground">Deadline</p>
              <div className="flex gap-2 items-center">
                <CalendarClock className="w-5" />
                <p className="text-sm">{formatDate(task.deadline)}</p>
              </div>
            </section>
          )}
          <section className="flex gap-1 flex-col">
            <p className="text-sm text-muted-foreground">Priority</p>
            <div className="flex gap-2 items-center">
              <Flag
                className="w-5"
                style={{
                  fill: getFlagColor(task.priority),
                  stroke: getFlagColor(task.priority),
                }}
              />
              <p className="text-sm">
                {getPriorityText(task.priority)} ({task.priority}/4)
              </p>
            </div>
          </section>
          <section className="flex gap-1 flex-col">
            <p className="text-sm text-muted-foreground">Progress</p>
            <div className="flex gap-2 items-center">
              <p className="text-sm">{task.progress} %</p>
            </div>
          </section>
        </section>
      </CredenzaContent>
    </Credenza>
  );
};

export default TaskWindow;
