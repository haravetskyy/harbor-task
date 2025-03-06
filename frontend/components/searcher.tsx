'use client';

import { Flag, Search } from 'lucide-react';
import * as React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useProjects } from '../hooks/use-projects';
import { useTasks } from '../hooks/use-tasks';
import { useUser } from '../hooks/use-user';
import { getFlagColor } from './task-list';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function Searcher() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const { data: user } = useUser();
  const { data: projects } = useProjects(user?.id, query);
  const { data: tasks } = useTasks(user?.id, query);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(open => !open)} variant="outline" className="p-2">
        <Search />
        Search
        <kbd className="ml-auto justify-self-end pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Projects">
            {projects?.map(project => (
              <CommandItem key={project.id}>
                <Badge variant="circle" color={project.color}>
                  {project.emoji}
                </Badge>
                <span>{project.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tasks">
            {tasks?.map(task => (
              <CommandItem key={task.id}>
                <Flag
                  className="w-5"
                  style={{
                    fill: getFlagColor(task.priority),
                    stroke: getFlagColor(task.priority),
                  }}
                />
                <span>{task.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
