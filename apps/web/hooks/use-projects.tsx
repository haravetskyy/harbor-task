import { queryKeys } from '@/config';
import { addProject, deleteProject, editProject, getProjects, getSearchedProjects } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useProjects = (userId: string | undefined, query?: string) => {
  return useQuery({
    queryKey: query ? [queryKeys.search, queryKeys.projects, userId, query] : [queryKeys.projects, userId],
    queryFn: () => (query ? getSearchedProjects(userId!, query) : getProjects(userId!)),
    enabled: !!userId && (query ? query.length > 0 : true),
    staleTime: 5 * 60 * 1000,
  });
};

const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
    },
  });
};

const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
    },
  });
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<{ projectId: string }, Error, { userId: string; projectId: string }>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
    },
  });
};

export { useAddProject, useDeleteProject, useEditProject, useProjects };
