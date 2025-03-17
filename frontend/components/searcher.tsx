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
import { useFilter } from './contexts/filter-context';
import { getFlagColor } from './task-list';
import TaskWindow from './task-window';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const Searcher = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(null);

  const [debouncedQuery] = useDebounce(query, 300);

  const { data: user } = useUser();
  const { data: tasks = [], isLoading: tasksLoading } = useTasks(user?.id, 'All', debouncedQuery);
  const { data: projects = [], isLoading: projectsLoading } = useProjects(user?.id, debouncedQuery);
  const { setSelectedFilter } = useFilter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  React.useEffect(() => {
    if (!dialogOpen) {
      setQuery('');
    }
  }, [dialogOpen]);

  const isLoading = tasksLoading || projectsLoading || !user;

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        variant="outline"
        className="p-2 justify-start md:justify-between"
        disabled={isLoading}>
        <Search />
        Search
        <kbd className="hidden ml-auto justify-self-end pointer-events-none md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          Ctrl K
        </kbd>
      </Button>

      <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                        setDialogOpen(false);
                        setSelectedFilter({ type: 'project', value: project.id });
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
                      onSelect={() => handleTaskSelect(task.id)}>
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

      {tasks.map(task => {
        const project = projects.find(project => project.id === task.projectId);
        return (
          <TaskWindow
            key={task.id}
            task={task}
            project={project}
            open={selectedTaskId === task.id}
            onOpenChange={isOpen => {
              if (!isOpen) setSelectedTaskId(null);
            }}
          />
        );
      })}
    </>
  );
};
