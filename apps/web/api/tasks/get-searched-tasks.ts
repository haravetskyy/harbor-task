import { api } from '@/config';
import { Task } from '@harbor-task/models';

const getSearchedTasks = async (userId: string, query: string): Promise<Task[]> => {
  if (!userId || !query) throw new Error('userId and query are required');

  const { data } = await api.get<{ tasks: Task[] }>(`/users/${userId}/search`, {
    params: { query },
  });

  return data.tasks || [];
};

export { getSearchedTasks };

