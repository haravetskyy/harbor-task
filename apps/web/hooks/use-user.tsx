import { getUser } from '@/api';
import { queryKeys } from '@/config';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  return useQuery({
    queryKey: [queryKeys.user],
    queryFn: getUser,
    staleTime: 10 * 60 * 1000,
  });
};

export { useUser };
