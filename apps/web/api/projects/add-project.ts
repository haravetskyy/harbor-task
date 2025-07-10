import { api } from "@/config";
import { Project } from "@harbor-task/models";

const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  if (!project.userId) throw new Error('userId is required');

  const { data } = await api.post<Project>(`/users/${project.userId}/projects`, project);

  return data;
};

export { addProject }
