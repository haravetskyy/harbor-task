import { api } from '@/config';
import { Project } from '@harbor-task/models';

const getProjects = async (userId: string): Promise<Project[]> => {
  if (!userId) throw new Error('userId is required');

  const { data } = await api.get<Project[]>(`/users/${userId}/projects`);

  return data;
};

const getSearchedProjects = async (userId: string, query: string): Promise<Project[]> => {
  if (!userId || !query) throw new Error('userId and query are required');

  const { data } = await api.get<{ projects: Project[] }>(`/users/${userId}/search`, {
    params: { query },
  });

  return data.projects || [];
};

const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  if (!project.userId) throw new Error('userId is required');

  const { data } = await api.post<Project>(`/users/${project.userId}/projects`, project);

  return data;
};

const editProject = async (
  project: Partial<Project> & { id: string; userId: string },
): Promise<Project> => {
  if (!project.id || !project.userId) throw new Error('id and userId are required');

  const { data } = await api.patch<Project>(`/users/${project.userId}/projects/${project.id}`, project);

  return data;
};

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

export { getProjects, getSearchedProjects, addProject, editProject, deleteProject }
