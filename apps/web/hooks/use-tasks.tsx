import { queryKeys } from '@/config';
import { addTask, deleteTask, editTask, getFilteredTasks, getSearchedTasks } from '@/services';
import { AllowedSection } from '@harbor-task/models';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useTasks = (userId: string | undefined, filterValue?: AllowedSection, query?: string) => {
  return useQuery({
    queryKey: query ? [queryKeys.search, queryKeys.tasks, userId, query] : [queryKeys.tasks, userId, filterValue],
    queryFn: () =>
      query
        ? getSearchedTasks(userId!, query)
        : getFilteredTasks({ userId: userId!, filterValue: filterValue! }),
    enabled: !!userId && (query ? query.length > 0 : true),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });
};

const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });
};

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) =>
      deleteTask({ taskId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] });
    },
  });
};

export { useAddTask, useDeleteTask, useEditTask, useTasks };
