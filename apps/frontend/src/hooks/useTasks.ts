import { useQuery } from "@tanstack/react-query";
import { Task } from "@harbor-task/models";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchTasks = async (userId: string): Promise<Task[]> => {
  const response = await fetch(`${apiUrl}/users/${userId}/tasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

const fetchSearchedTasks = async (userId: string, query: string): Promise<Task[]> => {
  const response = await fetch(`${apiUrl}/users/${userId}/search?query=${query}`);
  if (!response.ok) throw new Error("Failed to search tasks");
  const data = await response.json();
  return data.tasks || [];
};

export const useTasks = (userId: string | undefined, query?: string) => {
  return useQuery({
    queryKey: query ? ["search", "tasks", userId, query] : ["tasks", userId],
    queryFn: () => (query ? fetchSearchedTasks(userId!, query) : fetchTasks(userId!)),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
