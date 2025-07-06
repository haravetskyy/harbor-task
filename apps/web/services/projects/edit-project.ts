import { api } from "@/config";
import { Project } from "@harbor-task/models";

const editProject = async (
  project: Partial<Project> & { id: string; userId: string },
): Promise<Project> => {
  if (!project.id || !project.userId) throw new Error('id and userId are required');

  const { data } = await api.patch<Project>(`/users/${project.userId}/projects/${project.id}`, project);

  return data;
};

export { editProject }
