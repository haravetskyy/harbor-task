'use client';

import { useProjects } from '../hooks/use-projects';
import { useUser } from '../hooks/use-user';
import { useFilter } from './contexts/filter-context';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Skeleton } from './ui/skeleton';

export const RecourcePath = () => {
  const { selectedFilter } = useFilter();
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects } = useProjects(user?.id);

  if (!user || isUserLoading || !projects) {
    return (
      <>
        <Skeleton className="h-4 w-24" />
        <BreadcrumbSeparator className="hidden md:block" />
        <Skeleton className="h-4 w-24" />
      </>
    );
  }

  if (selectedFilter.type === 'project') {
    const projectName = projects?.find(project => project.id === selectedFilter.value)?.name;

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{projectName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{selectedFilter.value}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
