import { useQuery } from "@tanstack/react-query";
import { User } from "@harbor-task/models";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${apiUrl}/users`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 10 * 60 * 1000,
  });
};
