import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Filter } from "@harbor-task/models";

interface FilterContextType {
  selectedFilter: Filter;
  setSelectedFilter: (filter: Filter) => void;
  section?: string;
  projectId?: string;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    type: "section",
    value: "All",
  });

  const { section, projectId } = useMemo(
    () => ({
      section: selectedFilter.type === "section" ? selectedFilter.value : undefined,
      projectId: selectedFilter.type === "project" ? selectedFilter.value : undefined,
    }),
    [selectedFilter],
  );

  return (
    <FilterContext.Provider value={{ selectedFilter, setSelectedFilter, section, projectId }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used within FilterProvider");
  return context;
};
