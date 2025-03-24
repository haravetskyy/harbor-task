import { useProjects } from '@/hooks/use-projects';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import { Project, Task } from '@harbor-task/models';
import { CalendarClock, Flag } from 'lucide-react';
import React from 'react';
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
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from './ui/credenza';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { Textarea } from './ui/textarea';

export const getPriorityText = (priority: number | undefined): string | undefined => {
  if (!priority) {
    return;
  }

  const priorityTexts: Record<number, string> = {
    1: 'Minor',
    2: 'Optional',
    3: 'Important',
    4: 'Critical',
  } as const;

  return priorityTexts[priority];
};

interface TaskWindowProps {
  children?: React.ReactNode;
  task: Task;
  project?: Project;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TaskWindow = ({ children, task, project, open, onOpenChange }: TaskWindowProps) => {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects } = useProjects(user?.id);

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent className="p-4 flex md:justify-between gap-4 h-[90%] md:min-h-[50%] md:h-min md:min-w-[50%]">
        <div className="flex flex-col md:gap-2 w-full">
          <CredenzaHeader className="px-0">
            <Breadcrumb>
              <BreadcrumbList>
                {task.projectId ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>{project?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">All Tasks</BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </CredenzaHeader>
          <section className="flex flex-col gap-2 w-full">
            <CredenzaTitle>
              <Textarea
                className="!text-lg font-semibold !leading-none tracking-tight resize-none w-full"
                autoSize>
                {task.title}
              </Textarea>
            </CredenzaTitle>
            <CredenzaDescription>
              <Textarea
                className="resize-none w-full"
                defaultValue={task.description}
                autoSize></Textarea>
            </CredenzaDescription>
          </section>
        </div>
        <section className="flex flex-col gap-2 md:mt-6 md:w-max md:max-w-[33%] md:border-l md:border-border md:pl-4">
          {task.projectId && (
            <>
              <p className="text-sm text-muted-foreground">Project</p>
              <Select>
                <SelectTrigger>
                  <div className="flex gap-2 items-center line-clamp-1 mr-1">
                    <Badge className="w-min" variant="circle" color={project?.color}>
                      {project?.emoji}
                    </Badge>
                    <p className="text-sm line-clamp-1">{project?.name}</p>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {projects?.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      <Badge variant="circle" color={project.color} className="mr-2">
                        {project.emoji}
                      </Badge>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          {task.deadline && (
            <>
              <p className="text-sm text-muted-foreground">Deadline</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn('justify-start text-left font-normal')}>
                    <CalendarClock className=" h-4 w-4 opacity-50" />
                    <span>{formatDate(task.deadline)}</span>
                  </Button>
                </PopoverTrigger>
              </Popover>
            </>
          )}

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="priority" className="text-sm text-muted-foreground">
              Priority
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1.5 h-4 w-4 text-muted-foreground">
                <Flag
                  className="w-4"
                  style={{
                    fill: getFlagColor(task.priority),
                    stroke: getFlagColor(task.priority),
                  }}
                />
              </div>
              <Input
                id="priority"
                type="number"
                min={1}
                max={4}
                step={1}
                value={1}
                className="w-full rounded-lg bg-background pl-10"
              />
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="progress" className="text-sm text-muted-foreground">
              Progress
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1.5  text-muted-foreground">%</div>
              <Input
                type="number"
                id="progress"
                min={0}
                max={100}
                step={25}
                value={0}
                className="w-full rounded-lg bg-background pl-10"
              />
            </div>
          </div>
        </section>
      </CredenzaContent>
    </Credenza>
  );
};

export default TaskWindow;
