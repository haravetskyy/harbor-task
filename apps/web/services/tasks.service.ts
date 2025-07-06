import { api } from '@/config';
import { AllowedSection, allowedSections, Task } from '@harbor-task/models';

const getSearchedTasks = async (userId: string, query: string): Promise<Task[]> => {
  if (!userId || !query) throw new Error('userId and query are required');

  const { data } = await api.get<{ tasks: Task[] }>(`/users/${userId}/search`, {
    params: { query },
  });

  return data.tasks || [];
};

const getFilteredTasks = async ({
  userId,
  filterValue,
}: {
  userId: string;
  filterValue: AllowedSection | string;
}): Promise<Task[]> => {
  if (!userId) throw new Error('userId is required');

  const params = allowedSections.includes(filterValue as AllowedSection)
    ? { section: filterValue }
    : { projectId: filterValue };

  const { data } = await api.get<Task[]>(`/users/${userId}/tasks`, { params });

  return data;
};

const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  if (!task.userId) throw new Error('userId is required');

  const { data } = await api.post<Task>(`/users/${task.userId}/tasks`, task);

  return data;
};

const editTask = async (
  task: Partial<Task> & { id: string; userId: string },
): Promise<Task> => {
  if (!task.id || !task.userId) throw new Error('id and userId are required');

  const { data } = await api.patch<Task>(`/users/${task.userId}/tasks/${task.id}`, task);

  return data;
};

const deleteTask = async ({
  userId,
  taskId,
}: {
  userId: string;
  taskId: string;
}): Promise<{ taskId: string }> => {
  if (!userId || !taskId) throw new Error('userId and taskId are required');

  await api.delete(`/users/${userId}/tasks/${taskId}`);

  return { taskId };
};

export { addTask, deleteTask, editTask, getFilteredTasks, getSearchedTasks };
