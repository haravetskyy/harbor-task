import { api } from "@/config";
import { Project } from "@harbor-task/models";

const getSearchedProjects = async (userId: string, query: string): Promise<Project[]> => {
  if (!userId || !query) throw new Error('userId and query are required');

  const { data } = await api.get<{ projects: Project[] }>(`/users/${userId}/search`, {
    params: { query },
  });

  return data.projects || [];
};

export { getSearchedProjects }
