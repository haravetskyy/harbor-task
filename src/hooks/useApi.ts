const useApi = (apiUrl: string) => {
  const fetchData = async <T>(endpoint: string): Promise<T | null> => {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      return (await response.json()) as T;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return null;
    }
  };

  const postData = async <T>(
    endpoint: string,
    data: Partial<T>
  ): Promise<T | null> => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
      });
      if (!response.ok) throw new Error(`Failed to post to ${endpoint}`);
      return (await response.json()) as T;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      return null;
    }
  };

  const patchData = async <T>(
    endpoint: string,
    data: Partial<T>
  ): Promise<T | null> => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
      });
      if (!response.ok) throw new Error(`Failed to patch ${endpoint}`);
      return (await response.json()) as T;
    } catch (error) {
      console.error(`Error patching ${endpoint}:`, error);
      return null;
    }
  };

  const deleteData = async (endpoint: string): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Failed to delete ${endpoint}`);
      return true;
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
      return false;
    }
  };

  return { fetchData, postData, patchData, deleteData };
};

export default useApi;
