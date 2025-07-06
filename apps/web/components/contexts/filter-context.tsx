'use client';

import { AllowedSection, Filter } from '@harbor-task/models';
import { createContext, useContext, useMemo, useState } from 'react';

type FilterContextType = {
  selectedFilter: Filter;
  setSelectedFilter: (filter: Filter) => void;
  section?: AllowedSection;
  projectId?: string;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    type: 'section',
    value: 'All',
  });

  const { section, projectId } = useMemo(
    () => ({
      section: selectedFilter.type === 'section' ? selectedFilter.value : undefined,
      projectId: selectedFilter.type === 'project' ? selectedFilter.value : undefined,
    }),
    [selectedFilter],
  );

  return (
    <FilterContext.Provider value={{ selectedFilter, setSelectedFilter, section, projectId }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within FilterProvider');
  return context;
};

export { FilterProvider, useFilter };
