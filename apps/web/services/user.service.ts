import { api } from "@/config";
import { User } from "@harbor-task/models";

const getUser = async (): Promise<User> => {
  const { data } = await api.get<User>('/users');

  return data;
};

export { getUser };
