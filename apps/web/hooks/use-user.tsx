import { queryKeys } from '@/config';
import { getUser } from '@/services';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  return useQuery({
    queryKey: [queryKeys.user],
    queryFn: getUser,
    staleTime: 10 * 60 * 1000,
  });
};

export { useUser };
