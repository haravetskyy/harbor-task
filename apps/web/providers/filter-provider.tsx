'use client';

import { AllowedSection, Filter } from '@harbor-task/models';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type FilterContextType = {
  selectedFilter: Filter;
  setSelectedFilter: (filter: Filter) => void;
  section?: AllowedSection;
  projectId?: string;
};

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'section';
  const initialValue = searchParams.get('filter') || 'All';

  const [selectedFilter, setSelectedFilterState] = React.useState<Filter>({
    type: initialType as Filter['type'],
    value: initialValue,
  });

  React.useEffect(() => {
    const type = searchParams.get('type') || 'section';
    const value = searchParams.get('filter') || 'All';
    setSelectedFilterState({ type: type as Filter['type'], value });
  }, [searchParams]);

  const setSelectedFilter = (filter: Filter) => {
    setSelectedFilterState(filter);
    const params = new URLSearchParams();
    params.set('type', filter.type);
    params.set('filter', filter.value);
    router.push(`/?${params.toString()}`);
  };

  const { section, projectId } = React.useMemo(
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
  const context = React.useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within FilterProvider');
  return context;
};

export { FilterProvider, useFilter };
