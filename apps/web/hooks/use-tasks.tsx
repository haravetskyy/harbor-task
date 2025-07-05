import { apiURL, queryKeys } from '@/config';
import { Task } from '@harbor-task/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchSearchedTasks = async (userId: string, query: string): Promise<Task[]> => {
  const response = await fetch(`${apiURL}/users/${userId}/search?query=${query}`);
  if (!response.ok) throw new Error('Failed to search tasks');
  const data = await response.json();
  return data.tasks || [];
};

const fetchFilteredTasks = async ({
  userId,
  filterValue,
}: {
  userId: string;
  filterValue: string;
}): Promise<Task[]> => {
  let url = `${apiURL}/users/${userId}/tasks`;

  if (['All', 'Today', 'Upcoming'].includes(filterValue)) {
    url += `?section=${filterValue}`;
  } else {
    url += `?projectId=${filterValue}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

const addTask = async (task: Omit<Task, 'id'>) => {
  const payload = { ...task };

  const response = await fetch(`${apiURL}/users/${task.userId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Failed to add task');

  return response.json() as Promise<Task>;
};

const editTask = async (task: Partial<Task>) => {
  const response = await fetch(`${apiURL}/users/${task.userId}/tasks/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to edit task');
  return response.json();
};

const deleteTask = async ({ userId, taskId }: { userId: string; taskId: string }) => {
  const response = await fetch(`${apiURL}/users/${userId}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return { taskId };
};

export const useTasks = (userId: string | undefined, filterValue?: string, query?: string) => {
  return useQuery({
    queryKey: query ? [queryKeys.search, queryKeys.tasks, userId, query] : [queryKeys.tasks, userId, filterValue],
    queryFn: () =>
      query
        ? fetchSearchedTasks(userId!, query)
        : fetchFilteredTasks({ userId: userId!, filterValue: filterValue! }),
    enabled: !!userId && (query ? query.length > 0 : true),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) =>
      deleteTask({ taskId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });
};
