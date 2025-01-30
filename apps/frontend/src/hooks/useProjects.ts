import { useQuery } from "@tanstack/react-query";
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

export const useProjects = (userId: string | undefined, query?: string) => {
  return useQuery({
    queryKey: query ? ["search", "projects", userId, query] : ["projects", userId],
    queryFn: () => (query ? fetchSearchedProjects(userId!, query) : fetchProjects(userId!)),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
