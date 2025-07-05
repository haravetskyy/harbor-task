import { apiURL, queryKeys } from '@/config';
import { User } from '@harbor-task/models';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${apiURL}/users`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: [queryKeys.user],
    queryFn: fetchUser,
    staleTime: 10 * 60 * 1000,
  });
};
