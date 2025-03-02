'use client';

import { formatDate } from '@/lib/format-date';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { CalendarClock, Flag, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { TaskForm } from './task-form';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { SidebarMenuAction, useSidebar } from './ui/sidebar';

const data = [
  {
    id: '3891749827349792',
    title: 'Finish project',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, placeat impedit consequuntur illum, voluptas quaerat magnam ratione in rerum enim dignissimos deleniti expedita eos voluptates officiis voluptate eum laborum autem libero neque obcaecati! Exercitationem sed laboriosam nam asperiores ea in assumenda iste, repudiandae porro dolore nesciunt accusantium laborum minus veniam. Quis neque vel earum ipsum officiis rem animi sequi molestiae! Modi incidunt esse ullam, perferendis sequi accusamus fuga ab, architecto repellat amet natus dolorum dolor reprehenderit. Fugit tempora vitae deserunt alias, facere vel perspiciatis eos aspernatur commodi corrupti modi doloribus, officia in numquam sit nostrum dolore atque! Exercitationem, repellat impedit.',
    deadline: '1970-01-01T00:00:00Z',
    progress: 50,
    priority: 3,
    project: {
      id: '1a12a52f-8bf2-4724-9c3f-7f9037182d49',
      color: '#33FF57',
      emoji: '📈',
    },
  },
];

const TaskList = () => {
  const { isMobile } = useSidebar();

  return (
    <section className='flex flex-col gap-2'>
      <TaskForm />

      {data.map(task => (
        <div className="p-4 flex gap-2 items-start">
          <Checkbox className="rounded-[50%] mt-1" />

          <div className="flex flex-col items-start justify-start gap-1">
            <h2 className="text-md">{task.title}</h2>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="flex flex-row items-center gap-2 text-red-400">
              {task.deadline && (
                <Badge variant="outline" className="flex flex-row items-center py-1 gap-2">
                  <CalendarClock size={18} />
                  <p className="text-xs">{formatDate(task.deadline)}</p>
                </Badge>
              )}
              {task.progress && (
                <Badge variant="outline" className="py-[0.325rem]">
                  {task.progress}%
                </Badge>
              )}
              {task.project && (
                <Badge variant="circle" color={task.project.color}>
                  {task.project.emoji}
                </Badge>
              )}
              <Flag className="w-5 fill-red-400" />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction className="relative" showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align={isMobile ? 'end' : 'start'}>
              <DropdownMenuItem>
                <Pencil className="text-neutral-500 dark:text-neutral-400" />
                <span>Change Task</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="text-neutral-500 dark:text-neutral-400" />
                <span>Delete Task</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </section>
  );
};

export default TaskList;
