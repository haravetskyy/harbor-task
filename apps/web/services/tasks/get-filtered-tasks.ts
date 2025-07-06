import { api } from "@/config";
import { AllowedSection, Task, allowedSections } from "@harbor-task/models";

const getFilteredTasks = async ({
  userId,
  filterValue,
}: {
  userId: string;
  filterValue: AllowedSection | string;
}): Promise<Task[]> => {
  if (!userId) throw new Error('userId is required');

  const params = allowedSections.includes(filterValue as AllowedSection)
    ? { section: filterValue }
    : { projectId: filterValue };

  const { data } = await api.get<Task[]>(`/users/${userId}/tasks`, { params });

  return data;
};

export { getFilteredTasks }
