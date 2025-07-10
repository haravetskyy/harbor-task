import { api } from "@/config";

const deleteProject = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}): Promise<{ projectId: string }> => {
  if (!userId || !projectId) throw new Error('userId and projectId are required');

  await api.delete(`/users/${userId}/projects/${projectId}`);

  return { projectId };
};

export { deleteProject }
