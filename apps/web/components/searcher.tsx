'use client';

import { TaskWindow } from '@/components/tasks';
import { Badge, Button, Command } from '@/components/ui';
import { useProjects, useTasks, useUser } from '@/hooks';
import { getPriorityColor } from '@/lib';
import { useFilter } from '@/providers';
import { Flag, Search } from 'lucide-react';
import * as React from 'react';
import { useDebounce } from 'use-debounce';

const Searcher = () => {
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
        className="justify-start p-2 md:justify-between"
        disabled={isLoading}>
        <Search />
        Search
        <kbd className="bg-muted text-muted-foreground pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 justify-self-end rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 md:inline-flex">
          Ctrl K
        </kbd>
      </Button>

      <Command.Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Command.Input
          placeholder="Type a command or search..."
          value={query}
          onValueChange={setQuery}
        />
        <Command.List>
          {tasks.length === 0 && projects.length === 0 && debouncedQuery && !isLoading && (
            <Command.Empty>No results found.</Command.Empty>
          )}

          {(tasks.length > 0 || projects.length > 0 || !debouncedQuery) && (
            <>
              {projects.length > 0 && (
                <Command.Group heading="Projects">
                  {projects.map(project => (
                    <Command.Item
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
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {tasks.length > 0 && (
                <Command.Group heading="Tasks">
                  {tasks.map(task => (
                    <Command.Item
                      key={task.id}
                      value={task.title}
                      onSelect={() => handleTaskSelect(task.id)}>
                      <Flag
                        className="w-5"
                        style={{
                          fill: getPriorityColor(task.priority),
                          stroke: getPriorityColor(task.priority),
                        }}
                      />
                      {task.title}
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </>
          )}
        </Command.List>
      </Command.Dialog>

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

export { Searcher };
