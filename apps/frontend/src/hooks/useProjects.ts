import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "@harbor-task/models";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchProjects = async (userId: string): Promise<Project[]> => {
  const response = await fetch(`${apiUrl}/users/${userId}/projects`);
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
};

const fetchSearchedProjects = async (userId: string, query: string): Promise<Project[]> => {
  const response = await fetch(`${apiUrl}/users/${userId}/search?query=${query}`);
  if (!response.ok) throw new Error("Failed to search projects");
  const data = await response.json();
  return data.projects || [];
};

const addProject = async ({
  userId,
  project,
}: {
  userId: string;
  project: Omit<Project, "id">;
}) => {
  const response = await fetch(`${apiUrl}/users/${userId}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error("Failed to add project");
  return response.json() as Promise<Project>;
};

const editProject = async ({ userId, project }: { userId: string; project: Partial<Project> }) => {
  const response = await fetch(`${apiUrl}/users/${userId}/projects/${project.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error("Failed to edit project");
  return response.json();
};

const deleteProject = async ({ userId, projectId }: { userId: string; projectId: string }) => {
  const response = await fetch(`${apiUrl}/users/${userId}/projects/${projectId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return { projectId };
};

export const useProjects = (userId: string | undefined, query?: string) => {
  return useQuery({
    queryKey: query ? ["search", "projects", userId, query] : ["projects", userId],
    queryFn: () => (query ? fetchSearchedProjects(userId!, query) : fetchProjects(userId!)),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { userId: string; project: Omit<Project, "id"> }>({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { userId: string; project: Partial<Project> }>({
    mutationFn: editProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<{ projectId: string }, Error, { userId: string; projectId: string }>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
