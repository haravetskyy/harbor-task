import { api } from "@/config";
import { Task } from "@harbor-task/models";

const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  if (!task.userId) throw new Error('userId is required');

  const { data } = await api.post<Task>(`/users/${task.userId}/tasks`, task);

  return data;
};

export { addTask }
