import { AllowedSection, Filter } from "@harbor-task/models";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface FilterContextType {
  selectedFilter: Filter;
  setSelectedFilter: (filter: Filter) => void;
  section?: AllowedSection;
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
