import { User } from '@harbor-task/models';
import { useQuery } from '@tanstack/react-query';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${apiUrl}/users`, {
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to fetch user');

  return response.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 10 * 60 * 1000,
  });
};
