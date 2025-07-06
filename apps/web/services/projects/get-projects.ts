import { api } from "@/config";
import { Project } from "@harbor-task/models";

const getProjects = async (userId: string): Promise<Project[]> => {
  if (!userId) throw new Error('userId is required');

  const { data } = await api.get<Project[]>(`/users/${userId}/projects`);

  return data;
};

export { getProjects }
