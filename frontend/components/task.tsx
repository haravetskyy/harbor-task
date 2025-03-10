import { useMediaQuery } from '@/hooks/use-media-query';
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
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from './ui/drawer';

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

const task = {
  id: '195f340f-00e0-4624-a592-0a207f7d0ac3',
  title: 'Test Website Redesign feature 1',
  description:
    'create refactor document integrate integrate design design plan research refactor plan fix update develop deploy dep.',
  deadline: '2025-03-08T21:39:41.871Z',
  progress: 75,
  priority: 4,
  project: {
    id: '9f7d25ee-bb0a-45fc-8f2b-66ebf3988559',
    name: 'Website Whatever',
    color: '#c10007',
    emoji: '🚊',
  },
};

const Task = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className="flex" asChild>
          <Button>Trigger task</Button>
        </DialogTrigger>
        <DialogContent className="flex min-w-max">
          <div className="flex flex-col gap-2">
            <DialogHeader>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbLink>{task.project.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </DialogHeader>
            <section className="flex flex-col gap-2">
              <DialogTitle>{task.title}</DialogTitle>
              <DialogDescription>{task.description}</DialogDescription>
            </section>
          </div>
          <aside className="mt-6 flex flex-col gap-2">
            <section className="flex gap-1 flex-col">
              <p className="text-sm text-muted-foreground">Project</p>
              <div className="flex gap-2 items-center">
                <Badge className="w-min" variant="circle" color={task.project.color}>
                  {task.project.emoji}
                </Badge>
                <p className="text-sm">{task.project.name}</p>
              </div>
            </section>
            <section className="flex gap-1 flex-col">
              <p className="text-sm text-muted-foreground">Deadline</p>
              <div className="flex gap-2 items-center">
                <CalendarClock className="w-5" />
                <p className="text-sm">{formatDate(task.deadline)}</p>
              </div>
            </section>
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
          </aside>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Trigger task</Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 flex gap-2 h-[90%]">
        <div>
          <DrawerHeader className="px-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{task.project.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </DrawerHeader>
          <section className="flex flex-col gap-2">
            <DialogTitle>{task.title}</DialogTitle>
            <DialogDescription>{task.description}</DialogDescription>
          </section>
        </div>
        <section className="flex flex-col gap-2">
          <section className="flex gap-1 flex-col">
            <p className="text-sm text-muted-foreground">Project</p>
            <div className="flex gap-2 items-center">
              <Badge className="w-min" variant="circle" color={task.project.color}>
                {task.project.emoji}
              </Badge>
              <p className="text-sm">{task.project.name}</p>
            </div>
          </section>
          <section className="flex gap-1 flex-col">
            <p className="text-sm text-muted-foreground">Deadline</p>
            <div className="flex gap-2 items-center">
              <CalendarClock className="w-5" />
              <p className="text-sm">{formatDate(task.deadline)}</p>
            </div>
          </section>
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
      </DrawerContent>
    </Drawer>
  );
};

export default Task;
