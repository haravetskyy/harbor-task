import { api } from "@/config";
import { Task } from "@harbor-task/models";

const editTask = async (
  task: Partial<Task> & { id: string; userId: string },
): Promise<Task> => {
  if (!task.id || !task.userId) throw new Error('id and userId are required');

  const { data } = await api.patch<Task>(`/users/${task.userId}/tasks/${task.id}`, task);

  return data;
};

export { editTask }
