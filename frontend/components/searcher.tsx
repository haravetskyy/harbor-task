'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Flag, Search } from 'lucide-react';
import * as React from 'react';
import { useDebounce } from 'use-debounce';
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

  const [debouncedQuery] = useDebounce(query, 300);

  const { data: tasks = [], isLoading: tasksLoading } = useTasks(user?.id, 'All', debouncedQuery);
  const { data: projects = [], isLoading: projectsLoading } = useProjects(user?.id, debouncedQuery);

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

  React.useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  const isLoading = tasksLoading || projectsLoading || !user;

  return (
    <>
      <Button
        onClick={() => setOpen(open => !open)}
        variant="outline"
        className="p-2"
        disabled={isLoading}>
        <Search />
        Search
        <kbd className="ml-auto justify-self-end pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {tasks.length === 0 && projects.length === 0 && debouncedQuery && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {(tasks.length > 0 || projects.length > 0 || !debouncedQuery) && (
            <>
              {projects.length > 0 && (
                <CommandGroup heading="Projects">
                  {projects.map(project => (
                    <CommandItem
                      key={project.id}
                      value={project.name}
                      onSelect={() => {
                        console.log('Selected project:', project);
                        setOpen(false);
                      }}>
                      <Badge variant="circle" color={project.color}>
                        {project.emoji}
                      </Badge>
                      {project.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {tasks.length > 0 && (
                <CommandGroup heading="Tasks">
                  {tasks.map(task => (
                    <CommandItem
                      key={task.id}
                      value={task.title}
                      onSelect={() => {
                        console.log('Selected task:', task);
                        setOpen(false);
                      }}>
                      <Flag
                        className="w-5"
                        style={{
                          fill: getFlagColor(task.priority),
                          stroke: getFlagColor(task.priority),
                        }}
                      />
                      {task.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
