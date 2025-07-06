import { api } from "@/config";

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

export { deleteTask }
